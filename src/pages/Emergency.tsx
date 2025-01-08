import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { emergencies } from "../data/emergencies";
import {
  getCurrentRegisteredEmergency,
  setCurrentRegisteredEmergency,
  isAnyEmergencyRegistered,
  getCurrentUserId,
} from "../globalRegistrationStore";
import { Button, Modal, Toast } from "react-bootstrap";

function EmergencyDetail() {
  const [showUnregister, setShowUnregister] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlreadyRegisteredToast, setShowAlreadyRegisteredToast] =
    useState(false);
  const [showRemovedToast, setShowRemovedToast] = useState(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // <-- to navigate programmatically
  const waypointId = Number(id);

  // Find the matching emergency from the shared array
  const waypoint = emergencies.find((wp) => wp.id === waypointId);

  if (!waypoint) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>Emergency Details</h2>
        <p>No emergency info found for ID: {id}</p>
      </div>
    );
  }

  // We check if the current user is the *owner*
  const currentUserId = getCurrentUserId();
  const isOwner = waypoint.ownerId === currentUserId;

  // Normal "registered" logic if the user is not owner
  const [isRegistered, setIsRegistered] = useState(false);

  // Chat states
  const [messages, setMessages] = useState<string[]>([
    "Hello from user1",
    "Stay calm, I'm on my way!",
    "Anyone else close by?",
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // "Close Emergency" modal states
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Hardcoded list of 7 users to choose from when closing
  const availableUsers = [
    "user1",
    "user2",
    "user3",
    "user4",
    "user5",
    "user6",
    "user7",
  ];

  // On mount, check if this user is already registered
  useEffect(() => {
    if (getCurrentRegisteredEmergency() === waypointId) {
      setIsRegistered(true);
    }
  }, [waypointId]);

  // Auto-scroll chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // ===== Handlers: Register / Unregister / Report / Confirm =====
  const handleRegister = () => {
    if (
      isAnyEmergencyRegistered() &&
      getCurrentRegisteredEmergency() !== waypointId
    ) {
      setShowAlreadyRegisteredToast(true);
      return;
    }
    setCurrentRegisteredEmergency(waypointId);
    setIsRegistered(true);
  };

  // ===== Chat Send =====
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    setMessages((prev) => [...prev, newMessage]);
    setNewMessage("");
  };

  // ===== "Close Emergency" Flow for Owner =====
  const handleCloseEmergency = () => {
    // Show the "choose coupon recipients" modal
    setShowCloseModal(true);
  };

  // Toggle user selection in the modal
  const handleToggleUser = (user: string) => {
    setSelectedUsers((prev) => {
      if (prev.includes(user)) {
        return prev.filter((u) => u !== user);
      } else {
        return [...prev, user];
      }
    });
  };

  // Confirm close (owner picks who gets coupons)
  const handleConfirmClose = () => {
    console.log("Owner gave coupons to:", selectedUsers);

    // Now remove this emergency from the array so it disappears from the map
    const index = emergencies.findIndex((wp) => wp.id === waypointId);
    if (index !== -1) {
      emergencies.splice(index, 1);
    }

    // If the user was the owner and also 'registered', clear registration
    if (getCurrentRegisteredEmergency() === waypointId) {
      setCurrentRegisteredEmergency(null);
    }

    setShowCloseModal(false);
    setSelectedUsers([]);

    // Navigate back to the map
    navigate("/", { state: { showRemovedToast: true } });
  };

  const handleCancelClose = () => {
    // If the user cancels, just hide the modal and go back to map
    setShowCloseModal(false);
  };

  // Decide whether to show chat:
  // - The owner might also want to see the chat,
  //   so let's allow chat if you're the owner OR you're registered.
  const showChat = isOwner || isRegistered;

  // ===== Render =====
  return (
    <div style={{ padding: "1rem" }}>
      <Modal show={showUnregister} onHide={() => setShowUnregister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Unregister</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to unregister?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUnregister(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setCurrentRegisteredEmergency(null);
              setIsRegistered(false);
              setShowUnregister(false);
            }}>
            Unregister
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showReport} onHide={() => setShowReport(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to report this emergency?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReport(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowReport(false);
            }}>
            Report
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to confirm this emergency?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowConfirm(false);
            }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast
        style={{ position: "fixed" }}
        show={showAlreadyRegisteredToast}
        onClose={() => setShowAlreadyRegisteredToast(false)}>
        <Toast.Header></Toast.Header>
        <Toast.Body>
          Already registered to another emergency. Unregister first.
        </Toast.Body>
      </Toast>

      <h2>{waypoint.title}</h2>
      <p>{waypoint.description}</p>
      <p>
        <strong>Priority:</strong> {waypoint.priority}
      </p>
      <p>
        <strong>Type:</strong> {waypoint.type}
      </p>

      {/* If user is the owner, only show "Close Emergency" */}
      {isOwner ? (
        <button onClick={handleCloseEmergency} style={{ padding: "0.5rem" }}>
          Close Emergency
        </button>
      ) : (
        /* Otherwise, show normal user buttons */
        <>
          {!isRegistered ? (
            <button onClick={handleRegister} style={{ marginRight: "8px" }}>
              Register for this Emergency
            </button>
          ) : (
            <>
              <button
                onClick={() => setShowUnregister(true)}
                style={{ marginRight: "8px", padding: "0.5rem" }}>
                Unregister
              </button>
              <button
                onClick={() => setShowReport(true)}
                style={{ marginRight: "8px", padding: "0.5rem" }}>
                Report
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                style={{ marginRight: "8px", padding: "0.5rem" }}>
                Confirm
              </button>
            </>
          )}
        </>
      )}

      {/* Show chat if user is owner OR registered */}
      {showChat && (
        <div style={{ marginTop: "2rem", maxWidth: "500px", margin: "auto" }}>
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
            style={{ display: "flex", gap: "0.5rem" }}>
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

      {/* "Close Emergency" modal (for owner) */}
      {showCloseModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999, // ensure it's on top
          }}>
          <div
            style={{
              background: "#fff",
              padding: "1rem",
              borderRadius: "4px",
              width: "300px",
              maxWidth: "90%",
            }}>
            <h3>Choose users for coupons</h3>
            {availableUsers.map((user) => (
              <div key={user}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user)}
                    onChange={() => handleToggleUser(user)}
                  />
                  {user}
                </label>
              </div>
            ))}

            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={handleConfirmClose}
                style={{ marginRight: "1rem" }}>
                Confirm
              </button>
              <button onClick={handleCancelClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmergencyDetail;
