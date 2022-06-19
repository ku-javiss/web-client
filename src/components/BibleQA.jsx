import {Navbar,Container,Nav,Card,Button,InputGroup,FormControl,Form,Spinner,Row,Col } from 'react-bootstrap'
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {useSpeechRecognition, useSpeechSynthesis} from 'react-speech-kit';
import axios from 'axios';
import '../styles/BibleQA.css';
import CSVReader from 'react-csv-reader';
import Bible from './json_bible.json';
import BC from './biblec2j.json';
import robot from './pngegg.png'; 

function BibleQA(props) {
 
 
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  
  const [ONState,changeONState] = useState("OT");
  const [bookState,changeBookState] = useState("Choose");
  const [chapterState,changeChapterState] = useState("0");
  const [bookSelector,changeBookSelector] = useState();
  const [chapterSelector,changeChapterSelector] = useState();
  const [bibleText,changeBibleText] = useState();
  const [propsFlag,setPropsFlag] = useState(true);
  const Book1 = ["genesis","exodus","leviticus","numbers","deuteronomy","josuha","judges","ruth","1-samuel","2-samuel","1-kings","2-kings",
"1-chronicles","2-chronicles","ezra","nehemiah","esther","job","psalms","proverbs","ecclesiastes","song of solomon","isaiah","jeremiah","lamentations",
"ezekiel","daniel","hosea","joel","amos","obadiah","jonah","micah","nahum","habakkuk","zephaniah","haggai","zechriah","malachi"];
  const Book2 = ["matthew","mark","luke","john","acts","romans","1-corinthians","2-corinthians","galatians","ephesians","philippians","colossians"
,"1-thessalonians","2-thessalonians","1-timonthy","2-timonthy","titus","philemon","herbrews","james","1-Ppeter","2-peter","1-john","2-john","3-john","jude","revelation"];
  const Chapter1 = ["50","40","27","36","34","24","21","4","31","24","22","25","29","36","10","13","10","42","150","31","12","8","66","52","5"
,"48","12","14","3","9","1","4","7","3","3","3","2","14","4"];
  const Chapter2 = ["28","16","24","21","28","16","16","13","6","6","4","4","5","3","6","4","3","1","13","5","5","3","5","1","1","1","22"];
  const ONSelect = (e) =>{
    changeONState(e.target.value);
  }
  const BookSelect = (e) =>{
    changeBookState(e.target.value);
  }
  const ChapterSelect = (e) =>{
    changeChapterState(e.target.value);
  }
  
  useEffect(()=>
  {
    var mystring = props.biblelist[0]; 
    var find = props.biblelist[1]; 
    var find2 = props.biblelist[2]; 
    var regex = new RegExp(find, "g"); 
    var regex2 = new RegExp(find2,"g"); 
    var temp2 = find.replace(regex2,"<span class='highlightVerse'>" + find2 + "</span>");
    var temp = mystring.replace(regex, "<span class='highlightChapter'>" + temp2 + "</span>");
    changeBibleText(<span dangerouslySetInnerHTML={{ __html: temp}}></span>);
    
  },[props.biblelist[2],propsFlag])
  useEffect(() =>{
    
      if(ONState=="1"){
        changeBookSelector(Book1.map((item) => (
          <option value={item} key={item}>
          {item}
          </option>
          )));
      }else if(ONState=="2"){
        changeBookSelector(Book2.map((item) => (
          <option value={item} key={item}>
          {item}
          </option>
          )));
      }
    },[ONState]);
    
    useEffect(() =>{
      if(ONState=="1"){
        const match = (element) => element==bookState;
        let chapter = Book1.findIndex(match)
        let chapterArr = new Array();
        for(var i=1;i<=Chapter1[chapter];i++){
          chapterArr.push(i);
        }
        // console.log(chapterArr);
        changeChapterSelector(chapterArr.map((item)=>(
          <option value={item} key={item}>
          {item}
          </option>
        )));
        chapterArr.splice(0,chapterArr.length)
      }else if(ONState=="2"){
        const match = (element) => element==bookState;
        let chapter = Book2.findIndex(match)
        let chapterArr = new Array();
        for(let i=1;i<=Chapter2[chapter];i++){
          chapterArr.push(i);
        }
        changeChapterSelector(chapterArr.map((item)=>(
          <option value={item} key={item}>
          {item}
          </option>
        )));
        chapterArr.splice(0,chapterArr.length)
      } 
    },[bookState]);  
    useEffect(() =>{
      if(chapterState != '0'){
        changeBibleText(BC[bookState][chapterState]);
        props.biblelist[3](BC[bookState][chapterState]);
      }
    
    },[chapterState]); 
    
    

  return (
    <div className='container' id='base'>
        <div className='row'>
          <div className='col-12' id='Bible-text' >
          <Row className="mb-3">
           <Form.Group as={Col} controlId="formGridState">
              <Form.Label>OT/NT</Form.Label>
              <Form.Select defaultValue="0" onChange={ONSelect} value={ONState}>
              <option value="0" key="0">Choose..</option>
              <option value="1" key="1">OT</option>
              <option value="2" key="2">NT</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Book</Form.Label>
              <Form.Select onChange={BookSelect} value={bookState}>
                <option value="0" key="0">Choose..</option>
                {bookSelector};
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Chapter</Form.Label>
              <Form.Select onChange={ChapterSelect} value={chapterState}>
                <option value="0" key="0">Choose..</option>
                {chapterSelector}
              </Form.Select>
            </Form.Group>
          </Row>
          <div className='row'>
              <div className='row' id="biblerow">
              <div className='col-12' id='bibleplace'>
                {bibleText}
              </div>
            </div>
          </div>   
          </div>
        </div>   
    </div>
  );
}
export default BibleQA;