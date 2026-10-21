import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Tab,
  Alert
} from 'react-bootstrap';
import { EnvelopeAtFill, Whatsapp } from 'react-bootstrap-icons';
import '../css/Contact.css';

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export const Contact = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar el correo");
      }

      setStatus({
        type: "success",
        message: "Tu consulta fue enviada correctamente."
      });

      setFormData(initialForm);
    } catch (er) {
      setStatus({
        type: "danger",
        message: er.message
      });
    } finally {
      setLoading(false);
    }
  };

    return (
        <section id="contact" className="contact-section py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8} className="pane-container rounded-2">
                        <h2 className="text-center mb-4">Contactame</h2>

                        <Tab.Container defaultActiveKey="gmail">
                            <Nav variant="tabs" className="mb-4">
                                <Nav.Item>
                                    <Nav.Link eventKey="gmail">
                                        <EnvelopeAtFill className="mb-1 me-1" size={21} color="#3a4fda"/>
                                        Gmail
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="whatsapp">
                                        <Whatsapp className="mb-1 me-1" size={22} color="#25D366"/>
                                        WhatsApp
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <Tab.Content>
                                <Tab.Pane eventKey="gmail">
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="ps-1">Nombre</Form.Label>
                                                    <Form.Control
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        maxLength={100}
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="ps-1">Correo electrónico</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        maxLength={184}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="ps-1">Asunto</Form.Label>
                                            <Form.Control
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                maxLength={150}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="ps-1">Mensaje</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                maxLength={5500}
                                            />
                                        </Form.Group>

                                        {status && (
                                            <Alert variant={status.type} role="status">
                                                {status.message}
                                            </Alert>
                                        )}

                                        <Row className="d-flex px-2 mt-4">
                                            <Button type="submit" disabled={loading}>
                                                {loading ? "Enviando..." : "Enviar por correo"}
                                            </Button>
                                        </Row>
                                    </Form>
                                </Tab.Pane>

                                <Tab.Pane eventKey="whatsapp">
                                    <p>
                                        Próximamente: contacto directo por WhatsApp.
                                    </p>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Contact;