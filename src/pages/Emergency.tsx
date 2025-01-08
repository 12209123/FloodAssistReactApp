import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { emergencies } from "../data/emergencies";

// Import our global store
import {
  getCurrentRegisteredEmergency,
  setCurrentRegisteredEmergency,
  isAnyEmergencyRegistered,
} from "../globalRegistrationStore";

function EmergencyDetail() {
  const { id } = useParams<{ id: string }>();
  const waypointId = Number(id);
  const waypoint = emergencies.find((wp) => wp.id === waypointId);

  // If no matching emergency
  if (!waypoint) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>Emergency Details</h2>
        <p>No emergency info found for ID: {id}</p>
      </div>
    );
  }

  // Local state to track if *this user* is registered to *this* emergency
  const [isRegistered, setIsRegistered] = useState(false);

  // Pre-written chat messages
  const [messages, setMessages] = useState<string[]>([
    "Hello from user1",
    "Stay calm, I'm on my way!",
    "Anyone else close by?",
  ]);

  // New chat message typed by the user
  const [newMessage, setNewMessage] = useState("");

  // A ref to the chat container for auto-scrolling
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Check on initial render if we are already registered to *this* emergency
  useEffect(() => {
    const currentId = getCurrentRegisteredEmergency();
    if (currentId === waypointId) {
      setIsRegistered(true);
    }
  }, [waypointId]);

  // Whenever messages change, scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // ===== Handlers =====
  const handleRegister = () => {
    // If there's already an emergency registered
    // and it is NOT this one, block registration
    if (
      isAnyEmergencyRegistered() &&
      getCurrentRegisteredEmergency() !== waypointId
    ) {
      alert(
        "You are already registered to another emergency. Please unregister first."
      );
      return;
    }

    // Otherwise, register for *this* one
    setCurrentRegisteredEmergency(waypointId);
    setIsRegistered(true);
  };

  const handleUnregister = () => {
    const confirmUnregister = window.confirm(
      "Are you sure you want to unregister?"
    );
    if (confirmUnregister) {
      // Clear the global store
      setCurrentRegisteredEmergency(null);
      setIsRegistered(false);
    }
  };

  const handleReport = () => {
    const confirmReport = window.confirm(
      "Are you sure you want to report this emergency?"
    );
    if (confirmReport) {
      console.log(`User reported the emergency with ID ${waypoint.id}`);
    }
  };

  const handleConfirm = () => {
    const confirmAction = window.confirm(
      "Are you sure you want to confirm this emergency?"
    );
    if (confirmAction) {
      console.log(`User confirmed the emergency with ID ${waypoint.id}`);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    setMessages((prev) => [...prev, newMessage]);
    setNewMessage("");
  };

  // ===== Render =====
  return (
    <div style={{ padding: "1rem" }}>
      <h2>{waypoint.title}</h2>
      {waypoint.description}
      <br></br>
      <strong>Priority:</strong> {waypoint.priority}
      <br></br>
      <strong>Recommended Actions:</strong>
      <ul>
        <li>Stay tuned to local news and radio</li>
        <li>Prepare sandbags if priority is high</li>
        <li>Ensure you have an evacuation plan</li>
        {/* etc. */}
      </ul>
      {/* Conditionally show Register or the other 3 buttons */}
      {!isRegistered ? (
        <button onClick={handleRegister} style={{ marginRight: "8px" }}>
          Register for this Emergency
        </button>
      ) : (
        <>
          <button
            onClick={handleUnregister}
            style={{ marginRight: "8px", padding: "0.5rem" }}>
            Unregister
          </button>
          <button
            onClick={handleReport}
            style={{ marginRight: "8px", padding: "0.5rem" }}>
            Report
          </button>
          <button
            onClick={handleConfirm}
            style={{ marginRight: "8px", padding: "0.5rem" }}>
            Confirm
          </button>
        </>
      )}
      {/* If registered, show chat */}
      {isRegistered && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Local Chat</h3>
          <div
            ref={chatContainerRef}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
              maxHeight: "200px",
              overflowY: "auto",
            }}>
            {messages.length === 0 ? (
              <p style={{ fontStyle: "italic" }}>No messages yet.</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} style={{ margin: "0.5rem 0" }}>
                  <strong>User:</strong> {msg}
                </div>
              ))
            )}
          </div>

          <form
            onSubmit={handleSendMessage}
            style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EmergencyDetail;
