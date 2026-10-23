import { useState, useEffect } from 'react';
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
import { getWhatsAppLink } from "../utils/whatsapp.js";

const initialEmailForm = {
    name: "",
    email: "",
    subject: "",
    message: "Hola, quisiera consultar sobre sus servicios de desarrollo web y software."
};

const initialWhatsAppForm = {
    name: "",
    message: "Quisiera consultar sobre sus servicios de desarrollo web y software."
};

export const Contact = ({ contactRequest }) => {
    // forms
    const [emailFormData, setEmailFormData] = useState(initialEmailForm);
    const [whatsappFormData, setWhatsAppFormData] = useState(initialWhatsAppForm);
    // UI
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    
    // Services link effects
    const [activeTab, setActiveTab] = useState("gmail");
    useEffect(() => {
        if (!contactRequest) return;

        setActiveTab("whatsapp");

        setWhatsAppFormData((previous) => ({
            ...previous,
            message: contactRequest.message
        }));
    }, [contactRequest]);

    const handleChange = (event, setFormData) => {
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
            body: JSON.stringify(emailFormData)
        });

        if (!response.ok) {
            throw new Error("No se pudo enviar el correo");
        }

        setStatus({
            type: "success",
            message: "Tu consulta fue enviada correctamente."
        });

        setEmailFormData(initialEmailForm);
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
        <section id="contacto" className="contact-section py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8} className="pane-container rounded-2 pb-3 pt-2">
                        <h2 className="text-center mb-4">Contactame</h2>

                        <Tab.Container
                            defaultActiveKey="gmail"
                            activeKey={activeTab}
                            onSelect={(key) => {
                                if (key) setActiveTab(key);
                            }}
                        >
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
                                                        value={emailFormData.name}
                                                        onChange={(event) => handleChange(event, setEmailFormData)}
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
                                                        value={emailFormData.email}
                                                        onChange={(event) => handleChange(event, setEmailFormData)}
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
                                                value={emailFormData.subject}
                                                onChange={(event) => handleChange(event, setEmailFormData)}
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
                                                value={emailFormData.message}
                                                onChange={(event) => handleChange(event, setEmailFormData)}
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
                                    <Form
                                        onSubmit={(event) => {
                                            event.preventDefault();

                                            const message = `Hola, soy ${whatsappFormData.name.trim()}.\n\n${whatsappFormData.message.trim()}`;
                                            window.open(
                                                getWhatsAppLink(message),
                                                "_blank",
                                                "noopener,noreferrer"
                                            );
                                        }}
                                    >
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ps-1">Nombre / Presentación</Form.Label>
                                            <Form.Control
                                                name="name"
                                                value={whatsappFormData.name}
                                                onChange={(event) => handleChange(event, setWhatsAppFormData)}
                                                required
                                                maxLength={100}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="ps-1">Mensaje</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                name="message"
                                                value={whatsappFormData.message}
                                                onChange={(event) => handleChange(event, setWhatsAppFormData)}
                                                required
                                                maxLength={5500}
                                            />
                                        </Form.Group>

                                        <Row className="d-flex px-2 mt-4">
                                            <Button type="submit">
                                                Continuar con WhatsApp
                                            </Button>
                                        </Row>
                                    </Form>
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