import useState from 'react';
import CarouselModule from "react-multi-carousel";
import products from "../data/products-carousel.json";
import "../css/Products.css";

export const Products = () => {
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

    const Arrow = ({ onClick, direction }) => (
        <button
            type="button"
            className={`products-arrow products-arrow-${direction}`}
            onClick={onClick}
            aria-label={direction === "left" ? "Proyecto anterior" : "Proyecto siguiente"}
        >
            {direction === "left" ? "‹" : "›"}
        </button>
    );
    
    const Carousel = CarouselModule.default;
    return (
        <section id="productos" className="mt-5">
            <Carousel
                responsive={responsive}
                arrows
                customLeftArrow={<Arrow direction="left" />}
                customRightArrow={<Arrow direction="right" />}
                showDots={false}
                swipeable
                draggable
                infinite
                keyBoardControl
                containerClass="products-carousel"
                itemClass="products-carousel-item"
            >
                {
                    products.map((product) => (
                        <article className="product-slide" key={product.title}>
                            {
                                product.previewUrl && (
                                    <iframe
                                        className="product-preview"
                                        src={product.previewUrl}
                                        title={`Demostración de ${product.title}`}
                                        loading="lazy"
                                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                    />
                                )
                            }

                            <div className="product-overlay">
                                <div className="product-content">
                                    <h2>{product.title}</h2>
                                    <p>{product.body}</p>

                                    {
                                        product.url && (
                                            <a
                                                className="product-button"
                                                href={product.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {product.btn}
                                            </a>
                                        )
                                    }
                                </div>
                            </div>
                        </article>
                    ))
                }
            </Carousel>
        </section>
    )
}

export default Products;