import React from 'react';
import { ShowErrorMsg } from './showErrMsg';
import { RegisterForm } from "./RegisterForm";
import '../../Style/Form.css';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export class FormComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            data : {
                email : '',
                first_name: '',
                last_name: '',
                student_id: ''
            },
            rules : {
                email : {isEmail : true, required : true},
                first_name : {required : true , isAlpha : true},
                last_name : {required : true, isAlpha : true},
                student_id : {required : true , minLenght: 7 , number: true, check:true}
            },
            errorsMsg : '',
            isSubmited : false, 
            dirty: {}
        }
    }

    callback = (data) => this.setState({errorsMsg : data})


    onChange = (event) => {
        event.persist();
        this.setState(state => {
            state.data[event.target.name] = event.target.value ;
            state.dirty[event.target.name] = true ;
            return {...state}
        });
    }

    makeInput = (name) => {

        return <div style={{margin:'5px' , padding:'5px'}}>
            <FormControl fullWidth >
                <InputLabel style={{color:'white'}} htmlFor={name}>{name}</InputLabel>
                <Input onChange={this.onChange}
                        autoFocus={name === "first_name" ? true : false}
                        style={{color:'white' }}
                        type="text"
                        value={this.state.data[name]}
                        name={name} 
                        id={name}
                        autoComplete="off"
                        />
                <ShowErrorMsg field={name} />
            </FormControl>
        </div>
    }

    render(){
        return <RegisterForm data={this.state.data} rules={this.state.rules} dirty={this.state.dirty}>
                        <div className="row">
                            <div className="col text-center p-3 m-1">
                            {
                                this.state.errorsMsg.length !== 0 ? <div 
                                                className="alert alert-danger">
                                    {this.state.errorsMsg}
                                </div> : ''
                            }   
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-lg">
                                {this.makeInput("first_name")}
                            </div>
                            <div className="col-lg">
                                {this.makeInput("last_name")}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg">
                                {this.makeInput("email")}
                            </div>
                            <div className="col-lg">
                                {this.makeInput("student_id")}
                            </div>
                        </div>
        </RegisterForm>
    }


}