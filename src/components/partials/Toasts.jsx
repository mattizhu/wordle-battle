import React, {Component} from 'react';

// Alert Toasts
class AlertToast extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id="alertToast" className={"fixed z-20 inset-x-0 top-20 mx-auto p-3.5 w-fit max-w-xs bg-white rounded-md text-gray-900 text-center uppercase animate__animated animate__fadeIn " + this.props.status}>{this.props.alertMessage}</div>;
    }   
}

// Achievement Toasts
class AchievementToast extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id="achievementToast" className="fixed z-20">{this.props.achievementMessage}</div>
    }   
}

export {AlertToast, AchievementToast};
