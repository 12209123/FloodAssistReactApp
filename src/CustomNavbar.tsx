import Sidebar from 'react-bootstrap-sidebar-menu';
import { Link } from 'react-router-dom';
import './CustomNavbar.scss';

const CustomNavbar = () => {
  return (
    <Sidebar>
      <Sidebar.Collapse>
        <Sidebar.Header>
          <Sidebar.Brand>Brand</Sidebar.Brand>
          <Sidebar.Toggle />
        </Sidebar.Header>
        <Sidebar.Body>
          <Sidebar.Nav>
            <Sidebar.Nav.Link>
              <Sidebar.Nav.Icon><span>menu item icon</span></Sidebar.Nav.Icon>
              <Sidebar.Nav.Title><span>menu item title</span></Sidebar.Nav.Title>
            </Sidebar.Nav.Link>
            <Sidebar.Sub>
              <Sidebar.Sub.Toggle>
                <Sidebar.Nav.Icon />
                <Sidebar.Nav.Title><span>sub menu item title</span></Sidebar.Nav.Title>
              </Sidebar.Sub.Toggle>
              <Sidebar.Sub.Collapse>
                <Sidebar.Nav>
                  <Sidebar.Nav.Link>
                    <Sidebar.Nav.Icon><span>sum menu item icon</span></Sidebar.Nav.Icon>
                    <Sidebar.Nav.Title><span>sub menu item title</span></Sidebar.Nav.Title>
                  </Sidebar.Nav.Link>
                </Sidebar.Nav>
              </Sidebar.Sub.Collapse>
            </Sidebar.Sub>
          </Sidebar.Nav>
        </Sidebar.Body>
      </Sidebar.Collapse>
    </Sidebar>
  );
};

export default CustomNavbar;
