import React from 'react';
import ReactDOM from 'react-dom/client';
import {MemoryRouter, Routes, Route} from 'react-router-dom';

import {WordleBattleOnline} from './src/App';

import Login from './src/routes/Login.jsx';
import Game from './src/routes/Game.jsx';

const root = ReactDOM.createRoot(document.getElementById('wordle-battle-online'));
root.render(
    <MemoryRouter>
        <Routes>
            <Route path="/" element={<WordleBattleOnline />}>
                <Route index path="/" element={<Login />} />
                <Route path="/game" element={<Game />} />
            </Route>
        </Routes>
    </MemoryRouter>
);
