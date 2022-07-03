import React, {Component} from 'react';

import BackspaceIcon from '../images/backspace.svg';

export default class GameKeyboard extends Component {
    generateKeys(keySet) {
        return keySet.map(key => <button key={key} className={`key key-${key} flex-1 justify-center items-center min-w-[1.75rem] h-14 bg-gray-600 rounded-[0.25rem] text-center uppercase`} onClick={() => this.props.keyDownFunction(key)} data-key={key}>{key}</button>);
    }

    render() {
        return (
            <div id="game-keyboard" className="flex-none">
                <div id="keyboard" className="mx-auto px-4 py-3 max-w-lg text-xs">
                    <div className="mb-2 flex space-x-2">
                        {this.generateKeys(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'])}
                    </div>
                    <div className="mb-2 flex space-x-2">
                        <div className="flex-0.5"></div>
                        {this.generateKeys(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'])}
                        <div className="flex-0.5"></div>
                    </div>
                    <div className="mb-2 flex space-x-2">
                        <button className="key key-Enter flex-2 justify-center items-center min-w-[1.75rem] h-14 bg-gray-600 rounded-[0.25rem] text-center uppercase" onClick={() => this.props.keyDownFunction('Enter')} data-key="Enter">Enter</button>
                        {this.generateKeys(['z', 'x', 'c', 'v', 'b', 'n', 'm'])}
                        <button className="key key-Backspace flex-2 justify-center items-center min-w-[1.75rem] h-14 bg-gray-600 rounded-[0.25rem] uppercase" onClick={() => this.props.keyDownFunction('Backspace')} data-key="Backspace"><BackspaceIcon className="mx-auto h-6" /></button>
                    </div>
                </div>
            </div>
        );
    }
}
