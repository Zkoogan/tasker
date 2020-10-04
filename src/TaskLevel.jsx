import React from 'react'
import {useState} from 'react';
import Card from './Card';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


export default function TaskLevel({TaskLevelType}) {

    const animatedComponents = makeAnimated();

    const [down, setdown] = useState(false);
    const [startX, setstartX] = useState(0);
    const [startScroll, setstartScroll] = useState(0);
    const [isActive, setIsActive] = useState({
      "Study": true,
      "Rest": true,
      "Play games": true,
      "Chores": true,
      "Exercise": true
    });
    const [item_types] = useState([
      {"label": <div className="selector-option"><img src={require("./images/book.png")} className="select-option-image"/> <p> Study </p> </div>  , "value": "Study"},
      {"label": <div className="selector-option"><img src={require("./images/chores.png")} className="select-option-image"/> <p> Chores </p> </div>  , "value": "Chores"},
      {"label": <div className="selector-option"><img src={require("./images/controller.png")} className="select-option-image"/> <p> Play games </p> </div>  , "value": "Play games"},
      {"label": <div className="selector-option"><img src={require("./images/sleep.png")} className="select-option-image"/> <p> Rest </p> </div>  , "value": "Rest"},
      {"label": <div className="selector-option"><img src={require("./images/exercise.png")} className="select-option-image"/> <p> Exercise </p> </div>  , "value": "Exercise"}
    ]);
    
    const [items] = useState([
        {
          "Task" : "Read a book",
          "Duration": 2,
          "Done": false,
          "Type": "Study",
          "img_src": require("./images/book.png")
        },
        {
          "Task" : "Play games",
          "Duration": 1,
          "Done": false,
          "Type": "Play games",
          "img_src": require("./images/controller.png")
        },
        {
          "Task" : "Study",
          "Duration": 4,
          "Done": false,
          "Type": "Study",
          "img_src": require("./images/book.png")
        },
        {
          "Task" : "Cook dinner",
          "Duration": 1,
          "Done": false,
          "Type": "Chores",
          "img_src": require("./images/chores.png")
        },
        {
          "Task" : "Sleep",
          "Duration": 8,
          "Done": false,
          "Type": "Rest",
          "img_src": require("./images/sleep.png")
        },
        {
          "Task" : "Play football",
          "Duration": 2,
          "Done": false,
          "Type": "Exercise",
          "img_src": require("./images/exercise.png")
        },
        {
          "Task" : "Work",
          "Duration": 6,
          "Done": false,
          "Type": "Play games",
          "img_src": require("./images/controller.png")
        },
        {
          "Task" : "Clean the house",
          "Duration": 1,
          "Done": false,
          "Type": "Chores",
          "img_src": require("./images/chores.png")
        },
        {
          "Task" : "Wash clothes",
          "Duration": 1,
          "Done": false,
          "Type": "Chores",
          "img_src": require("./images/chores.png")
        },
        {
          "Task" : "Go to the gym",
          "Duration": 1,
          "Done": false,
          "Type": "Exercise",
          "img_src": require("./images/exercise.png")
        }
        ,
        {
          "Task" : "Rest",
          "Duration": 1,
          "Done": false,
          "Type": "Rest",
          "img_src": require("./images/sleep.png")
        }
      
        ]);


    function HandleMouseDown(e){
      e.preventDefault();
      console.log(e);
      setdown(true);
      let diff = e.pageX;
      setstartX(diff);
      setstartScroll(document.querySelector(".card-list").scrollLeft);
    }

    function HandleMouseUp(){
      setdown(false);
    }

    function HandleMouseMove(e){
      e.preventDefault();

      if(down){
      let list = document.querySelector(".card-list");
      list.scrollLeft =  Math.max(0, startScroll - (e.pageX - startX) * 1.5);
      list.scrollLeft = Math.min(list.scrollLeft, list.scrollWidth - list.clientWidth);
    }
    }

    function HandleChanged(e){
      let values = {...isActive};
      Object.keys(values).map(v => values[v] = false);
      if(e){
        e.map(type => (values[type.value] = true));
      }
      setIsActive(values);
    }

    return (
        <div className="task-level"> 
            <div className="task-level-header-container">
            <h1 className="task-level-header">
                {TaskLevelType} Tasks
            </h1>
            <Select 
            components={animatedComponents} 
            isMulti 
            isSearchable 
            options={item_types} 
            className="type-selector"
             placeholder="Choose task type"
             defaultValue={item_types}
             onChange={HandleChanged}>
            </Select>
            </div>
            <section className={"card-list" + (down ? " active" : "")} 
                                  onMouseDown={(e) => HandleMouseDown(e)} 
                                  onMouseMove={(e) => HandleMouseMove(e)} 
                                  onMouseLeave={HandleMouseUp} 
                                  onMouseUp={HandleMouseUp}>
                {items.sort(function(a,b){ return a["Duration"] < b["Duration"] ? -1 : 1}).map(item => (
                  isActive[item.Type] ? 
                    <Card item={item}/> : null
                    ))}
            </section>
            </div>
    )
}
