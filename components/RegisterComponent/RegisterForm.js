import React from 'react';
import {FormContext} from './FormContext';
import {Validate} from '../Validators/validator';
import '../../Style/Form.css';


export class RegisterForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            errors : {},
            isSubmited : false,
            submitedError : "",
            context : {
                showErrors : this.showErrors,
            },
            dirty : {},
            attentionError : ''
        }
    }

    showErrors = (field) => (this.state.errors[field] && this.state.dirty[field]) ? 
                        this.state.errors[field] || [] : [] ;

    get emptyErrors(){
        let ok = true ;
        Object.keys(this.state.errors).forEach(key => {
            if(this.state.errors[key].length !== 0){
                ok = false ;
            }
        });
        return ok ;
    }

    static getDerivedStateFromProps(props){
        return {
            errors: Validate(props.rules, props.data),
            dirty : props.dirty
        }
    }


    onSubmit = () => {
        if(this.emptyErrors){
            console.log("submited");
            this.setState({isSubmited : true});
        }else{
            this.setState({attentionError:"submition wasn't successfull"});
            window.scrollTo({
                top:0 ,
                behavior : 'smooth' 
            })
        }
    }

    render(){
        return <React.Fragment>
            <div className="form-component">
                <div className="wrapper">
                    <div className="container form-wrapper">
                        <div className="row">
                            <div className="col title">
                                Register Form
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="alert-danger text-center mt-3">
                                    {this.state.attentionError}
                                </div>
                            </div>
                            <div>
                                <FormContext.Provider value={this.state.context}>
                                    {this.props.children}
                                </FormContext.Provider>
                            </div>
                        </div>
                        <div className="text-center pt-4 pb-4">
                        <button className="text-center btn btn-primary" onClick={() => this.onSubmit()}>
                            Submit
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }

}