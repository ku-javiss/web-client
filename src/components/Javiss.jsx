import {Navbar,Container,Nav,Card,Button,InputGroup,FormControl,Form,Spinner } from 'react-bootstrap'
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {useSpeechRecognition, useSpeechSynthesis} from 'react-speech-kit';
import axios from 'axios';
import BibleQA from './BibleQA';
import NewsSummary from'./NewsSummary';
import ReactPlayer from 'react-player/lazy';
import PlayMedia from './PlayMedia'
import GeneralQA from './GeneralQA';
import '../styles/Javiss.css';


function Javiss({  }) {
 
  let [inputSearch,changeSearch] = useState('');
  let [inputText,changeInputText] = useState('');
  let [outputText,changeOutputText] = useState('');
  const [sttState,setSttState] = useState("Listen");
  const [domainState,changeDomainState] = useState('');
  const [generalState,changeGeneralState] = useState('');
  const [generalFinal,changeGeneralFinal] = useState('');
  const [boldState,changeBoldState] = useState('');
  const [answerState, changeAnswerState] = useState('');
  const [domainFunction,changeFunction] = useState('');
  const [bibleAnswer,changeBibleAnswer] = useState('');
  const [bibleBook,changeBibleBook] = useState('');
  const [bibleChapter,changeBibleChapter] = useState('');
  const [bibleChapterT,changeBibleChapterT] = useState('');
  const [bibleVerse,changeBibleVerse] = useState('');
  const [bibleVerseT,changeBibleVerseT] = useState('');
  const [newsSummary,changeNewsSummary] = useState('');
  const [responseValue, setResponseValue] = useState(null);
  const [sDomain,changeSDomain] = useState('')
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const [responseTranslate,setResponseTranslate] = useState();
  const [spinnerState,setSpinnerState] = useState();
  const [spinnerState2,setSpinnerState2] = useState();
  const [spinnerState3,setSpinnerState3] = useState();
  const [spinnerState4,setSpinnerState4] = useState();
  const [spinnerState5,setSpinnerState5] = useState();
  const [spinnerState6,setSpinnerState6] = useState();
  const [btState,changeBtState] = useState('');
  const [btElectra,changeBtElectra] = useState('');
  const [searchCount,setSearchCount] = useState(0);
  const [searchTemp,setSearchTemp] = useState('');
  const [searchTemp2,setSearchTemp2] = useState('');
  const [ttsTemp,setTtsTemp] = useState('');

  const [mediaCheck,setMediaCheck] = useState('');
  const biblelist = [bibleChapterT,bibleVerseT,bibleAnswer,changeBtState];
  useEffect(() =>{
    if(responseValue){
      cd(responseValue);
    }
  },[responseValue]);
  // useEffect(()=>{
  //   ds(searchTemp);
  // },[searchTemp])
  useEffect(()=>
  {
    var mystring = generalState;
    var find = boldState;
    var regex = new RegExp(find, "g");
    var temp = mystring.replace(regex, "<span class='highlight'>" + find + "</span>");
    changeGeneralFinal(temp);
  },[generalState])
 
  useEffect(() =>{
    switch(domainState){
      case 'BibleQA' :
        setTtsTemp(bibleAnswer);
        changeFunction(<div>
        <div className='row' id='recommand'><div className='col-12'>추천 답변</div></div>
        <div className='row' id='bibleAnswer'><div className='col-12'>{bibleAnswer}</div></div>
        <div className='row' id='biblePosition'><div className='col-12'>Book : {bibleBook}, Chapter : {bibleChapter}, Verse:{bibleVerse}</div></div>
        
          선택 답변
        <div className='row' id='bibleElectra'>
          <Button className='col-md-3' onClick={()=>{
            setSpinnerState2(<Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />);
            axios.post('http://222.234.108.254:3001/javiss/insert',{ "question": searchTemp, "paragraph" : btState}).then(
              (response)=>{ 
                changeBtElectra(response.data);
                setSpinnerState2("");
      
            })
            .catch(()=>{ console.log("fail");changeAnswerState("Connect Fail!");setSpinnerState(""); });
           
          }}>{spinnerState2}선택검색</Button>
        <div className='col-md-9' id='bibleElectraAnswer'>{btElectra}</div>
        </div>
        <BibleQA biblelist = {biblelist}/>
        </div>);
        return ;
      case 'PlayMedia' : 
        console.log(answerState);
        changeFunction(<div id="mediaplace"><PlayMedia value = {answerState}/></div>);
       
        // changeFunction(<ReactPlayer
        //     className='react-player'
        //     url={answerState}    // 플레이어 url
        //     width='100%'         // 플레이어 크기 (가로)
        //     height='100%'        // 플레이어 크기 (세로)
        //     playing={true}        // 자동 재생 on
        //     muted={true}          // 자동 재생 on
        //     controls={true}       // 플레이어 컨트롤 노출 여부
        //     light={false}         // 플레이어 모드
        //     pip={true}            // pip 모드 설정 여부
        // />);
      
        return ;
      case 'News':
        setTtsTemp(newsSummary);
        changeFunction(<NewsSummary value = {newsSummary}/>);
        return ;
      case 'GeneralQA':
        setTtsTemp(generalFinal);
        changeFunction(
          <div>
          <div className='row' id='recommandG'><div className='col-12'>추천 답변</div></div>
          <div className='row' id='generalAnswer' ><div className='col-12' dangerouslySetInnerHTML={{ __html: generalFinal}}></div></div>
          <div>
            <div className ='row' id='gSearchBtn'>
              <Button className='col-md-12' onClick={()=>{
            setSpinnerState2(<Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />);
            axios.post('http://222.234.108.254:3001/javiss/insert',{ "question": searchTemp, "paragraph" : inputText}).then(
              (response)=>{ 
                console.log(response.data)
                changeOutputText(response.data);
                setSpinnerState2("");
      
            })
            .catch(()=>{ console.log("fail");changeOutputText("Connect Fail!");setSpinnerState2(""); });
           
          }}>{spinnerState2}선택검색</Button></div>
            <div className='row' id='textrow'>
                  <div className='col-md-6' id='insert-text'  >
                      <textarea className = 'input' placeholder="요약 및 검색 하고싶은 텍스트를 입력해주세요" onChange={(e) => { changeInputText(e.target.value)}}/>
                  </div>

                  <div className='col-md-6' id='summary-text'  >
                       <textarea className = 'output' value={outputText}/>
                  </div>
            </div>
          </div>
        {/* <GeneralQA id='GQA'/> */}
        </div>);
        return ;
      default : 
        return ;
    }
  },[domainState,answerState,bibleAnswer,changeBtState,btElectra,btState,newsSummary,generalFinal,spinnerState2
    ,spinnerState3,spinnerState4,spinnerState5,spinnerState6,bibleBook,bibleChapter,inputText,ttsTemp]);
  const {speak,voices} = useSpeechSynthesis({onEnd,});
  const {listen, listening, stop} = useSpeechRecognition({
      onResult: (result) => {
        changeSearch(result);
      },
    });
  const onKeyPress=(e)=>{
    if(e.key=='Enter'){
      setSearchTemp(inputSearch);
      changeOutputText("");
      changeFunction(<>Loading{spinnerState}</>);
      setTtsTemp('');
      search();
    }
  }
  function search(){
    setSpinnerState(<Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />);
    // axios.post('https://222.234.108.254:8443/javiss/translate',{"question": inputSearch}).then(
      // (response)=>{console.log(response); console.log(response.data); changeSearch(response.data);setSearchTemp(response.data);
        axios.post('http://222.234.108.254:3001/domain/classify',{"question": inputSearch ,"sdomain": ""}).then(
          (response)=>{ 
            console.log(inputSearch);
            setResponseValue(response.data);
            setSpinnerState("");
        })
    .catch(()=>{ console.log("fail");changeAnswerState(<>Connect Fail!</>);setSpinnerState(""); });
  // }) 
}
  useEffect(()=>{
    search2();
  },[sDomain,searchCount])
  function search2(){
    axios.post('http://222.234.108.254:3001/domain/classify',{"question": inputSearch, "sdomain" :sDomain }).then(
      (response)=>{ 
        setResponseValue(response.data);
        setSpinnerState3("");
        setSpinnerState4("");
        setSpinnerState5("");
        setSpinnerState6("");

    })
    .catch(()=>{ console.log("fail");changeAnswerState(<>Connect Fail!</>);setSpinnerState(""); });
  
  }

  function cd(domain){
    changeDomainState(domain.domain)
    {switch (domain.domain) {
      case 'BibleQA' :
        //changeFunction(<BibleQA/>);
        changeBibleAnswer(domain.bible.answer);
        changeBibleBook(domain.bible.book);
        changeBibleChapter(domain.bible.chapter);
        changeBibleVerse(domain.bible.verse);
        changeBibleChapterT(domain.bible.chapter_text);
        changeBibleVerseT(domain.bible.verse_text);
        return ;
      case 'PlayMedia' : 
        changeAnswerState(domain.url);
 
        // changeFunction(<div><PlayMedia value = {answerState}/>);
        return ;
      case 'News':
        changeNewsSummary(domain.news);
        return ;
      case 'GeneralQA':
        if(domain.bold!=""){
          changeBoldState(domain.bold);
          changeGeneralState(domain.general);
         
        }
        else{
          changeGeneralState(domain.general);
        }
        return ;
      default : 
        return 
    }
    }
  }
  // async function cdCall(domain){
  //   await cd(domain);
  //   return;
  // }
    

  return (
    <div className='container' id='base'>
        <div className='row' id='search-text'>
          <div className='col-9' id='searchbox'>
          <input className = 'search' value={inputSearch} placeholder="Search..." onChange={(e) => { changeSearch(e.target.value)}} onKeyDownCapture={onKeyPress}/>
          </div>
          <div className='col-3' id="sbbox">
            <Button onClick={async ()=>{
                  changeOutputText("");
                  changeFunction(<>Loading{spinnerState}</>);
                  setTtsTemp('');
      
                  setSearchTemp(inputSearch)
                  search();
            // })
            }} variant="primary" id='searchbutton'>{spinnerState}Command</Button>
          </div>
          {/* <div className='col-1' id="voicebox">
          <button id="voicebutton" onMouseDown={()=>{listen({lang : "en-US"});setSttState("Listening")}} onMouseUp={()=>{stop();setSttState("Listen")}}>
            {sttState}
          </button>
          </div>
          <div className='col-1' id="voicebox">
          <button id="speakbutton" onClick={()=>{
            speak({text : ttsTemp ,voice : voices[3] });
          }}>
            🔊
          </button>
          </div> */}
        </div>
        <div className='row' id="domainrow">
          <div className='col-3' id='domaincol'>
          <Button onClick={()=>{setSpinnerState3(<Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />);changeSDomain('BibleQA');setSearchCount(searchCount+1);
            // })
            }} variant="primary" id='bibleBtn'>{spinnerState3}BibleQA🔎</Button>
          </div>
          <div className='col-3' id='domaincol'>
          <Button onClick={()=>{setSpinnerState4(<Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />);changeSDomain('News');setSearchCount(searchCount+1);
            // })
            }} variant="primary" id='generalBtn'>{spinnerState4}NewsSummary🔎</Button>
          </div>
          <div className='col-3' id='domaincol'>
          <Button onClick={()=>{setSpinnerState5(<Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />);changeSDomain('GeneralQA');setSearchCount(searchCount+1);
            // })
            }} variant="primary" id='newsBtn'>{spinnerState5}GeneralQA🔎</Button>
          </div>
          <div className='col-3' id='domaincol'>
          <Button onClick={()=>{setSpinnerState6(<Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />);changeSDomain('PlayMedia');setSearchCount(searchCount+1);
            // })
            }} variant="primary" id='playBtn'>{spinnerState6}PlayMedia🔎</Button>
          </div>
        </div>
       
        <div className='row' id="functionrow">
          <div className='col-12' id='functionplace'>
          {domainFunction}
          </div>
        </div>
      </div>
  );
}
export default Javiss;