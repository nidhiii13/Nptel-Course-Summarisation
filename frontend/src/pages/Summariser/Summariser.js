import React, { useEffect, useState } from 'react'
import DropDown from '../../Components/DropDown/DropDown';
import "./Summariser.css";
import axios from 'axios';
import { getCourses, getCourseTranscripts,downloadCourseTranscripts, summariseText, generateQues, generate_yt } from '../../api/api';
import Select from "react-dropdown-select";

const Summariser = () => {
    const list1 = [
        { label: "Aerospace Engineering", value: 1 },
        { label: "Biotechnology and Bioengineering", value: 2 },
        { label: "Chemical Engineering", value: 3 },
        { label: "Civil Engineering", value: 4 },
        { label: "Computer Science and Engineering", value: 5 },
        { label: "Economics", value: 6 }
      ];
       
    /* const list1=['Aerospace Engineering','Biotechnology and Bioengineering','Chemical Engineering','Civil Engineering','Computer Science and Engineering','Economics']; */ 
    const [list2,setList2] = useState([]);
    const [list3,setList3] = useState([]);
    const [text,setText] = useState("Summarised text here");
    const [dept,setDept] = useState("");
    const [course,setCourse] = useState("");
    const [lec,setLec] = useState("");
    const [flag,setFlag] = useState(false);
    const [yt,setYt] = useState("");
    const [yflag,setYflag] = useState(false);
    const [summFlag,setsummFlag] = useState(false);
    var sum ="";
    const [summ,setsumm] = useState("");
    const getCourseList = async(d) => {
      const dept = await getCourses(d);
      console.log(dept);
      let temp=[];
      let i=1;
      dept.map(d=>temp.push({label:d.course_name,value:i++}));
      setList2(temp);
      console.log(list2);
    };

    const getTranscriptsList = async(c) => {
        const list = await getCourseTranscripts(c);
        console.log(list.transcripts);
        let temp=[];
        let i=1;
        var ll=list.transcripts;
        /* ll.map(d=>{l=l.concat(i);
            temp.push({label:d.l,value:i++})}); */
            for (const key in ll) {

                console.log(`${key}: ${ll[key]}`);
                temp.push({label:i++,value:ll[key]});
            }
        setList3(temp);
        console.log(list3);
      };

      const downloadTranscripts = async(lec,link) => {
        const transcripts = await downloadCourseTranscripts(lec,link);
        setText(transcripts.transcript);
        console.log(transcripts);
        setFlag(true);

      };

    const handleDept = (dept)=>{
      setsumm("Summarised text here");
      setFlag(false);
      setYflag(false);
     setDept(dept);
     getCourseList(dept.label);
     console.log(dept);
    };

    const handleCourse = (course)=>{
        setFlag(false);
        setYflag(false);
        setsumm("Summarised text here");
        setCourse(course);
        getTranscriptsList(course.label);
       };

       const handleLec = (lec)=>{
        setFlag(false);
        setYflag(false);
        setsumm("Summarised text here");
        setLec(lec);
        console.log(lec.value);
        downloadTranscripts(lec.label.toString(),lec.value.toString());
        
       };

       const handleSubmit = async()=>{
           //console.log(text);
           console.log(course.label);
           console.log(lec.label.toString());
           const lk = await generate_yt(course.label,lec.label.toString());
           console.log(lk);
           setYflag(true);
        setYt(lk.yt);
        console.log(yt);
           var trim_text = text.trim();
           console.log(trim_text.slice(120,l));
           var l = trim_text.length;
           console.log(l);
          const summ_text = await summariseText(trim_text.slice(100,l));
          setsumm(summ_text.summ_text[0].summary_text);
          console.log(summ_text.summ_text[0].summary_text);
          sum = summ_text.summary_text;
          setsummFlag(true);
          console.log(summ_text);
          console.log(summ);
       };

       const generateQuestion = async()=>{
        const ques = await generateQues(summ);
        var q_list = ques.ques;
        setsumm(q_list.toString());
        console.log(q_list.toString());
       };
  return (
      <>
      <div className="Summariser_box">
      <div className="drop_box">
      <div className="db_1">
      <DropDown heading="Choose dept" options={list1} value={dept} onChange={handleDept}  /></div>
      <div className="db_2">
      <DropDown heading="choose course" options={list2} value={course} onChange={handleCourse}/></div>
      <div className="db_3">
      <DropDown heading="lec no" options={list3} value={lec} onChange={handleLec}/></div>
      {flag && <button className='go' onClick={handleSubmit}>GO</button>}
      </div>
      {yflag && <div className="yt">Link to Video : <a target="_blank"href={yt}>{yt}</a></div>}
      <div className="text_box">
          {summFlag && summ}
      </div>
      <button className='qs_button' onClick={generateQuestion}>Generate Qs</button>
      </div>
    </>
  )
}

export default Summariser;