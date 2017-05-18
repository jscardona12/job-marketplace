/**
 * Created by Juan on 17/05/2017.
 */
import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import SweetAlert from 'react-bootstrap-sweetalert';
import Job from './Job.jsx'
import {Jobs} from '../../api/jobs.js'

class JobsList extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        if (true) {
            return (
                <div className="container job-container">
                    <div className="col-md-3">

                    </div>
                    <div className="col-md-9"id="job-list" >
                        {this.props.jobs.map((job, index) => {
                            return <Job key={index} delete={false} job={job}/>
                        })}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>

                </div>
            )
        }

    }
}

JobsList.propTypes = {
    jobs: PropTypes.array,
    currentUser: PropTypes.object
};

export default createContainer(() => {
    Meteor.subscribe('jobs');
    return {
        jobs: Jobs.find({}).fetch(),
        currentUser: Meteor.user()
    };

}, JobsList);