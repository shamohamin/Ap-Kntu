import React from 'react' ;
import { URLS } from '../../redux/REST-data/URLS';
import { GITURL } from '../../redux/Types/Types';

const listStyle = {
    listStyle : 'none' ,
    margin: '0px',
    marginLeft: '0px',
    paddinLeft: '0px',
    dispaly : 'inline',
    color: 'white'
};

const liStyle = {
    float:'left'
};

export const HomeToolbar = ({runClick , setWord , setWord2, setWord3 , setWord4}) => {
    
    const updateWord = () => {
        setWord("") ;
        setWord2("") ;
        setWord3("") ;
        setWord4("") ;
        runClick() ;
    }


    return <div>
        <div className="home-toolbar">
            <div style={{margin:'0px', padding:'0px'}}>
                <div className="container">
                    <div className="row">
                        <ul  style={listStyle} className="col bar">
                            <li style={liStyle}> <span> Classroom </span> <span style={{ paddingRight:'5px' , paddingTop:'5px' }} className="fa fa-angle-right fa-xs"></span></li>
                            <li style={liStyle}> <span> src </span> <span style={{ paddingRight:'5px' , paddingTop:'5px' }} className="fa fa-angle-right fa-xs"></span>  </li>
                            <li style={liStyle}> <span> main </span> <span style={{ paddingRight:'5px' , paddingTop:'5px' }} className="fa fa-angle-right fa-xs"></span> </li>
                            <li style={liStyle}> <span> java </span> <span style={{ paddingRight:'5px' , paddingTop:'5px' }} className="fa fa-angle-right fa-xs"></span> </li>
                            <li style={liStyle}> <span> ir </span> <span style={{ paddingRight:'5px' , paddingTop:'5px' }} className="fa fa-angle-right fa-xs"></span> </li>
                            <li style={liStyle}> <span> ac </span> <span style={{ paddingRight:'5px' , paddingTop:'5px' }} className="fa fa-angle-right fa-xs"></span> </li>
                            <li style={liStyle}> <span> kntu </span> <span style={{ paddingRight:'5px' , paddingTop:'5px' }} className="fa fa-angle-right fa-xs"></span> </li>
                            <li style={listStyle}> <span style={{paddingTop:'5px'}}> Classroom.java </span> </li>                                
                        </ul>
                        <a target="_blank" style={{float:"right" , paddingTop:'2px' , cursor:'pointer' ,color:'orange' , paddingRight : '8px'}} href={URLS[GITURL]} rel="noopener noreferrer"  arial-hidden="true"><span className="fab fa-gitlab"></span> </a>
                        <span onClick={() => updateWord()} style={{float:"right", paddingTop:'6px', cursor:'pointer' , paddingRight:'10px', color:'green'}} className="fas fa-caret-left fa-lg"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}