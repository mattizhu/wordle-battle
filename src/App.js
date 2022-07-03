import React, {Component} from 'react';
import {Outlet} from 'react-router-dom';
import io from 'socket.io-client';

import Header from './components/partials/Header.jsx';

import './css/tailwindcss.css';
import './css/style.css';

const socket = io('http://86.161.26.57:8081', {reconnection: false});

class WordleBattleOnline extends Component {
    render() {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <Outlet />
            </div>
        );
    };
}

export {WordleBattleOnline, socket};
