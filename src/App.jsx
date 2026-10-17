import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import NavBar from './components/NavBar'
import Banner from './components/Banner'
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
      </div>
    </>
  )
}

export default App
