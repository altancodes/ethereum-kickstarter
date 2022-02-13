import React from "react";
import { Container } from "semantic-ui-react";
import Header from './Header';
import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';

const Layout = (props) => {
    return (
    <Container>
        <Head>
        <link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css"/>
        <script
        src="https://code.jquery.com/jquery-3.1.1.min.js"
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
        crossorigin="anonymous"></script>
        <script src="semantic/dist/semantic.min.js"></script>
        </Head>
        <Header/>
            {props.children}
    </Container>);
};

export default Layout;