/**
 * Created by Juan on 17/05/2017.
 */
import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import SweetAlert from 'react-bootstrap-sweetalert';

class Job extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    deleteJob() {
        console.log("entro");
        Meteor.call('jobs.remove', this.props.job._id);
        console.log('job removed');
    }

    applyJob() {
        var profile = Meteor.user().profile;
        Meteor.call('jobs.update', this.props.job._id, profile).then();
        console.log(this.props.job);

    }

    getPath() {
        FlowRouter.go('/publishJobs/' + this.props.job._id + "/applicants");
    }


    render() {
        return (
            <div>
                <div className="job row">
                    <div className="col-md-3">
                        <img id="jobImage" src="/images/logo1.png" alt="image"/>
                    </div>
                    <div className="col-md-6">
                        <h3>{this.props.job.name}</h3>
                        <div>
                            <h4>Country</h4>
                            <h3>
                                {this.props.job.country.label}
                            </h3>
                        </div>
                        <div>
                            <h4>Description</h4>
                            <p>
                                {this.props.job.description}
                            </p>
                        </div>

                    </div>
                    <div className="container col-md-3">
                        <h3>Salary</h3>
                        <h4>{this.props.job.pay + " "}{this.props.job.currency}</h4>
                        {this.props.delete ?
                            (
                                <div>
                                    <button onClick={this.getPath.bind(this)} className="btn btn-md btn-primary" >
                                        Applicants
                                    </button>
                                    <button className="btn btn-md btn-primary" onClick={() => this.deleteJob()}>
                                        Delete Job
                                    </button>
                                </div>) :
                            <button className="btn btn-md btn-primary" onClick={() => this.applyJob()}>
                                Apply
                            </button>
                        }
                    </div>

                </div>
            </div>

        )
    }

}

Job.propTypes = {
    job: PropTypes.object,
    currentUser: PropTypes.object,
    delete: PropTypes.bool
};

export default createContainer(() => {
    Meteor.subscribe('jobs');
    return {
        currentUser: Meteor.user()
    };

}, Job);