import {Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from '../marker.service';
import {ShapeService} from '../shape.service';
import {geojsonFeature} from '../data/geojsonFeature';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;
  private states;
  private geojsonFeature = geojsonFeature;

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    L.geoJSON(geojsonFeature).addTo(this.map);
    tiles.addTo(this.map);
  }


  constructor(private  markerService: MarkerService,
              private shapeService: ShapeService) {
  }

  private highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042'
    });
  }

  private resetFeature(e) {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B'
    });
  }

  private initStatesLayer() {
    // initial state layer color
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: '#6DB65B'
      }),
      // layer events
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e)),
        })
      )
    });
    this.map.addLayer(stateLayer);  // add layer to map
    stateLayer.bringToBack(); // circle did not overlap by color
  }

  ngAfterViewInit(): void {
    this.initMap();
    // this.markerService.makeCapitalMarkers(this.map);
    // add circles
    // this.markerService.makeCapitalCircleMarkers(this.map);
    // add shapes
    // this.shapeService.getStateShapes().subscribe(states => {
    //   this.states = states;
    //   this.initStatesLayer();
    // });
  }
}
