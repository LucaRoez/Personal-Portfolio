import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import NavBar from './components/NavBar'
import Banner from './components/Banner'
import Contact from "./components/Contact";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="">
        <NavBar />
        <div>
           <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item href="#">DESARROLLO WEB Y SOFTWARE</Breadcrumb.Item>
            <Breadcrumb.Item href="#">PARAGUAY</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Banner />
        <Contact />
      </div>
    </>
  )
}

export default App
