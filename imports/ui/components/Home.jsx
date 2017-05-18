import React, {Component} from 'react';
import AccountsUIWrapperHome from './AccountsUIWrapperHome.jsx';
import {Meteor} from 'meteor/meteor';

class Home extends Component {


    render() {
        if (!Meteor.userId()) {
            return (
                <div className="text-center container">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 text-center">
                        <h1 >Welcome to Job Marketplace</h1>
                        <h2> Job Marketplace is a web site where you can subscribe to job offers, or publish job
                            offers </h2>
                        <h2> To use Job Marketplace, please Login </h2>
                        <AccountsUIWrapperHome/>

                    </div>
                </div>

            );
        }
        else {
            return (
                <div className="text-center container">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 text-center">
                        <h1 >Welcome to Job Marketplace</h1>
                        <h2> Job Marketplace is a web site where you can subscribe to job offers, or publish job
                            offers </h2>
                        <h2> Now you can publish or subscribe jobs! </h2>
                    </div>
                </div>

            );
        }
    }
}

export default Home;
