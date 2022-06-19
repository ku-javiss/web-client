import {Navbar,Container,Nav,Card,Button,InputGroup,FormControl,Form,Spinner } from 'react-bootstrap'
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {useSpeechRecognition, useSpeechSynthesis} from 'react-speech-kit';
import axios from 'axios';
import '../styles/InputVersion.css';

function InputVersion({ nickname }) {
    let [inputSearch,changeSearch] = useState('');
    let [inputText,changeInputText] = useState('');
    let [outputText,changeOutputText] = useState('');
    const [voiceIndex, setVoiceIndex] = useState(null);
    const [sttState,setSttState] = useState("Listen");
    const [spinnerState,setSpinnerState] = useState()
    const {speak,voices} = useSpeechSynthesis();
    const {listen, listening, stop} = useSpeechRecognition({
        onResult: (result) => {
          changeSearch(result);
        },
      });
  return (
    <div className='container'>
        <div className='row' id='search-text'>
          <div className='col-9' id='searchbox'>
          <input className = 'search' value={inputSearch} placeholder="검색내용을 입력하세요" onChange={(e) => { 
            changeSearch(e.target.value);
            
          }}/>
          </div>
          <div className='col-1' id="sbbox">
            <Button onClick={async ()=>{
              setSpinnerState(<Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />);
              await axios.post('https://3.34.182.242:3001/javiss/translate',{"question": inputSearch}).then(
                (response)=>{console.log(response); changeSearch(response.data);
                  axios.post('https://3.34.182.242:3001/javiss/insert',{ "question": response.data , "paragraph" : inputText}).then((response)=>{ console.log(response); changeOutputText(response.data);setSpinnerState("")})
                  .catch((error)=>{ 
                    if(error.response){
                      console.log(error.response.data);
                      console.log(error.response.status);
                      console.log(error.response.headers);
                      console.log("요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.");changeOutputText("Connect Fail!"); 
                    }else if (error.request) {
                      console.log(error.request);
                      console.log("요청이 이루어 졌으나 응답을 받지 못했습니다.");
                    }
                    else {
                      console.log('Error', error.message);
                      console.log("오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.");
                    }
                    console.log(error.config);
    
                    });}
                    )
              .catch((error)=>{ 
                if(error.response){
                  console.log("요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.");
                }else if (error.request) {
                  console.log("요청이 이루어 졌으나 응답을 받지 못했습니다.");
                }
                else {
                  console.log("오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.");
                }
                });
            }} variant="primary" id='searchbutton'><span id="searchspinner" visibility="hidden">{spinnerState}</span>Search</Button>
          </div>
          <div className='col-1' id="voicebox">
          <button id="voicebutton" onMouseDown={()=>{listen({lang : "en-US"});setSttState("Listening")}} onMouseUp={()=>{stop();setSttState("Listen")}}>
            {sttState}
          </button>
          </div>
          <div className='col-1' id="voicebox">
          <button id="speakbutton" onClick={()=>{
            speak({text : outputText ,voice : voices[3] });
          }}>
            🔊
          </button>
          </div>
        </div>
        <div className='row' id='text-row'>
          <div className='col-md-6' id='insert-text'  >
          <textarea className = 'input' placeholder="요약 및 검색 하고싶은 텍스트를 입력해주세요" onChange={(e) => { changeInputText(e.target.value)}}/>
          </div>

          <div className='col-md-6' id='summary-text'  >
          <textarea className = 'output' value={outputText} onChange={(e) => { e = outputText}}/>
          </div>
        </div>
      </div>
    
  );
}

export default InputVersion;