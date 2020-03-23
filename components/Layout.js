import {Navbar} from './Navbar/Navbar';
import Head from 'next/head';


export const Layout = ({children}) => (
    <React.Fragment>
        <Head>
            <title>AP KNTU</title>
            <meta name="description" content="Advance Programing With Java" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" />
        </Head>
        <div>
            <Navbar />
        </div>
        <div>
            {children}
        </div>
    </React.Fragment>
)