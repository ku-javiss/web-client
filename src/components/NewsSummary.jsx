import {Navbar,Container,Nav,Card,Button,InputGroup,FormControl,Form,Spinner } from 'react-bootstrap'
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {useSpeechRecognition, useSpeechSynthesis} from 'react-speech-kit';
import axios from 'axios';
import '../styles/NewsSummary.css'

function NewsSummary(props){
    const [answerstate,changeAnswerState] = useState('');
    
    useEffect(()=>{
        console.log(props.value)
        console.log(props.value[1]);
        changeAnswerState(props.value);
    },[props.value]);
    if(answerstate == ''){
        return(<div><h1>Loading...</h1></div>)
    }
    else{
    return(
        
        <div id='newsRow'>
            <div id='newsAnswer'>
                <h1>{answerstate[1].site}:{answerstate[1].title}</h1>
                <h3>{answerstate[1].content}</h3>    
            </div>
            <div id='newsAnswer'>
                <h1>{answerstate[2].site}:{answerstate[2].title}</h1>
                <h3>{answerstate[2].content}</h3>    
            </div>
            <div id='newsAnswer'>
                <h1>{answerstate[3].site}:{answerstate[3].title}</h1>
                <h3>{answerstate[3].content}</h3>    
            </div>
            <div id='newsAnswer'>
                <h1>{answerstate[4].site}:{answerstate[4].title}</h1>
                <h3>{answerstate[4].content}</h3>    
            </div>
            <div id='newsAnswer'>
                <h1>{answerstate[5].site}:{answerstate[5].title}</h1>
                <h3>{answerstate[5].content}</h3>    
            </div>
        </div>
        
    );
    }
} 
export default NewsSummary;