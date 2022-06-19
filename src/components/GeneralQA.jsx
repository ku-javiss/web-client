import {Navbar,Container,Nav,Card,Button,InputGroup,FormControl,Form,Spinner } from 'react-bootstrap'
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {useSpeechRecognition, useSpeechSynthesis} from 'react-speech-kit';
import axios from 'axios';
import '../styles/GeneralQA.css';

function GeneralQA({  }){

    let [inputText,changeInputText] = useState('');
    let [outputText,changeOutputText] = useState('');
    return(
     <div>
        <div className='row' id='textrow'>
                <div className='col-md-4' id='insert-text'  >
                    <textarea className = 'input' placeholder="요약 및 검색 하고싶은 텍스트를 입력해주세요" onChange={(e) => { changeInputText(e.target.value)}}/>
                </div>

                <div className='col-md-4' id='summary-text'  >
                    <textarea className = 'output' value={outputText} onChange={(e) => { e = outputText}}/>
                </div>
        </div>
      </div>
    );
} 
export default GeneralQA;