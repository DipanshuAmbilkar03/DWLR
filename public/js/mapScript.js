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


const MAP_API_KEY = "<%= MAP_API_KEY %>";

console.log("MAP_API_KEY:", MAP_API_KEY);

// Parse the coordinates passed from the server
const coordinates = JSON.stringify(coordinates || []);

console.log("Coordinates received:", coordinates);

// Initialize MapTiler SDK
maptilersdk.config.apiKey = MAP_API_KEY;
const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    center: coordinates.length > 0 ? [coordinates[0].lng, coordinates[0].lat] : [78.9629, 20.5937], // Default: India
    zoom: 5
});

// Ensure markers are added only after the map is fully loaded
map.on('load', () => {
    console.log("Map loaded. Adding markers...");

    if (coordinates.length === 0) {
        console.warn("No coordinates to plot.");
    }

    // Add markers for each coordinate
    coordinates.forEach(coord => {
        if (coord && typeof coord.lng === "number" && typeof coord.lat === "number") {
            new maptilersdk.Marker()
                .setLngLat([coord.lng, coord.lat])
                .addTo(map);
            console.log("Plotted marker at:", coord);
        } else {
            console.error("Invalid coordinate:", coord);
        }
    });
});
