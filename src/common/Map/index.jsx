import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import "leaflet/dist/leaflet.css";

export const Map = ({ children, ...mapProps }) => {
  return (
    <MapContainer
      center={[25, 0]}
      zoom={4}
      scrollWheelZoom={false}
      zoomControl={false}
      style={{ width: "100%", height: "100%" }}
      {...mapProps}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {children}
    </MapContainer>
  );
};
