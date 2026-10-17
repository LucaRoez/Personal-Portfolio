import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../css/Contact.css';

const WHATSAPP_NUMBER = import.meta.env.CONTACT_EMAIL;
const CONTACT_EMAIL = import.meta.env.WHATSAPP_NUMBER;

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const buildMessage = () => `
        Nombre: ${formData.name}
        Correo: ${formData.email}
        Asunto: ${formData.subject}

        Mensaje:
        ${formData.message}
    `.trim();

    const handleWhatsApp = (event) => {
        event.preventDefault();

        const message = encodeURIComponent(buildMessage());
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleGmail = (event) => {
        event.preventDefault();

        const params = new URLSearchParams({
            view: 'cm',
            fs: '1',
            to: CONTACT_EMAIL,
            su: formData.subject,
            body: buildMessage()
        });

        window.open(
            `https://mail.google.com/mail/?${params.toString()}`,
            '_blank',
            'noopener,noreferrer'
        );
    };

    return (
        <section id="contact" className="contact-section py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8}>
                        <div className="contact-card p-4 p-md-5">
                            <h2 className="text-center mb-2">
                                Contactame
                            </h2>

                            <p className="text-center mb-4">
                                Completá el formulario y elegí
                                cómo querés enviarme tu consulta.
                            </p>

                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="contactName">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Tu nombre"
                                                value={formData.name}
                                                onChange={handleChange}
                                                autoComplete="name"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="contactEmail">
                                            <Form.Label>Correo electrónico</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="tu@email.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                autoComplete="email"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3" controlId="contactSubject">
                                    <Form.Label>Asunto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="subject"
                                        placeholder="Motivo de tu consulta"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="contactMessage">
                                    <Form.Label>Mensaje</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="message"
                                        rows={5}
                                        placeholder="Contame qué necesitás..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-flex flex-column flex-sm-row gap-3">
                                    <Button
                                        variant="success"
                                        className="flex-fill"
                                        type="button"
                                        onClick={handleWhatsApp}
                                    >
                                        Enviar por WhatsApp
                                    </Button>

                                    <Button
                                        variant="dark"
                                        className="flex-fill"
                                        type="button"
                                        onClick={handleGmail}
                                    >
                                        Enviar por Gmail
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Contact;