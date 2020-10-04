import React from 'react';
import './index.css';
import {useState} from 'react';
import TaskModal from './TaskModal';

export default function Card({item}) {   


    function HandleClick(e){
        e.preventDefault();
        setopen(true);
    }

    const [open, setopen] = useState(false);
    const [done, setdone] = useState(false);
    const [postfix, setpostfix] = useState("hours");

    if(item.Duration == 1 && postfix == "hours")
        setpostfix("hour");

    if(done)
        return null;

    
    return (
        <article className="card">
            <header className="card-header">  
                <p>
                     Duration: {item.Duration} hours        
                </p>
                <h2>
                     {item.Task}
                </h2>
                
            </header>

            <div className="card-description">
                <img src={item.img_src} className="img-icon"/>
                <div className="description-text">
                    <div className="description-prefix">
                        Task:
                    </div>
                    {item.Task} for {item.Duration} {postfix}
                </div>
            </div>
            {open ? 
            <TaskModal item={item} setOpen={setopen} setDone={setdone}></TaskModal> : null
            }
            <div className="done-button" onClick={HandleClick}>
                    <span>Start timer</span>
                </div>
        </article>
        
    )
}
