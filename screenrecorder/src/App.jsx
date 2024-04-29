
import { useState } from 'react';
import React from 'react';
import Home from './Home.jsx';
import AppComponent from './AppComponent.jsx';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {Route as Route6 ,Routes as Routes6} from 'react-router';

function App() {
  const [selectedMediaType,setSelectedMediaType]=useState('video')
  return (
   <Router>
    <Routes6>
      <Route6 path="/" element={<Home
      setSelectedMediaType={setSelectedMediaType}/>}/>
      <Route6 path="/app" element={<AppComponent  selectedMediaType={selectedMediaType}/>}/>
    </Routes6>
   </Router>
    
  )
}

export default App;
