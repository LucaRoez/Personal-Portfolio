import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useRef, useState, useEffect } from 'react';
import "../css/NavBar.css";
import logo from "../assets/logo-dark.png";

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);
  const togglerRef = useRef(null);

  // click y focus relativo al NavBar
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) // por fuera del navbar
      ) {
        navbarRef.current
          .querySelectorAll(".nav-link.active")
          .forEach((link) => link.classList.remove("active"));

        setExpanded(false);

        const activeElement = document.activeElement;
        if (activeElement?.matches(".custom-navbar .nav-link")) {
          activeElement.blur();
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  // focus del toggler global
  useEffect(() => {
    if (!expanded && document.activeElement === togglerRef.current) {
      togglerRef.current.blur();
    }
  }, [expanded]);

  // efecto del scroll sobre el NavBar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      fixed="top"
      expand={false}
      expanded={expanded}
      onToggle={(nextExpanded) => setExpanded(nextExpanded)}
      ref={navbarRef}
      className={`ps-1 custom-navbar custom-expand ${scrolled ? 'navbar-scrolled' : ''}`}
    >
      <Container fluid className="ps-1">
        <div className="identity-container">
          <div className="mt-1 me-3 logo-container">
            <img src={logo} alt="logo" className="logo-img" />
          </div>
          <Navbar.Brand className="fw-semibold me-2 brand-text" href="/"><a>Luca Rodríguez</a></Navbar.Brand>
        </div>
        <Navbar.Brand className="w-500 ms-2 me-auto brand-description" href="/"><a>DESARROLLO WEB · SOFTWARE · SOLUCIONES DIGITALES</a></Navbar.Brand>
        <Navbar.Toggle ref={togglerRef} aria-controls="nav-body" />
        <Navbar.Collapse id="nav-body">
          <Nav className="ms-auto">
            <Nav.Link href="#home" onClick={() => setExpanded(false)}>
              Inicio
            </Nav.Link>

            <Nav.Link href="#servicios" onClick={() => setExpanded(false)}>
              Servicios
            </Nav.Link>

            <Nav.Link href="#productos" onClick={() => setExpanded(false)}>
              Proyectos
            </Nav.Link>

            <Nav.Link href="#contacto" onClick={() => setExpanded(false)}>
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;