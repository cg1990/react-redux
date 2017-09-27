import React from 'react';
import {Render} from 'react-dom';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import PlayerReducer from './src/reducers/player'
import Scoreboard from './src/containers/Scoreboard.js';

const store = createStore(
    PlayerReducer
);

render(
    <Provider store={store}>
        <Scoreboard />
    </Provider>,    
    document.getElementById('root')
);