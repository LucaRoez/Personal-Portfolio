import { Container, Row, Col, Card } from "react-bootstrap";
import services from "../data/service-cards.json";
import { GeoAlt, Display, Wechat, Diagram3 }  from 'react-bootstrap-icons';
import {  } from "../css/Services.css";

const serviceIcons = {
  1: GeoAlt,
  2: Display,
  3: Wechat,
  4: Diagram3
};
export const Services = ({ onWhatsAppContact  }) => {
  return (
    <section id="servicios" className="py-0">
      <Container>
        <header className="text-center mb-4">
          <h2>Soluciones digitales para tu negocio</h2>
          <p>
            Desarrollo web y software adaptado
            a las necesidades de cada proyecto.
          </p>
        </header>

        <Row xs={1} lg={2} className="g-4">
          {services.map((service) => {
            const Icon = serviceIcons[service.id];

            return (
              <Col key={service.id}>
                <Card className="h-100">
                  <Card.Body className="p-4 service-card">
                    <span className="mb-3 ms-1 icon-container">
                      {Icon && <Icon size={32} className="service-icon" />}
                    </span>
                    <Card.Title as="h3">
                      {service.title}
                    </Card.Title>

                    <Card.Text>
                      {service.body}
                    </Card.Text>

                    <a href="#contacto" onClick={() => onWhatsAppContact(service.linkMessage)}>
                      {service.btn}
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  );
}

export default Services;