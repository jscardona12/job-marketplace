/**
 * Created by Juan on 17/05/2017.
 */
import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import SweetAlert from 'react-bootstrap-sweetalert';

class Job extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    deleteJob(){
        Meteor.call('job.remove',this.props.job._id)
        console.log('job removed');
    }
    render() {
        return (

                <div className="job row">
                    {this.props.delete?
                        <button className="delete" onClick={() => this.deleteJob.bind(this)}>
                            &times;
                        </button> : <div></div>
                    }
                    <div className="col-md-3">
                        <img id="jobImage" src="../images/logo1.png" alt="image"/>
                    </div>
                    <div className="col-md-6">
                        <h3>{this.props.job.name}</h3>
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