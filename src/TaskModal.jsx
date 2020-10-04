import React from 'react'
import ReactDOM from 'react-dom'
import {useState} from 'react'; 
import TextTransition, { presets } from "react-text-transition";

export default function TaskModal({item, setOpen, setDone}) {

    const [finished, setfinished] = useState(false);
    const [hours, sethours] = useState("0" + item.Duration);
    const [minutes, setminutes] = useState("00");
    const [seconds, setseconds] = useState("00");
    const [start_time] = useState(Date.now());


    const run_time = item.Duration * 3600;

    function calculateTime(){
        
        let time_elapsed = Date.now() - start_time;
        let seconds_elapsed = Math.floor(time_elapsed / 1000);
        let time_left = run_time - seconds_elapsed;

        if(time_left <= 0){
            setfinished(true);
            sethours("00");
            setminutes("00");
            setseconds("00");
            return;
        }

        let h = Math.floor(time_left / 3600);
        let m = Math.floor((time_left - (h*3600))/60);
        let s = time_left - (h*3600 + m * 60);

        if(!document.hidden){
            sethours(("" + h).padStart(2, '0'));
            setminutes(("" + m).padStart(2, '0'));
            setseconds(("" + s).padStart(2, '0'));   
        }
    }

    function HandleFinished(){
        setDone(true);
        setOpen(false);
    }

    React.useLayoutEffect(() => {
        if(!finished){
        let ID = setInterval(() =>
          calculateTime(),
          1000
        );
        return () => clearInterval(ID);
      }},[hours, minutes, seconds, finished]);


    return ReactDOM.createPortal(
        <>
        <div className="modal-background">

        </div>
        <div className="modal-container">
            <div className="task-description">
                <img src={item.img_src} className="task-img"></img>
                <h2>{item.Task}</h2>
            </div>
            <div className="separator"></div>
            <div className="timer-container">
            <div className="timer">
                <TextTransition text={hours} springConfig={presets.stiff}/>
            </div>
            <div className="timer">
                 : 
            </div>
            <div className="timer">
                <TextTransition text={minutes} springConfig={presets.stiff}/>
            </div>

            <div className="timer">
                 : 
            </div>

            <div className="timer">
                <TextTransition text={seconds} springConfig={presets.stiff}/>
            </div>
            </div>
            { finished ?
            <div className="finish-button" onClick={HandleFinished}>
                Finish
            </div> : null
            }
        </div>
        </>, document.getElementById('portal')
    )
}
