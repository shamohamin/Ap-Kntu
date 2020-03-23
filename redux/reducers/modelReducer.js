import { POST, SET_PAGE_SIZE, GETDATA } from "../Types/Types";


export const modelReducer = (state, action) => {
    switch(action.type){
        case GETDATA:
            return {
                ...state,
                [`${action.dataType}_params`] : action.payload.params,
                [`${action.data}_limit`] : action.payload.limit,
                [action.dataType] : action.payload.data,
                [`${action.dataType}_total`] : action.payload.total,
                [`${action.dataType}_loading`] : action.payload.is_loading
            }
        case SET_PAGE_SIZE :
            return {
                ...state,
                [`${action.dataType}_limit`] : action.payload
            }
        case POST :
            return {
                ...state,
                data : action.payload.data
            }
        default:
            return state || {} 
    }
}