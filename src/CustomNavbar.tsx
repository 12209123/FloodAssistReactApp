import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FiMenu } from "react-icons/fi";
import { ReactNode } from 'react';
import { RiCoupon2Line } from "react-icons/ri";
import { FaRegMap } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { MdStars } from "react-icons/md";
import { Link } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import { FiSettings } from "react-icons/fi";


const CustomNavbar = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { icon: <FaRegMap size="3em"/>, label: 'Discover', path: '/'},
    { icon: <MdStars size="3em"/>, label: 'Current Task', path: '/currentTask'},
    { icon: <RiCoupon2Line size="3em"/>, label: 'Coupons', path: '/coupons'},
    { icon: <FiPlusCircle size="3em"/>, label: 'Create Task', path: '/createTask'},
    { icon: <MdAccountCircle size="3em"/>, label: 'Account', path: '/account'},
    { icon: <FiSettings size="3em"/>, label: 'Settings', path: '/settings'},
  ];

  return (
    <Container fluid className="d-flex vh-100 p-0">
      <Col
        xs="auto"
        style={{ display: 'flex', flexDirection: 'column', paddingBottom:"1em"}}
        
      >
        <Row>
          <Col xs="auto">
            <Button
              variant="tertiary"
              onClick={toggleSidebar}
            >
              <FiMenu size="3em"/>
            </Button>
          </Col>
        </Row>
          
          {menuItems.map((item, index) => (
              <Row key={index} as={Link} to={item.path} className="text-decoration-none text-dark" style={item.label === "Account" ? { marginTop: "auto" } : undefined} onClick={toggleSidebar} >
                <Col xs={3} style={{marginLeft:"1em", marginRight:"1em"}}>{item.icon}</Col>
                {isExpanded && <Col xs="auto" className="d-flex align-items-center">{item.label}</Col>}
              </Row>
          ))}
      </Col>

      {/* Main Content */}
      <Col className="flex-grow-1">
        {children}
      </Col>
    </Container>
  );
};

export default CustomNavbar;