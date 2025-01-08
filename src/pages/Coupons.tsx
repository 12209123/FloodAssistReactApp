import React from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { RiCoupon2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';


const couponsData = [
  { id: 1, description: "-10% Local Stores", date: "until 17.06.2025" },
  { id: 2, description: "-10% Local Stores", date: "until 06.10.2025" },
  { id: 3, description: "-10% Local Stores", date: "until 15.11.2025" },
]

const Coupons: React.FC = () => {
  return (
    <Container style={{ marginTop: '20px', maxWidth:"500px" }}>
      <h1 style={{fontWeight:"bold", marginBottom:"1em"}}>Your Coupons</h1>
        {couponsData.map((item) => (
            <Link key={item.id} to="/couponDetail" className="text-decoration-none text-dark">
              <Card className="shadow border-0" style={{padding:"10px", marginBottom:"10px"}}>
                <Row className="align-items-center">
                  <Col xs={2}>
                    <RiCoupon2Line size="2em"/>
                  </Col>
                  <Col xs={5}>
                    <strong>{item.description}</strong>
                  </Col>
                  <Col xs={4}>
                    {item.date}
                  </Col>
                </Row>
              </Card>
            </Link>
        ))}
    </Container>
  );
};

export default Coupons;