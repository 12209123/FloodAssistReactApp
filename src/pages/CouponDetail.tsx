import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { IoStorefront } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoLocationOutline } from "react-icons/io5";

const storeData = [
    { id: 1, storeName: "-10% Local Stores" },
    { id: 2, storeName: "-10% Local Stores" },
    { id: 3, storeName: "-10% Local Stores" },
]

const CouponDetail: React.FC = () => {
  return (
    <Container style={{ marginTop: '20px' }}>
     <Card className="mb-3" border="danger">
      <Card.Body>
        <Card.Img variant="top" src="/coupon_background.jpg" />
        <Card.Title className="text-center">Coupon</Card.Title>
        <Card.Text className="text-muted text-center mb-4">
          -10% Local Stores
        </Card.Text>
          <small>Expires: 27.10.2025</small>
      </Card.Body>
    </Card>

    <h1 style={{fontWeight:"bold", marginBottom:"1em"}}>Participating Stores</h1>
    {storeData.map((item) => (
      <Link key={item.id} to="/couponDetail" className="text-decoration-none text-dark">
        <Card className="shadow border-0" style={{padding:"10px", marginBottom:"10px"}}>
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
      </Link>
    ))}
  </Container>
  );
};

export default CouponDetail;