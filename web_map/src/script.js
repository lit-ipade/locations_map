const API_URL = 'http://localhost:5000/api/locations';
let map;

document.addEventListener('DOMContentLoaded', () => {
    map = L.map('map').setView([-23.56, -46.65], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    loadLocations();
});

async function loadLocations() {
    const appId = document.getElementById('appIdFilter').value.trim();
    const url = appId ? `${API_URL}?appId=${appId}` : API_URL;
    const res = await fetch(url);
    const data = await res.json();

    // Limpa o mapa antes de redesenhar
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    data.forEach(loc => {
        L.marker([loc.latitude, loc.longitude])
            .addTo(map)
            .bindPopup(`
        <b>App:</b> ${loc.appId}<br>
        <b>User:</b> ${loc.userId || '-'}<br>
        <b>Hora:</b> ${new Date(loc.timestamp).toLocaleString()}
      `);
    });
}
