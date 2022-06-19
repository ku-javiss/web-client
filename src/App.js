import logo from './logo.svg';
import {Navbar,Container,Nav,Card,Button,InputGroup,FormControl,Form } from 'react-bootstrap'
import React, { useState, useRef, useCallback, useEffect } from 'react';
import './App.css';
import {Link,Route,Switch,Routes} from 'react-router-dom';
import Javiss from './components/Javiss';
import image from './artificial-intelligence-white.png';

function App() {

  let [versionMenu,changeVersion] = useState();

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
        
        <Navbar.Brand href="#home"><img src={image} width='30' height='30'/>JAVISS</Navbar.Brand>
        </Container>
      </Navbar>
      {/* <InputVersion></InputVersion> */}
      <Routes>
      <Route exact path="/" element={<Javiss />}/>
      
      </Routes>

      
    </div>  
  );
}

export default App;
