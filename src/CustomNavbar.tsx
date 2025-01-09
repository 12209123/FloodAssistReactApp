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
    <Container fluid className="d-flex p-0">
      <Container
        className='position-fixed d-flex flex-column bg-light p-0 pb-3'
        style={{ paddingBottom:"1em", minHeight:"100vh", maxHeight:"100vh", zIndex:1, width:"auto"}}
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
              <Row key={index} as={Link} to={item.path} className="text-decoration-none text-dark" style={item.label === "Account" ? { marginTop: "auto" } : undefined} onClick={() => setIsExpanded(false)} >
                <Col xs={3} style={{marginLeft:"1em", marginRight:"1em"}}>{item.icon}</Col>
                {isExpanded && <Col xs="auto" className="d-flex align-items-center">{item.label}</Col>}
              </Row>
          ))}
      </Container>

      <Container fluid className='m-0 p-0 z-index-0' style={{zIndex:0}}>
        {children}
      </Container>
    </Container>
  );
};

export default CustomNavbar;