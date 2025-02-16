// maptilersdk.config.apiKey = MAP_API_KEY; 

// const map = new maptilersdk.Map({
//     container: 'map', 
//     style: "streets-v2",
//     center: [81.9629, 23.5937],
//     zoom: 4, 
// });

// maptilersdk.config.apiKey = MAP_API_KEY; 

// const map = new maptilersdk.Map({
//     container: 'map', 
//     style: maptilersdk.MapStyle.STREETS,
//     center: [78.9629, 20.5937], // Centered on India (change as needed)
//     zoom: 5
// });


document.addEventListener("DOMContentLoaded", function () {
    if (typeof maptilersdk === "undefined") {
        console.error("MapTiler SDK failed to load!");
        return;
    }

    maptilersdk.config.apiKey = MAP_API_KEY;
    const map = new maptilersdk.Map({
        container: 'map',
        style: maptilersdk.MapStyle.STREETS,
        center: [81.9629, 23.5937], // Center 
        zoom: 5
    });

    map.on('load', function () {
        console.log("Map loaded successfully!");
    });
});
