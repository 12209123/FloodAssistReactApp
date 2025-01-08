import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentRegisteredEmergency } from "../globalRegistrationStore";

const CurrentTask: React.FC = () => {
  const [registeredId, setRegisteredId] = useState<number | null>(null);

  useEffect(() => {
    // Get the ID of the currently registered emergency
    const currentId = getCurrentRegisteredEmergency();
    setRegisteredId(currentId);
  }, []);

  // If user isn't registered to any emergency, display a basic message
  if (registeredId === null) {
    return (
      <div style={{ padding: "1rem" }}>
        <h1>Current Task Page</h1>
        <p>No tasks are registered yet.</p>
      </div>
    );
  }

  // If user *is* registered, redirect them to `/emergency/:id`
  return <Navigate to={`/emergency/${registeredId}`} replace />;
};

export default CurrentTask;
