import React from 'react';
import App from "next/app";
import createReduxstore from '../redux/index';
import { Provider } from 'react-redux';
import { Layout } from "../components/Layout";

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
        return (
            <Provider store={this.store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        )
    }
}

export default MyApp;