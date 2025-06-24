import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Welcome from '../Welcome'
import Bubble from './components/Bubble'
import Heap from './components/Heap'
import Insertion from './components/Insertion'
import Merge from './components/Merge'
import Quick from './components/Quick'
import Selection from './components/Selection'
import Shell from './components/Shell'
import Comparison from './pages/Comparison'
import Footer from './Footer'
function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Comparison-Algorithms" element={<Comparison/>} />
          <Route path="/Bubble-Sort" element={<Bubble/>} />
          <Route path="/Heap-Sort" element={<Heap/>}/>
          <Route path="/Insertion-Sort" element={<Insertion/>} />
          <Route path="/Merge-Sort" element={<Merge/>}/>
          <Route path="/Quick-Sort" element={<Quick/>}/>
          <Route path="/Selection-Sort" element={<Selection/>} />
          <Route path="/Shell-Sort" element={<Shell/>}/>   
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App