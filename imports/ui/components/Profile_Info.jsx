/**
 * Created by Juan on 17/05/2017.
 */
import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import SweetAlert from 'react-bootstrap-sweetalert';

export default class Profile_Info extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        if (this.props.profile) {
            return (
                <div className="job row">
                    <div className="col-md-3">
                        <img id="jobImage" src="/images/logo1.png" alt="image"/>

                    </div>

                    <div className="col-md-6">
                        <h3>{this.props.profile.name}</h3>
                        <div>
                            <h4>Last Name</h4>
                            <p>
                                {this.props.profile.lastname}
                            </p>
                        </div>


                    </div>
                </div>
            )
        }
        else {
            return(<div> </div>)
        }
    }

}