maptilersdk.config.apiKey = MAP_API_KEY; 

const map = new maptilersdk.Map({
    container: 'map', 
    style: "streets-v2",
    center: [81.9629, 23.5937],
    zoom: 4, 
});
