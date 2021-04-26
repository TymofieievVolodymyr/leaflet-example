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

    // const myStyle = {
    //   'color': '#ff7800',
    //   'weight': 5,
    //   'opacity': 0.65
    // };

    // L.geoJSON(geojsonFeature, {
    //   style: myStyle
    // }).addTo(this.map);
    // L.geoJSON(geojsonFeature).addTo(this.map);
    // const myLayer = L.geoJSON().addTo(this.map);
    // myLayer.addData(geojsonFeature);

    // L.geoJSON(geojsonFeature, {
    //   style: function(feature) {
    //     switch (feature.properties.party) {
    //       case 'Republican':
    //         return {color: '#ff0000'};
    //       case 'Democrat':
    //         return {color: '#0000ff'};
    //     }
    //   }
    // }).addTo(this.map);

    // const geojsonMarkerOptions = {
    //   radius: 8,
    //   fillColor: '#ff7800',
    //   color: '#000',
    //   weight: 1,
    //   opacity: 1,
    //   fillOpacity: 0.8
    // };
    //
    // L.geoJSON(geojsonFeature, {
    //   pointToLayer: function(feature, latlng) {
    //     return L.circleMarker(latlng, geojsonMarkerOptions);
    //   }
    // }).addTo(this.map);

    // function onEachFeature(feature, layer) {
    //   // does this feature have a property named popupContent?
    //   if (feature.properties && feature.properties.popupContent) {
    //     layer.bindPopup(feature.properties.popupContent);
    //   }
    // }

    // const geojsonFeature = {
    //   "type": "Feature",
    //   "properties": {
    //     "name": "Coors Field",
    //     "amenity": "Baseball Stadium",
    //     "popupContent": "This is where the Rockies play!"
    //   },
    //   "geometry": {
    //     "type": "Point",
    //     "coordinates": [-104.99404, 39.75621]
    //   }
    // };

    // L.geoJSON(geojsonFeature, {
    //   onEachFeature: onEachFeature
    // }).addTo(this.map);

    L.geoJSON(this.geojsonFeature, {
      filter: (feature, layer) => {
        return feature.properties.show_on_map;
      }
    }).addTo(this.map);

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
