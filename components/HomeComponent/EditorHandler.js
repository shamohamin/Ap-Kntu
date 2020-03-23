
export const keyboards = ["abstract" , "assert" , "while" , "volatile" ,
        "try" , "transient" , "synchronized" , "super" , "static" ,
        "strictfp"  , "throw" , "public" , "int", "package",
        "boolean" , "break" , "byte", "private" , "interface" , "long", "import",
        "catch" , "char" , "native" , "instanceof", "implements" , "else",
        "int", "null" , "short" , "this" , "false" , "true" , "void",
        "class" ,"return" , "new" , "if", "while" , "switch", "case" , "for" , ";" ,','] ;

export const makeStyle = (event , setContent) => {
    // console.log(event.target.value)
    let value = event.target.value ;
    let contentArr = value.split(/\s+/) ;

    // console.log(contentArr)
    
    for(let i = 0 ; i < contentArr.length ;i++){
        if(keyboards.includes(contentArr[i])){
            contentArr[i] = "<span>"+contentArr[i]+"</span>&nbsp;"  ;
        }
    }

    const returnValue = contentArr.join(" ") ;
    setContent(returnValue) ;
}

export const keyHandler = (event , setContent) => {
    if(event.which === 13 || event.key === "Enter"){
        event.preventDefault();
    }
    if(event.which === 9 || event.key === "Tab"){
        setContent((state) => state.concat("&nbsp;&nbsp;&nbsp;&nbsp;"));
        if(event.preventDefault)
            event.preventDefault();
    }
}

export const handlerUp = (event , setContent) => {
    if(event.which === 13 || event.key === "Enter"){
        setContent((state) => {
            // console.log(state)
            return state.concat("<br/>&nbsp;")
        })
        
    }
}

export const keyPressed = (event , setContent) => {
    event.persist();
    setContent(state => {
        // console.log(event.which)
        if(state.length === 92 && event.which === 8){
            event.preventDefault();
        }
        return state;
    });

}