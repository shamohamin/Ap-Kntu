import React,{useEffect , useState, useLayoutEffect} from 'react';
import "../../style/Home.css";
import { useRouter } from "next/router";
import { HomeToolbar } from './HomeToolbar';
import { CheckPMDTest } from './CheckPMDTest';
import { Console } from './HomeComponents/Console';
import CheckPMDtext from "../contents/CheckPMDTest";
import CheckStyleText from "../contents/CheckStyle";
import $ from 'jquery';


const Home = () => {
    const [word , setWord] = useState("") ;
    const [word2 , setWord2] = useState("") ;
    const [word3 , setWord3] = useState("") ;
    const [word4 , setWord4] = useState("") ;
    const [timerArray , setTimer] = useState([]);
    const [icon , setIcon] = useState(false) ;
    const [PMD , showPMD] = useState(false) ;
    const [terminal, showTerminal] = useState(true) ;
    const [CheckStyle, showCheckStyle] = useState(false) ;
    const router = useRouter() ;

    const updateWord = () => {
        const JAVAWORD = "public class Classroom {";
        const FINALHOMEWORK = "final static String HOMEWORK ;" ;
        const FINAlLEADERBOARD = "final static String LEADERBOARD ;";
        for(let i = 0 ; i <= JAVAWORD.length ; i++){
            setTimer(state => {
                state.push(setTimeout(() => setWord(() => JAVAWORD.substr(0,i)),i*150))
                return state ;
            });
        }

        let time = setTimeout(() => {
            for(let i = 0 ; i < FINALHOMEWORK.length + 1 ; i++){
                
                setTimeout(() => {
                    setWord2(() => FINALHOMEWORK.substring(0,i))
                }, i*150);
            }
        }, 3950);
    
        let time2 = setTimeout(() => {
            clearTimeout(time);
            for(let i = 0 ; i <= FINAlLEADERBOARD.length ; i++){
                
                setTimer(state => {
                    state.push(setTimeout(() => {
                        setWord3(() => FINAlLEADERBOARD.substring(0,i))
                    }, i*150));
                    return state ;
                })
            }
        }, 8500);
        
        setTimer(state => { 
            state.push(setTimeout(() => {
                clearTimeout(time2);
                setWord4("}");
            }, 13600));
            return state ;
        });
        
    }
    

    const chooseContent = () => {
        if(CheckStyle){
            return <CheckPMDTest text = {CheckStyleText} /> ;
        }else if(PMD){
            return <CheckPMDTest text= {CheckPMDtext} /> ;
        }else{
            return <React.Fragment>
                <div>
                    <span style={{color:'orange'}}>
                        package
                    </span>
                    <span> ir.ac.kntu</span>
                    <span style={{color:'orange' ,fontStyle:'bold'}}> ; </span>
                </div>
                <div className="te">
                    <span>{word.substr(0,12)}</span>
                    {word.substring(12)}
                </div>        
                <div className="right-link"
                        onClick={() => router.replace('/homeworks') }>
                        <span>{word2.substr(0,12)}</span>
                        <span style={{color:'white'}}> {word2.substr(12,20)} </span>
                </div>
                <div className="left-link " onClick={() => router.push('/leaderboard/1')}>
                    <span>{word3.substr(0,12)}</span>
                    { 
                        word3.length !== 0 ? word3.substr(12) : ''
                    }      
                </div>
                <div className="bracket">
                    {word4}
                </div> 
            </React.Fragment>
        }
    }

    const makeWidthBetter = () => {
        $('.project-menu').toggle(10 ,'linear' ,() => {
            if(!$('.project-menu span').is(':visible')){
                $(".home-component .main-row div[class^='col-8']").not('.console').removeClass().addClass('col-10');
                $(".home-component .main-row div[class^='col-4' ]").not('.console').removeClass().addClass('col-1');
                $('.home-component .toggle-project-menu').css({'border':'none', 'cursor':'pointer' , 'transform':'rotate(90deg)', 'padding-down':'40px', 'padding-left' : '30px'});
                $('.toggle-project-menu span').hide();
            }else{
                $(".home-component .main-row div[class^='col-10']").not('.console').removeClass().addClass('col-8').css({'border-left' : 'none'});
                $(".home-component .main-row div[class^='col-1']").not('.console').removeClass().addClass('col-4');
                $('.home-component .toggle-project-menu').attr('style' , 'border-bottom: 1px solid white; cursor:pointer ');
                $('.toggle-project-menu span').show();
            }
            $('.toggle-project-menu span')
            .removeClass(`${$('.project-menu span').is(':visible') ? 'fa-angle-right' : 'fa-angle-down' }`)
            .addClass(`${$('.project-menu span').is(':visible') ? 'fa-angle-down' : 'fa-angle-right' }`)
        })
    }

    useEffect(() => {
        if(window.innerWidth < '600'){
            makeWidthBetter();
        }
        updateWord();
    }, []);

    useEffect(() => {
        return () => {
            for(let timer in timerArray){
                clearTimeout(timer);
            }
        } 
    },[timerArray]);

    const onToggle = (className) => {
        let selectedItems = $(`span.${className} ~ div span`); 
        const vis = selectedItems.is(':visible');
        if(vis){
            if(selectedItems.length !== 0){
                selectedItems.toggle(false).is(':visible'); 
                $(`span.${className}`).removeClass('fa-caret-down').addClass('fa-caret-right');   
            }
        }else{
            selectedItems.toggle(true);
            $(`span.${className}`).removeClass('fa-caret-right').addClass('fa-caret-down');
        }
    }

    return <React.Fragment>
        <div className="home-component">
            <div className="container-made">
                { icon ? <div onClick={() => {
                        setIcon(false);
                        showPMD(false);
                        showTerminal(true);
                        showCheckStyle(false);
                    }} className="icon text-center">
                    <span  className="fab fa-java fa-2x text-center"></span>
                        <div>
                            Editor
                        </div> 
                    </div>  :  <div>
                <div className="menu">
                    <span className="exit" onClick={() => setIcon(true)}></span>
                    <span className="minimum"></span>
                    <span className="maximum"></span>
                </div>
                <div style={{backgroundColor:'#2d132c'}}>
                    <HomeToolbar runClick={updateWord} setWord={setWord} setWord2={setWord2} setWord3={setWord3} setWord4={setWord4} />
                </div>
                    <div style={{marginLeft:'-10px',color:'white'}}>
                        <div className="container">
                            <div className="row main-row">
                                <div  className="col-4" style={{color:'white'}} >
                                    <div onClick={() => makeWidthBetter() }
                                        className="toggle-project-menu" style={{borderBottom:'1px solid white', cursor:'pointer'}}>Project<span style={{paddingLeft:'5px' , paddingTop:'5px'}} className="fas fa-angle-down"></span></div>
                                    <div className="project-menu">
                                        <div  className="class-room"> <span style={{ cursor:'pointer'}} onClick={() => {$('.project-menu * ').not('.class-room').toggle(10 , 'linear' , () => 
                                                        $('#class-room-span')
                                                        .removeClass(`${$('.project-menu span').is(':visible') ? 'fa-caret-right' : 'fa-caret-down' }`)
                                                        .addClass(`${$('.project-menu span').is(':visible') ? 'fa-caret-down' : 'fa-caret-right' }`))}} id="class-room-span" className="class-room fas fa-caret-down"></span> Classroom</div>
                                        <div className="ml-2"> <span className="fas fa-caret-right"> </span> .idea</div>
                                        <div className="ml-2"> 
                                            <span className="fas fa-caret-down src">  src </span>
                                            <div className="ml-2">
                                                <span data-toggle="data-toggle" onClick={() => onToggle('main')} className="fas fa-caret-down main">  main </span> 
                                                <div className="ml-2"> 
                                                    <span data-toggle="data-toggle" onClick={() => onToggle('java')} className="fas fa-caret-down java"> java  </span> 
                                                    <div className="ml-2">
                                                        <span data-toggle="data-toggle" onClick={() => onToggle('ir-ac-kntu')} className="fas fa-caret-down ir-ac-kntu">  ir.ac.kntu </span>
                                                        <div style={{cursor:'pointer'}} onClick={() => {
                                                            showPMD(false);
                                                            showCheckStyle(false);
                                                        }} className="ml-2"> <span  style={{color:'red'}} className="fab fa-java"><span style={{color:'white'}}> Classroom.java</span> </span>  </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-2 class-toggle">
                                                <span data-toggle="data-toggle" onClick={() => onToggle('test')} className="fas fa-caret-down test">  test </span>
                                                    <div className="ml-2">
                                                        <span data-toggle="data-toggle" onClick={() => onToggle('java-test')} className="fas fa-caret-down java-test"> java </span>
                                                            <div className="ml-2">
                                                                <span data-toggle="data-toggle" onClick={() => onToggle('ir-ac-kntu-style')} className="fas fa-caret-down ir-ac-kntu-style"> ir.ac.kntu.style </span>
                                                                <div className="ml-2">
                                                                    <span style={{color:'red' , display:"block", marginBottom:'3px'}} className="fab fa-java"><span style={{color:'white',fontSize:'17px'}}> SolutionTest.java </span></span> 
                                                                    <span style={{color:'red' , display:"block", marginBottom:'3px' , cursor:'pointer'}} className="fab fa-java"><span onClick={() => {   
                                                                        showPMD(true);
                                                                        showCheckStyle(false);
                                                                    }} style={{color:'white', fontSize:'17px'}}> CheckPMDTest.java </span></span> 
                                                                    <span onClick={() => {
                                                                        showCheckStyle(true);
                                                                        showPMD(false);
                                                                    }} style={{color:'red' ,display:"block" , cursor:'pointer'}} className="fab fa-java"><span style={{color:'white', fontSize:'17px'}}> CheckStyleTest.java </span></span> 
                                                                    <span style={{display:"block", marginBottom:'3px'}} className="fas fa-file-code"><span style={{color:'white',fontSize:'17px'}}> config.xml </span></span> 
                                                                    <span style={{display:"block", marginBottom:'3px'}} className="fas fa-file-code"><span style={{color:'white',fontSize:'17px'}}> naming.xml </span></span> 
                                                                </div>
                                                            </div>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="ml-2"> <span className="fas fa-caret-right"> </span> target </div>
                                        <div className="ml-1"> <span style={{color:'deepskyblue'}} className="fab fa-medium-m"></span> pom.xml</div>
                                        <div className="ml-2"> <span className="fas fa-caret-right"> </span> External Libraries</div>
                                        <div className="ml-1"> <span style={{color:'gray'}} className="fas fa-terminal"> </span> Scratches and Console</div>
                                    </div>
                                </div>
                                
                                <div style={{borderBottom:'1px solid gray' }} className="col-8">
                                    <div className="row" style={{borderBottom:'1px solid white', paddingTop:'5px'}}>
                                        <span style={{color:'red', borderRight:'1px solid gray' , padding:'1px' , paddingRight:'10px' ,display:"block"}} className="fab fa-java"><span style={{color:'white', fontSize:'17px'}}> { PMD ? 'CheckPMDTest.java' : 'Classroom.java' }</span></span> 
                                    </div>
                                    <div id="content" style={{height:'400px',width:'100%',overflowY:'scroll', overflowX:'scroll'}}>
                                        <div style={{paddingTop: '10p',}}>
                                            {chooseContent()}
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row">
                                {!terminal ? <div onClick={() => showTerminal(true)}
                                        style={{margin:'10px' ,paddingBottom:'10px',
                                            paddingLeft:'10px' , paddingRight:'10px' , border:'1px solid gray',
                                        height:'30px', cursor:'pointer' }}>
                                            terminal
                                        </div> : 
                                    <div className="col-12" style={{height: '200px' , border:'1px solid gray' , marginTop:'10px'}}>
                                        <Console showTerminal={showTerminal} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                }
                
            </div>
            <div style={{borderTop:'0.5px solid gray',backgroundColor:'#282c34', borderTopLeftRadius:'10px' , borderTopRightRadius:'10px' , color:'white', textAlign:'center'}}>
                    Designed By &copy; <span style={{fontWeight:'bold' , fontStyle:'italic'}}> MohAmin Shafiee </span>               
            </div>              
        </div>
    </React.Fragment>
}

export default (Home) ;


