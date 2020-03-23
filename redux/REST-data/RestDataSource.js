import Axios from 'axios';


export class RestDataSource {
    constructor(url){
        this.URL = url ; 

        this.header = process.env.header ;
    }

    getData = (params) => this.sendRequest("GET", this.URL, params) ;

    postData = (data) => this.sendRequest("POST", this.URL, {}, data) ;

    sendRequest = (method, url, params, data) =>
                Axios.request({method , url, params, data, headers: this.header}) ;
}