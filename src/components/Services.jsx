import { Container, Row, Col, Card } from "react-bootstrap";
import services from "../data/service-cards.json";

export const Services = () => {
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

        <Row xs={1} md={2} className="g-4">
          {services.map((service) => (
            <Col key={service.id}>
              <Card className="h-100 service-card">
                <Card.Body className="p-4">
                  <Card.Title as="h3">
                    {service.title}
                  </Card.Title>

                  <Card.Text>
                    {service.body}
                  </Card.Text>

                  <a href="#contacto">
                    {service.btn}
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Services;