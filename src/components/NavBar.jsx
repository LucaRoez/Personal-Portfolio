import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import "../css/NavBar.css";
import logo from "../assets/logo-dark.png";

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar fixed="top" expand={false} className={`ps-1 custom-navbar custom-expand ${scrolled ? 'navbar-scrolled' : ''}`}>
      <Container fluid className="ps-1">
        <div className="identity-container">
          <div className="mt-1 me-3 logo-container">
            <img src={logo} alt="logo" className="logo-img" />
          </div>
          <Navbar.Brand className="fw-semibold me-2 brand-text" href="/">Luca Rodríguez</Navbar.Brand>
        </div>
        <Navbar.Brand className="w-500 ms-2 me-auto brand-description" href="/">DESARROLLO WEB · SOFTWARE · SOLUCIONES DIGITALES</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-body" />
        <Navbar.Collapse id="nav-body">
          <Nav className="ms-auto">
            <Nav.Link href="#home">
              Inicio
            </Nav.Link>

            <Nav.Link href="#servicios">
              Servicios
            </Nav.Link>

            <Nav.Link href="#contacto">
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;