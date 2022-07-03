import React, {Component} from 'react';

export default class LatestNews extends Component {
    render() {
        return (
            <div id="latestNews">
                <h2 className="mb-3 text-xl">Latest News</h2>
                <div className="mb-4 p-4 pt-3 bg-amber-600">
                    <p className="mb-3 text-lg">08/06/2022 - In Development</p>
                    <p className="text-sm">Welcome to Wordle Battle Online! This is currently under heavy development and you may experience bugs &amp; glitches. Take a look at the progression of tha game.</p>
                </div>
            </div>
        );
    }
}
