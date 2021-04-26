// export const geojsonFeature =  {
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
// export const geojsonFeature =  [{
//   "type": "LineString",
//   "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
// }, {
//   "type": "LineString",
//   "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
// }];
export const geojsonFeature = [{
  "type": "Feature",
  "properties": {
    "party": "Republican",
    "popupContent": "This is where the Rockies play!"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-104.05, 48.99],
      [-97.22, 48.98],
      [-96.58, 45.94],
      [-104.03, 45.94],
      [-104.05, 48.99]
    ]]
  }
}, {
  "type": "Feature",
  "properties": {"party": "Democrat"},
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-109.05, 41.00],
      [-102.06, 40.99],
      [-102.03, 36.99],
      [-109.04, 36.99],
      [-109.05, 41.00]
    ]]
  }
}];
