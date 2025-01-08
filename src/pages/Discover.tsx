import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link, useLocation } from "react-router-dom";
import { emergencies } from "../data/emergencies";
import L from "leaflet";
import iconUrl from "../../public/marker-icon.svg";
import iconUrl2 from "../../public/marker-icon2.svg";
import FilterIcon from "../../public/filter.svg";
import {
  getCurrentRegisteredEmergency,
  getCurrentUserId,
} from "../globalRegistrationStore";
import { Toast, ToastBody, ToastHeader, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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

const MarkerIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

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
  const location = useLocation();
  const [showRemovedToast, setShowRemovedToast] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setShowRemovedToast(location.state.showRemovedToast);
    } else {
      console.log("not showing toast");
    }
  }, [location.state]);

  const mapCenter: [number, number] = [48.30694, 14.28583];
  const zoomLevel = 12;

  // Initial state for priorities and types (all checked by default)
  const [showToast, setShowToast] = useState(false);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    "High",
    "Medium",
    "Low",
  ]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "official",
    "unofficial",
  ]);

  const toggleToast = () => setShowToast(!showToast);

  // Handle priority checkbox changes
  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedPriorities((prev) =>
      prev.includes(value)
        ? prev.filter((priority) => priority !== value)
        : [...prev, value]
    );
  };

  // Handle type checkbox changes
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedTypes((prev) =>
      prev.includes(value)
        ? prev.filter((type) => type !== value)
        : [...prev, value]
    );
  };

  const filteredEmergencies = emergencies.filter(
    (emergency) =>
      selectedPriorities.includes(emergency.priority) &&
      selectedTypes.includes(emergency.type.toLowerCase())
  );

  return (
    <div
      className="map-container"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}>
      <Toast
        style={{ position: "fixed" }}
        show={showRemovedToast}
        onClose={() => setShowRemovedToast(false)}>
        <Toast.Header></Toast.Header>
        <Toast.Body>Closed emergency and removed it from the map</Toast.Body>
      </Toast>
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
          filteredEmergencies.map((emergency) => {
            const isOwner = emergency.ownerId === getCurrentUserId();
            const isRegistered =
              getCurrentRegisteredEmergency() === emergency.id;

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
                  <strong>Type:</strong> {emergency.type}
                  <br />
                  <Link to={`/emergency/${emergency.id}`}>
                    <button style={{ marginTop: "8px" }}>More Details</button>
                  </Link>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>

      {/* Filter button */}
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "5px",
          backgroundColor: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={toggleToast}>
        <img
          src={FilterIcon}
          alt="Filter"
          style={{ width: "32px", height: "32px" }}
        />
      </button>

      {/* Filter popup */}
      <Toast
        show={showToast}
        onClose={toggleToast}
        style={{
          position: "absolute",
          top: "50px",
          right: "10px",
          zIndex: 1000,
        }}>
        <ToastHeader>
          <strong className="mr-auto">Filter Emergencies</strong>
        </ToastHeader>
        <ToastBody>
          <Form>
            <strong>Priority</strong>
            {["High", "Medium", "Low"].map((priority) => (
              <Form.Check
                key={priority}
                type="checkbox"
                label={priority}
                value={priority}
                checked={selectedPriorities.includes(priority)}
                onChange={handlePriorityChange}
              />
            ))}
            <strong>Type</strong>
            {["official", "unofficial"].map((type) => (
              <Form.Check
                key={type}
                type="checkbox"
                label={type.charAt(0).toUpperCase() + type.slice(1)}
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={handleTypeChange}
              />
            ))}
          </Form>
        </ToastBody>
      </Toast>
    </div>
  );
};

export default MapView;
