/**
 * Created by Juan on 17/05/2017.
 */
import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import SweetAlert from 'react-bootstrap-sweetalert';
import Job from './Job.jsx';
import {Jobs} from '../../api/jobs.js';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-20%',
        transform: 'translate(-50%, -50%)',
        background: 'rgb(0, 0, 0)',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '30px',
        color: '#e5e5e5',
        width: '30%'
    }
};

class MyJobs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            name: '',
            description: '',
            city: '',
            country: '',
            pay: '',
            currency: '',
        };
    }

    insertJob() {
        console.log("Insert A Job");
        Meteor.call('jobs.insert', this.state.name, this.state.description, this.state.city, this.state.country,
            this.state.pay, this.state.currency);
        console.log(Jobs.find({owner: Meteor.userId()}).fetch())
        console.log("Insert Job");
        this.closeModal();
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        if (true) {
            return (
                <div className="container job-container">
                    <div className="col-md-3">
                        <button className="btn btn-lg btn-primary btn-circle" onClick={this.openModal.bind(this)}> +
                        </button>
                        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}
                               contentLabel="Register"
                               shouldCloseOnOverlayClick={true} style={customStyles}>
                            <div className="text-center">
                                <h3>Add Job</h3>
                            </div>
                            <h5> Name </h5>
                            <div>
                                <input id="sinput" type="text" value={this.state.name} placeholder="Name" required
                                       onChange={(event) => {
                                           this.setState({name: event.target.value})
                                       }}/>
                            </div>
                            <h5> Description </h5>
                            <div>
                            <textarea id="sinput" type="text" value={this.state.description} placeholder="Description"
                                      required onChange={(event) => {
                                this.setState({description: event.target.value})
                            }}></textarea>
                            </div>
                            <h5> Country </h5>
                            <div>
                                <input id="sinput" type="email" value={this.state.country} placeholder="Country"
                                       required
                                       onChange={(event) => {
                                           this.setState({country: event.target.value})
                                       }}/>
                            </div>
                            <h5> City </h5>
                            <div>
                                <input id="sinput" type="text" value={this.state.city}
                                       placeholder="City"
                                       required onChange={(event) => {
                                    this.setState({city: event.target.value})
                                }}/>
                            </div>
                            <h5> Pay </h5>
                            <div>
                                <input id="sinput" type="text" value={this.state.pay}
                                       placeholder="Pay"
                                       required onChange={(event) => {
                                    this.setState({pay: event.target.value})
                                }}/>
                            </div>
                            <h5> Currency </h5>
                            <div>
                                <input id="sinput" type="text" value={this.state.currency}
                                       placeholder="Currency"
                                       required onChange={(event) => {
                                    this.setState({currency: event.target.value})
                                }}/>
                            </div>

                            <div className="row" id="registerButtons">
                                <div className="col-md-6 text-center">
                                    <button type="button submit" className="btn btn-lg btn-primary"
                                            onClick={this.closeModal.bind(this)}>Close
                                    </button>
                                </div>
                                <div className="col-md-6 text-center">
                                    <button onClick={this.insertJob.bind(this)} className="btn btn-lg btn-primary">Add
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    <div className="col-md-9" id="job-list">
                        {this.props.jobs.map((job, index) => {
                            return <Job key={index} delete={true} job={job}/>
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

MyJobs.propTypes = {
    jobs: PropTypes.array,
    currentUser: PropTypes.object
};

export default createContainer(() => {
    Meteor.subscribe('jobs');
    return {
        jobs: Jobs.find({owner: Meteor.userId()}).fetch(),
        currentUser: Meteor.user()
    };

}, MyJobs);