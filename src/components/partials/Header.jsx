import React, {Component} from 'react';

import WordleBattle from '../../images/wordlebattle_white.svg';
import HamburgerIcon from '../../images/hamburger.svg';
import HelpIcon from '../../images/help.svg';
import SettingsIcon from '../../images/settings.svg';

export default class Header extends Component {
    render() {
        return (
            <div id="masthead" className="py-2.5 px-4 max-h-12 border-b border-gray-700">
                <div className="flex justify-between items-start">
                    <div id="masthead_left">
                        <HamburgerIcon className="mt-1 h-5" />
                    </div>
                    <div id="masthead_logo">
                        <WordleBattle className="ml-14 h-12" />
                    </div>
                    <div id="masthead_right">
                        <div className="flex space-x-3">
                            <div><HelpIcon className="mt-1 h-5" /></div>
                            <div><SettingsIcon className="mt-1 h-5" /></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
