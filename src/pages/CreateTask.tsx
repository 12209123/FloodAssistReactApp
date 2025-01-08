// CreateTask.tsx
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { EmergencyWaypoint, emergencies } from "../data/emergencies";
// Or however you store your global emergencies
import { setCurrentRegisteredEmergency } from "../globalRegistrationStore";
import { getCurrentUserId } from "../globalRegistrationStore"; // We just created this
import MapView from "./Discover";

const CreateTask: React.FC = () => {
  const navigate = useNavigate(); // <-- to navigate programmatically
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
      priority: formData.priority,
      title: formData.title,
      description: formData.description,

      // <-- The key line: make the current user the owner
      ownerId: getCurrentUserId(),
    };

    // Push to global array
    emergencies.push(newEmergency);

    // Auto-register this user to the newly created emergency
    setCurrentRegisteredEmergency(newEmergency.id);

    // Prepare next ID for subsequent tasks
    setNextId(nextId + 1);

    // Reset form
    setFormData({
      positionLat: "",
      positionLng: "",
      priority: "",
      title: "",
      description: "",
    });

    alert(
      "New emergency added (in memory) and you are registered as the owner!"
    );
    console.log("Updated globalEmergencies:", emergencies);
    navigate("/currentTask");
  };

  return (
    <div>
      <h1>Create Task Page</h1>

      {showMap ? (
        <div style={{ width: "100%", height: "400px" }}>
          <MapView
            showEmergencies={false}
            onPositionSelect={handlePositionSelect}
          />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "400px", margin: "auto" }}>
          {/* ID Field (readOnly) */}
          <div style={{ marginBottom: "1em" }}>
            <label>ID</label>
            <input
              type="number"
              value={nextId}
              readOnly
              style={{ backgroundColor: "#f0f0f0" }}
            />
          </div>

          <div style={{ marginBottom: "1em" }}>
            <label>Latitude</label>
            <input
              type="text"
              value={formData.positionLat}
              readOnly
              placeholder="Set position from map"
            />
          </div>
          <div style={{ marginBottom: "1em" }}>
            <label>Longitude</label>
            <input
              type="text"
              value={formData.positionLng}
              readOnly
              placeholder="Set position from map"
            />
          </div>

          <div style={{ marginBottom: "1em" }}>
            <label>Priority</label>
            <input
              type="text"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              required
            />
          </div>

          <div style={{ marginBottom: "1em" }}>
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div style={{ marginBottom: "1em" }}>
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <button type="button" onClick={() => setShowMap(true)}>
            Set Position on Map
          </button>
          <button type="submit" style={{ marginLeft: "1em" }}>
            Create Emergency
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateTask;
