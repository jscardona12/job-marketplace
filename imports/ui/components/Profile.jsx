/**
 * Created by Juan on 19/05/2017.
 */
/**
 * Created by Juan on 17/05/2017.
 */
import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import SweetAlert from 'react-bootstrap-sweetalert';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Jobs} from '../../api/jobs.js';
import Profile_Info from './Profile_Info.jsx'

class Profile extends Component {

    render() {
        console.log(this.props.jobs);
        var idJob = FlowRouter.getParam("jobId");
        let filteredJobs = this.props.jobs;
        filteredJobs = filteredJobs.filter(job => job._id === idJob);
        console.log(filteredJobs);
        if (filteredJobs["0"]) {
            return (

                <div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            {filteredJobs["0"].profiles.map((profile, index) => {

                                return <Profile_Info profile={profile} key={index}/>
                            })
                            }
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            )
        }
        else {
            return (<div><h1>No applicants yet</h1></div>)
        }
    }
}


Profile.propTypes = {
    jobs: PropTypes.array,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('jobs');
    return {
        jobs: Jobs.find({owner: Meteor.userId()}).fetch(),
        currentUser: Meteor.user()
    };

}, Profile);