import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button'

export const NavBar = () => {
  return (
    <Navbar expand="md" data-bs-theme="dark" className="bg-dark">
      <Container>
        <Navbar.Brand className="w-700" href="#home">Desarrollo de Software</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" eventKey="inicio">
              Inicio
            </Nav.Link>

            <Nav.Link href="/servicios" eventKey="servicios">
              Servicios
            </Nav.Link>

            <Nav.Link href="/contacto" eventKey="contacto">
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;