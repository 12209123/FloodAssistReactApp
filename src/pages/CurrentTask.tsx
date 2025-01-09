import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentRegisteredEmergency } from "../globalRegistrationStore";

const CurrentTask: React.FC = () => {
  const [registeredId, setRegisteredId] = useState<number | null>(null);

  useEffect(() => {
    const currentId = getCurrentRegisteredEmergency();
    setRegisteredId(currentId);
  }, []);

  if (registeredId === null) {
    return (
      <div style={{ padding: "1rem" }}>
        <h1>Current Task Page</h1>
        <p>No tasks are registered yet.</p>
      </div>
    );
  }

  return <Navigate to={`/emergency/${registeredId}`} replace />;
};

export default CurrentTask;
