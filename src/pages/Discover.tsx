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
import L from "leaflet";
import iconUrl from "../../public/marker-icon.svg";
import iconUrl2 from "../../public/marker-icon2.svg";
import {
  getCurrentRegisteredEmergency,
  getCurrentUserId,
} from "../globalRegistrationStore";

interface MapProps {
  onPositionSelect: (lat: number, lng: number) => void;
  showEmergencies?: boolean;
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

// Normal (default) marker
const MarkerIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [32, 32], // Adjust size as needed
  iconAnchor: [16, 32], // The "tip" of the marker
  popupAnchor: [0, -32],
});

// Registered/Owned marker
const MarkerIconRegOwn = L.icon({
  iconUrl: iconUrl2,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapView: React.FC<MapProps> = ({
  onPositionSelect,
  showEmergencies = true,
}) => {
  const mapCenter: [number, number] = [48.30694, 14.28583];
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
          emergencies.map((emergency) => {
            const isOwner = emergency.ownerId === getCurrentUserId();
            const isRegistered =
              getCurrentRegisteredEmergency() === emergency.id;

            // If user is owner or registered, use the second icon
            const icon =
              isOwner || isRegistered ? MarkerIconRegOwn : MarkerIcon;

            return (
              <Marker
                key={emergency.id}
                position={emergency.position}
                icon={icon}>
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
            );
          })}
      </MapContainer>
    </div>
  );
};

export default MapView;
