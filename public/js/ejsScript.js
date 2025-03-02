const MAP_API_KEY = "<%= MAP_API_KEY %>";
    
try {
    // Parse coordinates safely from JSON
    const coordinates = JSON.parse('<%- JSON.stringify(coordinates || []) %>');

    console.log("Coordinates received:", coordinates); // Debugging log

    maptilersdk.config.apiKey = MAP_API_KEY;

    const map = new maptilersdk.Map({
        container: 'map',
        style: maptilersdk.MapStyle.STREETS,
        center: coordinates.length > 0 ? [coordinates[0].lng, coordinates[0].lat] : [78.9629, 20.5937], // Default to India
        zoom: 5
    });

    if (coordinates.length === 0) {
        console.warn("No coordinates to plot.");
    }

    coordinates.forEach(coord => {
        if (coord.lng && coord.lat) {
            new maptilersdk.Marker()
                .setLngLat([coord.lng, coord.lat])
                .addTo(map);
            console.log("Plotted:", coord);
        } else {
            console.error("Invalid coordinate:", coord);
        }
    });

} catch (error) {
    console.error("Error parsing coordinates:", error);
}