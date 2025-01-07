import React from "react";
import { useParams, Link } from "react-router-dom";
import { emergencies } from "../data/emergencies";

function EmergencyDetail() {
  // React Router's useParams hook to get the "id" from the URL
  const { id } = useParams<{ id: string }>();

  // Convert "id" to a number, find the matching waypoint
  const waypointId = Number(id);
  const waypoint = emergencies.find((wp) => wp.id === waypointId);

  if (!waypoint) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>Emergency Details</h2>
        <p>No emergency info found for ID: {id}</p>
        <Link to="/">Back to Map</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{waypoint.title}</h2>
      <p style={{ fontSize: "1.1rem" }}>{waypoint.description}</p>
      <p>
        <strong>Priority:</strong> {waypoint.priority}
      </p>
      <p>
        <strong>Recommended Actions:</strong>
        {/* Provide more details, steps, or instructions here */}
      </p>
      <ul>
        <li>Stay tuned to local news and radio</li>
        <li>Prepare sandbags if priority is high</li>
        <li>Ensure you have an evacuation plan</li>
        {/* etc. */}
      </ul>

      <Link to="/">
        <button style={{ marginTop: "8px" }}>Back to Map</button>
      </Link>
    </div>
  );
}

export default EmergencyDetail;
