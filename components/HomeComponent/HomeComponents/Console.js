import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { keyPressed } from "../EditorHandler";
import "../../../style/Content.css";

export const Console = ({showTerminal}) => {


    const [tab , setPlus] = useState(["local"]);
    const [selected , setSelect] = useState(0);
    const [content,setContent] = useState(`<span><font class='fas fa-arrow-right'></font><span class=''> Classroom </span></span>&nbsp;`);


    const addTab = (index) => {
        setPlus((state) => {
            changeSelect(index + 1) ;
            state.push("local" + (state.length));
            return [...state];
        })
    }

    const deleteTab = (tab) => {
        setPlus(state => {
            state = state.filter(item => tab !== item);
            changeSelect(state.length - 1);
            if(state.length === 0){
                showTerminal(false);
            }
            return [...state] ;
        });

        

    }

    const changeSelect = (index) => {
        setSelect((state) => {
            state = Number(index)
            return state ;
        })
    }
    
    return <div>    
        {tab.length === 0 ? '' :
            <div className="container">
                <div className="row" style={{backgroundColor:'#003d66'}}>
                    <div style={{float:'left', paddingLeft:'10px'}}>Terminal: {tab.map((item,index) => <span key={item} style={{ borderBottom:`${selected === index ? '4px solid #1aa3ff' : 'none'}` , paddingRight:'5px' ,cursor:'pointer'}}>
                           <span onClick={() => changeSelect(index)}> {item} </span> <span onClick={() => deleteTab(item)} className="far fa-times-circle"></span> {index + 1 === tab.length ? <span onClick={() => addTab(index)} className="fas fa-plus fa-sm"></span> : ''}
                        </span>)} 
                    </div>
                </div>
                <div className="row content">
                    <div className="col-12" style={{outline:'0px solid transparent' ,
                            padding:'10px'} }>
                    <ContentEditable style={{padding:'10px', border:'1px solid gray', height:'150px'}}
                                    html={content} onChange={(event) => setContent(event.target.value)}
                                    onKeyDown={event => keyPressed(event, setContent)} />
                    </div>
                </div>
            </div>
        } 
    </div>
}