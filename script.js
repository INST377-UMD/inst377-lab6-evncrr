let map;
function createMap() {
    map = L.map('map').setView([38.79, -106.53], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

async function getLocality(latitude, longitude) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    const data = await response.json();
    return data.locality
}
async function addRandomMarkers() {
    const markerDetails = document.getElementById("markers");

    for (let i = 1; i <= 3; i++) {
        const latitude = getRandomInRange(30, 35, 3);
        const longitude = getRandomInRange(-100, -90, 3);

        //fetch locality info
        const locality = await getLocality(latitude, longitude);

        //create marker and add to map as popup
        const marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup(`<strong>Marker ${i}</strong><br>Latitude: ${latitude}, Longitude: ${longitude}<br>Locality: ${locality}`);

        //shows marker detail below map
        const markerInfo = document.createElement("p");
        markerInfo.innerHTML = `<strong>Marker ${i}:</strong> Latitude: ${latitude}, Longitude: ${longitude}<br>Locality: ${locality}`;
        markerDetails.appendChild(markerInfo);
    }
}

window.onload = async function() {
    createMap();
    await addRandomMarkers(); 
}
