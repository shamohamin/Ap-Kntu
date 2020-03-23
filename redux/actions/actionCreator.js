import { RestDataSource } from "../REST-data/RestDataSource";
import {URLS} from '../REST-data/URLS';
import { SET_PAGE_SIZE, GETDATA } from "../Types/Types";

export const getData = (dataType, params) => ({
    type : GETDATA,
    dataType : dataType,
    payload : new RestDataSource(URLS[dataType]).getData(params)
            .then(res => ({
                data : res.data.doc ,
                limit : res.data.limit ,
                page : res.data.page ,
                params ,
                total : res.data.total ,
                is_loading : false ,
            }))
            .catch(err => ({
                err
            }))
})


export const setPageSize = (dataType,newSize) => ({
    type : SET_PAGE_SIZE ,
    dataType : dataType ,
    payload : newSize 
})


export const post = (type , data , successCallback, fialedCallback) => ({
    type ,
    payload : new RestDataSource(URLS[type]).postData(data)
            .then(res => {
                successCallback();
                return {
                    data : res.data
                }
            })
            .catch(err => {
                try{
                    if( typeof(err.response.data) === "undefined")
                        throw(new Error(err));
                    
                    fialedCallback(err.response.data);
                }catch(ex){
                    fialedCallback(`Something Went Wrong Please 
                        Inform To One Of Your Instructors`);
                }finally{
                    return {
                        err
                    }
                }
            })
})