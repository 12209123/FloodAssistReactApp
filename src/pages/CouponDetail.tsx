import React from 'react';
import { Button, Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { IoStorefront } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoLocationOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const storeData = [
    { id: 1, storeName: "Huber Handel" },
    { id: 2, storeName: "Huber Handel" },
    { id: 3, storeName: "Huber Handel" },
]

const CouponDetail: React.FC = () => {
  const [progress, setProgress] = useState(100); // Start at 100%
  const [timeLeft, setTimeLeft] = useState(2 * 60); // Start at 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false); // Track if the timer is running

  const startTimer = () => {
    if (isRunning) return; // Prevent multiple timers
    setIsRunning(true);

    const totalTime = 2 * 60 * 1000; // 5 minutes in milliseconds
    const interval = 1000; // Update every second
    const decrement = 100 / (totalTime / interval); // Calculate decrement per interval

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress - decrement;

        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;

          if (newTimeLeft <= 0) {
            clearInterval(timer); // Stop timer when it reaches 0
            setIsRunning(false); // Reset running state
            return 0;
          }

          return newTimeLeft;
        });

        return newProgress > 0 ? newProgress : 0; // Ensure progress doesn't go below 0
      });
    }, interval);
  };

  // Format time using date-fns
  const formatTime = (seconds: number) => {
    const date = new Date(0); // Epoch time
    date.setSeconds(seconds); // Set seconds
    return format(date, "mm:ss"); // Format as MM:SS
  };

  return (
    <Container style={{ marginTop: '20px' }}>
     <Card className="mb-3 p-0 mx-auto" border="danger" style={{maxWidth:"500px"}}>
      <Card.Img variant="top" src="/coupon_background.jpg" />
      <Card.Body className='p-0 pt-2'>
        <Card.Title className="text-center" style={{fontSize:"2em", fontWeight:"bold"}}>Coupon</Card.Title>
        <Card.Text className="text-muted text-center mb-0">
          -10% Local Stores
        </Card.Text>
        <Card.Text className="text-muted text-center">
          Expires: 27.10.2025
        </Card.Text>
        <ProgressBar className='p-0' label={isRunning ? "Valid for: " + formatTime(timeLeft) : "Redeem Coupon"} variant='danger' now={progress} onClick={() => startTimer()} style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', height:"3em", fontSize:"1em" }}></ProgressBar>
      </Card.Body>
    </Card>

    <Container style={{maxWidth:"500px"}}>
      <h2 style={{fontWeight:"bold", marginBottom:"1em"}}>Participating Stores</h2>
      {storeData.map((item) => (
        <Card key={item.id}className="shadow border-0" style={{padding:"10px", marginBottom:"10px"}}>
          <Row className="align-items-center">
            <Col xs={2}>
              <IoStorefront size="2em"/>
            </Col>
            <Col xs={5}>
              <strong>{item.storeName}</strong>
            </Col>
            <Col xs={2} className='ms-auto'>
                <Link to={{"pathname":"/"}} className="text-decoration-none text-dark">
                    <IoLocationOutline size="2em"/>
                </Link>
            </Col>
          </Row>
        </Card>
      ))}
      </Container>
  </Container>
  );
};

export default CouponDetail;