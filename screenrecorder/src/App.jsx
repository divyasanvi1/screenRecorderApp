
import { useState } from 'react';
import React from 'react';
import Home from './Home.jsx';
import AppComponent from './AppComponent.jsx';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {Route as Route6 ,Routes as Routes6} from 'react-router';
 
function App() {
  const [selectedMediaType,setSelectedMediaType]=useState('video')
  const [audioEnabled, setAudioEnabled] = useState(false);
  console.log("app :", audioEnabled);
  return (
   <Router>
    <Routes6>
      <Route6 path="/" element={<Home
      setSelectedMediaType={setSelectedMediaType} setAudioEnabled={setAudioEnabled}/>}/>
      <Route6 path="/app" element={<AppComponent  selectedMediaType={selectedMediaType} audioEnabled={audioEnabled}/>}/>
      console.log("app :", audioEnabled); 
    </Routes6>
   </Router>
    
  )
}

export default App;
