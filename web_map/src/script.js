// 🔹 Configure aqui o endpoint da sua API
const API_URL = "http://localhost:5000/api/locations";

const map = L.map('map').setView([-14.2350, -51.9253], 4);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const markersLayer = L.layerGroup().addTo(map);
let rawData = [];
const pinColor = '#005582';
const BASE_RADIUS = 3;
const SCALE_RADIUS = 3;

function roundCoord(n) { return Number(n).toFixed(6); }
function groupByCoords(data) {
    const groups = {};
    data.forEach(item => {
        const lat = roundCoord(item.latitude);
        const lng = roundCoord(item.longitude);
        const key = lat + ',' + lng;
        if (!groups[key]) groups[key] = { lat: +lat, lng: +lng, count: 0 };
        groups[key].count++;
    });
    return Object.values(groups);
}

function renderAppFilters(apps) {
    const appsList = document.getElementById('appsList');
    appsList.innerHTML = '';
    const appCounts = {};
    rawData.forEach(d => { appCounts[d.appId] = (appCounts[d.appId] || 0) + 1; });

    apps.forEach(app => {
        const div = document.createElement('div');
        div.className = 'app-item';
        div.innerHTML = `<label style="display:flex;align-items:center;gap:8px">
      <input type="checkbox" class="app-checkbox" value="${app}" checked/> 
      <span class="app-label">${app}</span>
    </label><span class="app-count">${appCounts[app] || 0} usuários</span>`;
        appsList.appendChild(div);
    });

    document.getElementById('selectAllApps').addEventListener('change', e => {
        const checked = e.target.checked;
        document.querySelectorAll('.app-checkbox').forEach(cb => cb.checked = checked);
        updateMap();
    });
    document.querySelectorAll('.app-checkbox').forEach(cb => cb.addEventListener('change', updateMap));
}

function updateMap() {
    const selected = Array.from(document.querySelectorAll('.app-checkbox'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    if (selected.length === 0) {
        markersLayer.clearLayers();
        document.getElementById('totalUsers').innerText = '0 usuários no total';
        return;
    }

    const filtered = rawData.filter(d => selected.includes(d.appId));
    const groups = groupByCoords(filtered);

    markersLayer.clearLayers();
    document.getElementById('totalUsers').innerText = filtered.length + ' usuários no total';

    groups.forEach(g => {
        const radius = BASE_RADIUS + Math.sqrt(g.count) * SCALE_RADIUS;
        L.circleMarker([g.lat, g.lng], {
            radius: radius,
            color: pinColor,
            weight: 1,
            fillColor: pinColor,
            fillOpacity: 0.45
        }).addTo(markersLayer);
    });
}

async function loadLocations() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Erro ao buscar localizações");
        const locais = await res.json();
        rawData = locais || [];
        const apps = Array.from(new Set(rawData.map(r => r.appId))).sort();
        renderAppFilters(apps);
        updateMap();
    } catch (err) {
        console.error("Erro ao carregar:", err);
    }
}

// Modal de informações
const modal = document.getElementById("infoModal");
const btn = document.getElementById("infoBtn");
const close = document.getElementById("closeModal");
btn.onclick = () => modal.classList.remove("hidden");
close.onclick = () => modal.classList.add("hidden");
window.onclick = e => { if (e.target == modal) modal.classList.add("hidden"); };

// Inicializa o mapa
loadLocations();
