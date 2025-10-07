import { useState } from 'react'
import './App.css'
import Bg from './Bg'
import PizzaSlider from './PizzaSlider'
import About from './About'
import FlowMenu from './FlowMenu'
import Carousel from './Carousel'
import Footer from './Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Bg/>     
      <PizzaSlider/> 
      <About/>
      <FlowMenu/>
      <Carousel/>
      <Footer/>
    </>
  )
}

export default App
