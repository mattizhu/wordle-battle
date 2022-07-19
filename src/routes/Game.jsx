import React, {Component} from 'react';
import anime from 'animejs';
import {socket} from '../App';

import {AlertToast} from '../components/partials/Toasts.jsx';
import GameBoard from '../components/GameBoard.jsx';
import GameKeyboard from '../components/GameKeyboard.jsx';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertToast: {display: null, message: null},
            gameTiles: Array(6).fill({row: Array(5).fill(null), active: false})
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    // Alert Prompt Display Function
    displayAlertPrompt(message) {
        const alertToast = setTimeout(() => this.setState({alertToast: {display: null}}), 1250);
        if (this.state.alertToast.display) clearTimeout(this.state.alertToast.display);
        this.setState({alertToast: {display: alertToast, message: message}});
    }

    // Key Press Handle Function
    handleKeyDown(event) {
        console.log(this.state.gameTiles);
        const wordleRow = document.querySelector('#board .row.active').childNodes;
        const key = !event.key ? event:event.key;
        document.querySelector(`#keyboard .key-${key}`).blur();

        // Letter Addition Input
        if (/^[a-zA-Z]$/.test(key)) {
            for (let i = 0; i < wordleRow.length; i++) {
                if (!wordleRow[i].innerHTML.length) {
                    wordleRow[i].innerHTML = key.toLowerCase();
                    anime({targets: wordleRow[i], keyframes: [{scale: 1.075}, {scale: 1}], duration: 100});
                    this.setState({word: this.state.word += key.toLowerCase()});
                    break;
                }
            }

        // Letter Subtraction Input
        } else if (key == 'Backspace') {
            for (let i = wordleRow.length - 1; i > -1; i--) {
                if (wordleRow[i].innerHTML.length) {
                    wordleRow[i].innerHTML = '';
                    this.setState({word: this.state.word.slice(0, -1)});
                    break;
                }
            }

        // Word Submission Input
        } else if (key == 'Enter') {
            if (this.state.word.length !== 5) {
                this.displayAlertPrompt('Not enough letters.');
                return anime({targets: document.querySelector('#board .row:not(.active)'), easing: 'easeInOutSine', duration: 300, translateX: [{value: 16 * -1}, {value: 16}, {value: 16 / -2}, {value: 16 / 2}, {value: 0}]});
            }
            socket.emit('player wordleSubmit', this.state.word, result => {
                if (result.status === 'error' && result.message) {
                    this.displayAlertPrompt(result.message);
                    return anime({targets: document.querySelector('#board .row:not(.active)'), easing: 'easeInOutSine', duration: 300, translateX: [{value: 16 * -1}, {value: 16}, {value: 16 / -2}, {value: 16 / 2}, {value: 0}]});
                }
                if (result.status === "error") return;

                // anime({
                //     targets: '#board .row:not(.active) ',
                //     translateX: 270,
                //     delay: anime.stagger(100) // increase delay by 100ms for each elements.
                // });

                for (let i = wordleRow.length - 1; i > -1; i--) {
                    if (result.result[i] == 2) wordleRow[i].classList.add('bg-emerald-700');
                    if (result.result[i] == 1) wordleRow[i].classList.add('bg-yellow-600');
                    if (result.result[i] == 0) wordleRow[i].classList.add('bg-slate-800');
                }

                wordleRow[0].parentElement.classList.add('active');
                this.setState({word: ''});
            });
        }
    }

    // Initial Game Setup
    init() {
        const gameTiles = [...this.state.gameTiles];
        const row = {...gameTiles[0]};
        row.active = true;
        gameTiles[0] = row;
        this.setState({gameTiles});
    }

    gameboardResize() {
        const wrapper = document.getElementById('game');
        const keyboard = document.getElementById('game-keyboard');
        const gameboard = document.getElementById('game-tileboard');
        const tileboard = document.getElementById('board');

        console.log(window.innerHeight - keyboard.clientHeight);

        if (wrapper.clientHeight < 727) {
            if (wrapper.clientHeight < 650) 
            tileboard.style.height = (window.innerHeight - keyboard.clientHeight) - 144 + 'px';
            tileboard.style.width = tileboard.clientHeight - (tileboard.clientWidth / tileboard.clientHeight * 100) + 'px';
        } else {
            tileboard.style.width = '334px';
            tileboard.style.height = '414px';
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('resize', this.gameboardResize);

        this.init();
        this.gameboardResize();
    }

    render() {
        return (
            <div id="game" className="flex flex-col grow">
                {this.state.alertToast.display && <AlertToast alertMessage={this.state.alertToast.message} status="error" />}
                <GameBoard gameTiles={this.state.gameTiles} />
                <GameKeyboard keyDownFunction={this.handleKeyDown} />
            </div>
        );
    }
}
