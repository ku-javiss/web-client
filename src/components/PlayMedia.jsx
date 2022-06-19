import {Navbar,Container,Nav,Card,Button,InputGroup,FormControl,Form,Spinner } from 'react-bootstrap'
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {useSpeechRecognition, useSpeechSynthesis} from 'react-speech-kit';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';

function PlayMedia(props){
    const [urlState,setUrlState] = useState('');
    const [mediaReturn,setReturn] = useState('');
    const [count,setCount] = useState('');
    const[,updateState] = useState();
    const forceUpdate = useCallback(()=>updateState({}),[]);
    useEffect(()=>{
        setReturn(<>loading</>);
        setUrlState(props.value);
    },[props])
    
    useEffect(()=>{
        setReturn(<ReactPlayer
            className='react-player'
            url={urlState}    // 플레이어 url
            width='100%'         // 플레이어 크기 (가로)
            height='100%'        // 플레이어 크기 (세로)
            playing={true}        // 자동 재생 on
            muted={true}          // 자동 재생 on
            controls={true}       // 플레이어 컨트롤 노출 여부
            light={false}         // 플레이어 모드
            pip={true}            // pip 모드 설정 여부
    />)
    forceUpdate();
    },[urlState])
    useEffect(()=>{
        forceUpdate();
    },[count])
   
    
    setTimeout(()=>setCount(count++),100);
    if(props.value=="None"||props.value==""){
        return(
            <h5>None Search result!</h5>
        )
    }else{
        console.log(props.value)
        // setTimeout(function(){
            
            return(
                <>{mediaReturn}</> 
                // <ReactPlayer
                //     className='react-player'
                //     url={props.value}    // 플레이어 url
                //     width='100%'         // 플레이어 크기 (가로)
                //     height='100%'        // 플레이어 크기 (세로)
                //     playing={true}        // 자동 재생 on
                //     muted={true}          // 자동 재생 on
                //     controls={true}       // 플레이어 컨트롤 노출 여부
                //     light={false}         // 플레이어 모드
                //     pip={true} />
              );
        // },300);
        
    }
    

    
} 
export default PlayMedia;