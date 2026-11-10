import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';

import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Contact from "./components/Contact";
import Services from './components/Services';
import Footer from './components/Footer';
import Products from "./components/Products";

function App() {
    const [count, setCount] = useState(0);
    const [contactRequest, setContactRequest] = useState(null);

    // enlace entre los híper-vínculos del componente Services con el formulario en Contact
    const handleWhatsAppContact = (message) => setContactRequest({ message });

    return (
        <>
        <div className="root-container">
            <header>
            <NavBar />
            </header>
            <main>
            <div className="site-eyebrow ps-1">
                <h1>Desarrollo Web y Software en Paraguay | Luca Rodríguez</h1>
            </div>
            <Banner />
            <Services onWhatsAppContact={handleWhatsAppContact} />
            <Products />
            <Contact contactRequest={contactRequest} />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
        </>
    )
}

export default App
