import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { emergencies } from "../data/emergencies";

const MapView: React.FC = () => {
  const mapCenter = [48.30694, 14.28583];
  const zoomLevel = 12;

  return (
    <div
      className="map-container"
      style={{
        width: "100%",
        height: "100%",
      }}>
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

        {emergencies.map((emergencies, idx) => (
          <Marker key={idx} position={emergencies.position}>
            <Popup>
              <strong>{emergencies.title}</strong>
              <br />
              {emergencies.description}
              <br />
              <strong>Priority:</strong> {emergencies.priority}
              <br />
              <Link to={`/emergency/${emergencies.id}`}>
                <button style={{ marginTop: "8px" }}>More Details</button>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
