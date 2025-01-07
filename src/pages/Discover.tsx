import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapView: React.FC = () => {
  // Example center coordinates (Linz, Austria area)
  const mapCenter = [48.30694, 14.28583];
  const zoomLevel = 12;

  // Example data for your waypoints/markers
  const waypoints = [
    {
      position: [48.329, 14.294],
      label: "Willersdorf Marker",
      popupContent: "This is a marker near Willersdorf",
    },
    {
      position: [48.315, 14.25],
      label: "Oberbairing Marker",
      popupContent: "This is a marker near Oberbairing",
    },
    {
      position: [48.31, 14.31],
      label: "Außertreffling Marker",
      popupContent: "This is a marker near Außertreffling",
    },
  ];

  return (
    <div className="map-container" style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">
          OpenStreetMap</a> contributors'
        />

        {waypoints.map((waypoint, idx) => (
          <Marker key={idx} position={waypoint.position}>
            <Popup>
              <strong>{waypoint.label}</strong>
              <br />
              {waypoint.popupContent}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
