import { useEffect, useState } from 'react'; 
import { Container, Row, Col } from 'react-bootstrap';
import CarouselModule from "react-multi-carousel";
import '../css/Banner.css';
import "react-multi-carousel/lib/styles.css";

const options = ['páginas y aplicaciones web', 'soluciones digitales', 'diseños personalizados'];
export const Banner = () => {
  const [optionIndex, setOptionIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState('');
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseDuration = 1900;
  const resetDuration = 300;

  useEffect(() => {
    if (options.length === 0) return

    const currentOption = options[optionIndex % options.length];
    let delay = deleting ? deletingSpeed : typingSpeed;

    if (!deleting && text === currentOption) {
      delay = pauseDuration;
    } else if (deleting && text === '') {
      delay = resetDuration;
    }

    const timeout = setTimeout(() => {
      if (!deleting && text === currentOption) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setOptionIndex((index) => (index + 1) % options.length);
      } else {
        setText(
          currentOption.substring(
            0,
            text.length + (deleting ? -1 : 1)
          )
        );
      }
    }, delay)

    return () => clearTimeout(timeout)
    }, [
        text,
        deleting,
        optionIndex
    ]);
  
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1200 },
            items: 2,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1200, min: 768 },
            items: 1,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    const Carousel = CarouselModule.default; // parche de error de importación desconocido
    const projects = [
        { id: 1, title: 'Página web', src: '', alt: 'Sitio corporativo' },
        { id: 2, title: 'Aplicación web', src: '', alt: 'Sistema de gestión' },
        { id: 3, title: 'Tienda online', src: '', alt: 'Catálogo de productos' }
    ];

    return (        
        <section id="home" className="mt-2">
            <Container className="bg-secondary p-5">
                <Row className="my-3">
                    <Col className="bg-dark text-light p-4 rounded-5">
                        <div className="mx-4 typing-banner">
                            <h1>Soy Luca Ezequiel Rodríguez, tu desarrollador de
                                <span> {text}</span><span className="typing-cursor">_</span></h1>
                            <p></p>
                        </div>
                        <img src="" alt="" />
                    </Col>
                    <Col md={6}>
                        <Carousel responsive={responsive} infinite={true} className="projects-carousel">
                            {
                                projects.map((project) => (
                                    <div key={project.id} className="project-card">
                                        <img src={project.src} alt={project.alt} />
                                        <h2 className="carousel-text">{project.title}</h2>
                                    </div>
                                ))
                            }
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner;