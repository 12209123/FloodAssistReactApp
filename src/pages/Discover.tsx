import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { emergencies } from "../data/emergencies";

interface MapProps {
  onPositionSelect: (lat: number, lng: number) => void;
  showEmergencies?: boolean; // new prop
}

const SelectPositionMap: React.FC<MapProps> = ({ onPositionSelect }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onPositionSelect(lat, lng);
    },
  });

  return null;
};

const MapView: React.FC<MapProps> = ({
  onPositionSelect,
  showEmergencies = true, // default to `true` if not provided
}) => {
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
        <SelectPositionMap onPositionSelect={onPositionSelect} />

        {/* Conditionally render emergencies */}
        {showEmergencies &&
          emergencies.map((emergency, idx) => (
            <Marker key={idx} position={emergency.position}>
              <Popup>
                <strong>{emergency.title}</strong>
                <br />
                {emergency.description}
                <br />
                <strong>Priority:</strong> {emergency.priority}
                <br />
                <Link to={`/emergency/${emergency.id}`}>
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
