import React, {Component} from 'react';
import {useNavigate} from 'react-router-dom';
import {socket} from '../App';

import {AlertToast} from '../components/partials/Toasts.jsx';
import LatestNews from '../components/partials/LatestNews.jsx';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertToast: {display: false, message: null},
            connectionTimeout: null,
            username: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    displayAlertPrompt(message) {
        const alertToast = setTimeout(() => this.setState({alertToast: {display: false}}), 5000);
        if (this.state.alertToast.display) clearTimeout(this.state.alertToast.display);
        this.setState({alertToast: {display: alertToast, message: message}});
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        // Disable Play Button & Timeout Alert
        document.getElementById('playButton').disabled = true;
        this.state.connectionTimeout = setTimeout(() => {
            this.displayAlertPrompt('Unable to connect to server! Try refreshing the browser.');
            document.getElementById('playButton').disabled = false;
        }, 2000);

        // Send Data to Server
        socket.emit('player login', this.state.username, data => {
            if (data.status == 'error') return this.displayAlertPrompt(data.message);
            console.log(data);
            this.props.navigateTo('/game');
        });
    }
    
    render() {
        return (
            <div className="py-12">
                {this.state.alertToast.display && <AlertToast alertMessage={this.state.alertToast.message} status="error" />}
                <div className="mx-auto p-4 max-w-lg border border-gray-700 rounded-lg">
                    <h1 className="text-2xl mb-4 text-center">Enter a username to play</h1>
                    <form className="flex justify-center space-x-2" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                        <div><input type="text" className="form-input border-2 border-gray-700 bg-transparent placeholder:text-gray-700 focus:border-gray-600 focus:ring-0" name="username" defaultValue={this.state.username} placeholder="Enter a username" /></div>
                        <div><input id="playButton" type="submit" className="px-6 py-2.5 bg-gray-700 cursor-pointer hover:bg-gray-600" value="Play" /></div>
                    </form>
                    <hr className="my-6 border-gray-700" />
                    <LatestNews />
                    <div className="text-xs text-gray-700 text-center">Wordle Battle Online 0.0.1_alpha - Created by Mattizhu</div>
                </div>
            </div>
        );
    }
}

export default function(props) {
    const navigation = useNavigate();
    return <Login {...props} navigateTo={navigation} />;
}
