import React from 'react';
import App from "next/app";
import createReduxstore from '../redux/index';
import { Provider } from 'react-redux';
import { Layout } from "../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

class MyApp extends App {

    constructor(props){
        super(props);
        this.store = createReduxstore();
    }

    componentDidMount(){
        this.store = createReduxstore();
    }

    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};
    
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx);
        }
    
        return { pageProps };
    }

    render(){
        const {Component, pageProps} = this.props ;
        return (<div>
            <Provider store={this.store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
            <style global jsx>{`
                body {
                    background-color : #282c34
                }
            `}</style>
        </div>
        )
    }
}

export default MyApp;