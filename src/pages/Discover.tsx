import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

// Force TypeScript to allow access to _getIconUrl
delete (L.Icon.Default.prototype as any)._getIconUrl;
(L.Icon.Default as any).mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapView() {
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
    <div
      className="map-container"
      style={{ height: "80vh", width: "100%", margin: "0 auto" }}>
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}>
        {/*
          A TileLayer is required for basic map tiles.
          You can use different tile providers like OpenStreetMap, Mapbox, etc.
        */}
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
}

export default MapView;
