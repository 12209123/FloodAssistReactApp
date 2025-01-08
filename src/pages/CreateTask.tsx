import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { EmergencyWaypoint, emergencies } from "../data/emergencies";
import {
  setCurrentRegisteredEmergency,
  getCurrentUserId,
} from "../globalRegistrationStore";
import MapView from "./Discover";

const CreateTask: React.FC = () => {
  const navigate = useNavigate();

  const [nextId, setNextId] = useState(() => {
    if (emergencies.length === 0) return 1;
    const maxId = Math.max(...emergencies.map((e) => e.id));
    return maxId + 1;
  });

  const [formData, setFormData] = useState({
    positionLat: "",
    positionLng: "",
    priority: "",
    title: "",
    description: "",
  });

  const [showMap, setShowMap] = useState(false);

  const handlePositionSelect = (lat: number, lng: number) => {
    setFormData({
      ...formData,
      positionLat: String(lat),
      positionLng: String(lng),
    });
    setShowMap(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEmergency: EmergencyWaypoint = {
      id: nextId,
      position: [Number(formData.positionLat), Number(formData.positionLng)],
      priority: formData.priority, // e.g. "low", "medium", or "high"
      title: formData.title,
      description: formData.description,
      ownerId: getCurrentUserId(),
      type: "unofficial",
    };

    // Add to global array and set as current registered
    emergencies.push(newEmergency);
    setCurrentRegisteredEmergency(newEmergency.id);

    // Increment ID and reset form
    setNextId(nextId + 1);
    setFormData({
      positionLat: "",
      positionLng: "",
      priority: "",
      title: "",
      description: "",
    });

    alert("New emergency added and you are registered as the owner!");
    console.log("Updated emergencies:", emergencies);
    navigate("/currentTask");
  };

  const renderFieldRow = (
    label: string,
    child: React.ReactNode,
    required = false
  ) => (
    <div
      style={{
        marginBottom: "0.75rem",
        display: "flex",
        alignItems: "center",
      }}>
      <label
        style={{
          width: "90px",
          marginRight: "0.5rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "flex-end",
        }}>
        {label}
        {required && <span style={{ color: "red", marginLeft: "4px" }}>*</span>}
      </label>
      <div style={{ flex: 1 }}>{child}</div>
    </div>
  );

  return (
    <>
      {showMap ? (
        <div style={{ width: "100%", height: "100vh" }}>
          <MapView
            showEmergencies={false}
            onPositionSelect={handlePositionSelect}
          />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "450px",
            margin: "0 auto",
            padding: "2rem",
            border: "none",
            backgroundColor: "#fff",
          }}>
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Create a New Emergency
          </h2>

          {renderFieldRow(
            "ID",
            <input
              type="number"
              value={nextId}
              readOnly
              style={{
                width: "100%",
                padding: "0.4rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f0f0f0",
                color: "#000",
              }}
            />
          )}

          {renderFieldRow(
            "Latitude",
            <input
              type="text"
              value={formData.positionLat}
              readOnly
              placeholder="Set position below"
              style={{
                width: "100%",
                padding: "0.4rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#fafafa",
                color: "#000",
              }}
            />
          )}

          {renderFieldRow(
            "Longitude",
            <input
              type="text"
              value={formData.positionLng}
              readOnly
              placeholder="Set position below"
              style={{
                width: "100%",
                padding: "0.4rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#fafafa",
                color: "#000",
              }}
            />
          )}

          {renderFieldRow(
            "Priority",
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "0.4rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#fff",
                color: "black",
              }}>
              <option value="" disabled></option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>,
            true
          )}

          {renderFieldRow(
            "Title",
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "0.4rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />,
            true
          )}

          {renderFieldRow(
            "Description",
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "0.4rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />,
            true
          )}

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
              type="button"
              onClick={() => setShowMap(true)}
              style={{
                marginRight: "1em",
              }}>
              Set Position
            </button>
            <button type="submit" style={{}}>
              Create
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default CreateTask;
