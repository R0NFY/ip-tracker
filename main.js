var map;
window.addEventListener("load", () => {
  map = L.map("map");
});
function data() {
  return {
    ip: "",
    location: "",
    timezone: "",
    isp: "",
    query: "",
    loaded: false,
    async getData(query) {
      let regex = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(.|$)){4}/;
      if (regex.test(query)) {
        ip = `ipAddress=${query}`;
        try {
          let response = await axios.get(
            `https://geo.ipify.org/api/v2/country,city?apiKey=at_WRYBtNKhTAIxa63xsnShf1QILAyyR&${ip}`
          );
          response = response.data;
          locationData = response.location;
          this.ip = response.ip;
          this.location = `${locationData.city}, ${locationData.region} ${locationData.postalCode}`;
          this.timezone = `UTC ${locationData.timezone}`;
          this.isp = response.isp;
          map.setView([locationData.lat, locationData.lng]);
          var marker = L.marker([locationData.lat, locationData.lng]).addTo(
            map
          );
        } catch (e) {
          console.error(e);
        }
      } else if (!query && !this.loaded) {
        try {
          let response = await axios.get(
            `https://geo.ipify.org/api/v2/country,city?apiKey=at_WRYBtNKhTAIxa63xsnShf1QILAyyR&`
          );
          this.loaded = true;
          response = response.data;
          locationData = response.location;
          this.ip = response.ip;
          this.location = `${locationData.city}, ${locationData.region} ${locationData.postalCode}`;
          this.timezone = `UTC ${locationData.timezone}`;
          this.isp = response.isp;
          map.setView([locationData.lat, locationData.lng], 12);
          L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicjBuZnkiLCJhIjoiY2t5dTBodG5kMDIyYTJ3dDRieTAxY3Y3OSJ9.tIShS2wOi0aEQxjsxX5KCw",
            {
              attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
              maxZoom: 18,
              id: "mapbox/streets-v11",
              tileSize: 512,
              zoomOffset: -1,
              accessToken:
                "pk.eyJ1IjoicjBuZnkiLCJhIjoiY2t5dTBodG5kMDIyYTJ3dDRieTAxY3Y3OSJ9.tIShS2wOi0aEQxjsxX5KCw",
            }
          ).addTo(map);
          var marker = L.marker([locationData.lat, locationData.lng], 12).addTo(
            map
          );
        } catch (e) {
          console.error(e);
        }
      }
    },
  };
}
window.addEventListener("load", () => {});
