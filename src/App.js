import React from 'react';
import {AppRoute} from './routs/App.routes'
import {Helmet} from 'react-helmet';
import favicon from './asset/images/logo-removebg-preview.png'
import './App.css';

class App extends React.Component {
    render() {

        return (
            <>
            <Helmet>
                <title>pouya</title>
                <link rel="icon" type="image/png" href={favicon} sizes="35x35" />
            </Helmet>
                <AppRoute />
             </>

            
        )
    }

}

export {App};