import validator from 'validator' ;


export const Validate = (rules , data) => {
    let errors = {} ;
    Object.keys(rules).forEach(key => {
        const fieldData = data[key] ;
        let errorsPerField = [] ;

        if(rules[key].required && validator.isEmpty(fieldData)){
            errorsPerField.push("Value required!") ;
        }else{
            if(!validator.isEmpty(fieldData)){
                if(rules[key].number && !validator.isNumeric(fieldData)){
                    errorsPerField.push("Value must be number!") ;
                }
                if(rules[key].check && !checkForm(fieldData)){
                    errorsPerField.push("Value must be in correct form!") ;
                }
                if(rules[key].minLenght && String(fieldData).length !== 7){
                    errorsPerField.push("Length of value must be 7!") ;
                }
                if(rules[key].isEmail && !validator.isEmail(fieldData)){
                    errorsPerField.push("Invalid email Address");
                }
                if(rules[key].isAlpha && !validator.isAlpha(fieldData)){
                    errorsPerField.push("All letters must be Alphabetic")
                }
                
            }
        }

        errors[key] = errorsPerField ;
    })

    return errors

}

const checkForm = (value) => {
    let ok = true ;
    const reg97 = new RegExp('9[0-9]{6}') ;
    if(!(reg97.test(value)))
                ok = false ;
    return ok ;
}