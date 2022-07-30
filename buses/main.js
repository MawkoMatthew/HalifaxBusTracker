(function(){
  let map = L.map('theMap').setView([44.650627, -63.597140], 14);
  busLayer = L.geoJSON().addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

   setInterval(moment,1000,map);

})();

let leafletIcon = L.icon ({
  iconUrl: 'bus.png',
  iconSize: [38,95],
  iconAnchor: [22,94],
})
let NSCCMarker = L.Marker([-63.613,44.6692],{icon:leafletIcon}).addTo(Map);  

function generateGeoFromLatLong(lat,long)
{
    return ({
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [long,lat]
        },
        "properties": {
          "name": "NSCC IT",
        }});

}

function moment(map)
{
    fetch('http://hrmbusapi.herokuapp.com/').
    then(res=>res.json()).
    then(json=>{
        busLayer.clearLayers();
        json.entity.map(el=>{
            const lat = el.vehicle.position.latitude;
            const long = el.vehicle.position.longitude;
            busLayer.addData(generateGeoFromLatLong(lat,long));
        });
    })

}

