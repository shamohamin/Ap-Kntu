import React from 'react' 
import { Validate } from "../Validators/validator";
import '../../style/homeWork.css';
import { connect } from 'react-redux';
import { post } from "../../redux/actions/actionCreator";
import ContentEditableEvent from 'react-contenteditable';
import {HomeWork3} from '../contents/HomeWork3';


const imageStyle = {
    image1 : 'width: 155.50px; height: 105.59px; margin-left: 0.00px; margin-top: 2.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);',
    image2 : "max-width:50%; height: 417.50px; margin-left: 100.00px; margin-top: 2.00px;transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);",
    image3 : " max-width: 70%; height: 333.50px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
}

export const HomeWork = connect( () => ({}) , dispatch => ({
    postID : (id, successCallback, failedCallback) => dispatch(post(id, successCallback, failedCallback))
}))(class extends React.Component {
        constructor(props){
            super(props) ;
            
            this.URL = "https://docs.google.com/document/d/1ZPubRSGbcgG5qcjh7BWdggY4jjAvauMACQnnyNc7xIw/edit";
            this.state = {
                
                homework : {
                    description : HomeWork3 ,
                    title : "HomeWork3" ,
                    name : "پروژه سوم - فریبرز در قرنطینه" ,
                },
                isSubmitted : false ,
                data :{
                    student_id : "" ,
                    exercise_id : 3
                },
                rules : {
                    student_id : {
                        required : true ,
                        number : true ,
                        minLenght : 7,
                        check : true
                    }
                } ,
                errors : {} ,
                attentionError : "",
                successMsg : "",
                failedMsg : "",
                dirty : {},
                submitText :  "Please Insert Your StudentID To Build Your Starter Repo" 
            }
        }


        componentDidMount(){
            document.querySelector(".image1").appendChild(this.makeImg('./images/image3.png',imageStyle.image1));
            document.querySelector(".image2").appendChild(this.makeImg('./images/image1.png',imageStyle.image2));
            document.querySelector(".image3").appendChild(this.makeImg('./images/image2.jpg',imageStyle.image3));
        }

        makeImg = (url,style) => {
            const img1 = document.createElement("img");
            img1.setAttribute('src' , require(`${url}`));
            img1.setAttribute('style', style);
            return img1 ;
        }

        get submit(){
            let ok = true ;
            
            Object.keys(this.state.errors).forEach(key => {
                if(this.state.errors[key].length !== 0)
                    ok = false;
            });

            return ok ;
        }

        onChange = (event) => {
            event.persist() ;
            this.setState(state => {
                state.data[event.target.name] = event.target.value.trim() ;
                state.dirty[event.target.name] = true ;
                return {...state} 
            })
        }

        onClick = () => {
            const URL = JSON.parse(localStorage.getItem('url')) ;
            const student_id = JSON.parse(localStorage.getItem('student_id')) ;
            if( URL === null || student_id === null ||
                                        student_id !== this.state.data.student_id){
                if(this.submit && !this.state.isSubmitted){
                    try{
                        this.props.postID(this.state.data ,
                            (url) => {
                                this.setState({isSubmitted : true , successMsg : "submition was successful",
                                            failedMsg:'' , attentionError : ''});
                                localStorage.setItem('url',JSON.stringify(url));
                                localStorage.setItem('student_id', JSON.stringify(this.state.data.student_id));
                                localStorage.setItem('exercise_id', JSON.stringify(this.state.data.exercise_id));
                                window.open(url , '_blank') ;
                            },
                            (message) => {
                                this.setState({isSubmitted : false , failedMsg : message , successMsg:''})
                                
                            });
                    }catch(ex){
                        this.forceUpdate();
                    }
                }else{
                    this.setState({attentionError : "Please pay attention to errors!",successMsg:''});
                }
            }else{
                this.setState({successMsg : "submition was successful", failedMsg:'' , attentionError:''});
                window.open(JSON.parse(localStorage.getItem('url')), '_blank') ;
            }
            window.scrollTo({
                top : 0,
                behavior : "smooth"
            });
        }

        static getDerivedStateFromProps(props , state){
            return {
                errors : Validate(state.rules , state.data)
            }
        }


        render(){
            console.log(this.props)
            return <div style={{scrollBehavior:'smooth'}} className="homework-component">
                <div style={{scrollBehavior:'smooth'}}>
                    <div style={{boxShadow:'0 2px 2px 0 rgba(34,36,38,.15)' , borderRadius : '20px' }}>
                        <div className="card card-animation"  style={{width:'100%'}}>
                            <div className="card-header text-center head">
                                {this.state.homework.title}
                            </div>
                            <div className="card-body bg-transparent" style={{backgroundColor : 'transparent'}}>
                                <div style={{textAlign:'right' ,direction:'rtl'}} className="wrapper">
                                    <div className="h3 alert-success text-center">{this.state.successMsg}</div>
                                    <div className="h3 alert-danger text-center">{this.state.failedMsg}</div>
                                    <div className="h3 alert-danger text-center">{this.state.attentionError}</div>
                                    <div className="text-center">You Can Also Read HomeWork In Google Docs <br />
                                        <a style={{fontSize : '3vw'}} rel="no-refrence" href={this.URL}>
                                            GOOGLE DOC
                                        </a></div>
                                    <hr className="ml-4 mr-4"/>
                                    <div style={{maxWidth:'100%'}}>
                                    <ContentEditableEvent lang="fa-IR" style={{textAlign:'right', width:"100%"}} dir="rtl" className="text p-2 text-box" 
                                                    onMouseDown={(event) => {
                                                        if(event.preventDefault)
                                                            event.preventDefault();
                                                    }}
                                                    html={this.state.homework.description}
                                                    onChange={(event) => {
                                                        if(event.preventDefault)
                                                            event.preventDefault();
                                                        }}
                                                    onKeyDown={(ev) => {
                                                        if(ev.preventDefault){
                                                            ev.preventDefault();
                                                        }
                                                    }}  />
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div className="pl-1 h2 text-danger">Attention:</div>
                                    <div>
                                    <p className="pl-1 pb-2 h3">{this.state.submitText}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-7 bg-transparent">
                                        <div className="label pb-2 ml-1">  StudentID :</div>
                                        <div className="row">
                                            <div className="col-9">
                                            <input className="form-control input ml-1" type="text" value={this.state.data.student_id}
                                                    placeholder="StudentID" name="student_id"
                                                    onChange = {(event) => this.onChange(event)} />
                                            </div>
                                            <div className="col-2 loading"><div></div><div></div><div></div></div>
                                        </div>
                                        {
                                            this.state.dirty["student_id"] && this.state.errors.student_id.map(item => <div style={{borderRadius : '10px' , fontSize : '15px' , fontFamily:'Times' ,  color : 'red'}} className="p-1 mt-1" key={item}>
                                                {item}
                                            </div>)    
                                        }
                                        <div>
                                            <button className="btn mt-2 ml-1 btn-primary" 
                                                    onClick={() => this.onClick()}>
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

})