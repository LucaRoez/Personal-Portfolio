import { useEffect, useState } from 'react'; 
import { Container, Row, Col } from 'react-bootstrap';
import CarouselModule from "react-multi-carousel";
import { ArrowUpRight } from "react-bootstrap-icons";
import hero from "../assets/hero.jpg";
import '../css/Banner.css';
import "react-multi-carousel/lib/styles.css";
import options from "../data/texto-banner.json";
import services from "../data/services-banner.json";


const images = import.meta.glob("../assets/images/services/*", {
  eager: true,
  query: "?url",
  import: "default"
});

export const Banner = () => {
  const [optionIndex, setOptionIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState('');
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseDuration = 2300;
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
            items: 1,
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

    return (
        <section id="home" className="p-3 pt-0 mt-1">
            <Container fluid>
                <Row className="my-3 mt-0">
                    <Col id="first-col" className="p-4 rounded-3 d-flex flex-column">
                        <div className="hero-layout">
                            <div className="typing-banner">
                                <h1>Hacé crecer tu negocio con
                                    <span> {text}</span><span className="typing-cursor">_</span></h1>
                                <p></p>
                            </div>
                            <div className="hero-image rounded-3">
                                <img src={hero} alt="perfil" />
                            </div>
                            <div className="btn-content ms-auto">
                                <button className="btn-cta">Solicitar presupuesto <ArrowUpRight size={18} strokeWidth={2}/></button>
                            </div>
                        </div>
                    </Col>
                    <Col id="second-col" xl={6}>
                        <Carousel responsive={responsive} infinite={true} swipeable={true} draggable={true} className="services-carousel">
                            {
                                services.map((service) => {
                                    const src = images[`../assets/images/services/${service.src}`];

                                    return (
                                        <div key={service.id} className="service-card text-center">
                                            <div className="card-img-container">
                                                { src && <img
                                                    className="service-img"
                                                    src={src} alt={service.alt}
                                                    style={{ objectPosition: service.objectPosition ?? "center" }}
                                                /> }
                                            </div>
                                            <h2 className="carousel-title mt-4">{service.title}</h2>
                                            <p className="carousel-text">{service.body}</p>
                                        </div>
                                    );
                                })
                            }
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner;