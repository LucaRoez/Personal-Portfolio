import "../css/Footer.css";

export const Footer = () => {
    return (
        <section id="footer">
            <div className="footer-presentation-container">
                <h4 className="footer-title">Luca Rodríguez</h4>
                <p className="footer-description">DESARROLLO WEB Y SOFTWARE</p>
                <p className="footer-text">Soluciones digitales para empresas, profesionales y comercios.</p>
            </div>
            <hr />
            <div className="footer-navegation-container">
                <div className="footer-navigation-column">                    
                    <h6 className="footer-navigation-column-title">Navegación</h6>
                    <p className="footer-navigation-column-text-link">Inicio</p>
                    <p className="footer-navigation-column-text-link">Servicios</p>
                    <p className="footer-navigation-column-text-link">Contacto</p>
                </div>
                <div className="footer-navigation-column">                    
                    <h6 className="footer-navigation-column-title">Contacto y perfiles</h6>
                    <p className="footer-navigation-column-text-link"></p>
                </div>
            </div>
            <hr />
            <div className="footer-copyright"><p>© 2026 Luca Rodríguez · Desarrollo web y software</p></div>
        </section>
    );
}

export default Footer;