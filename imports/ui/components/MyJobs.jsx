/**
 * Created by Juan on 17/05/2017.
 */
import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import SweetAlert from 'react-bootstrap-sweetalert';
import Job from './Job.jsx';
import {Jobs} from '../../api/jobs.js';
import Modal from 'react-modal';
import CountrySelect from "react-country-select";
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import Home from './Home.jsx'

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
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(val) {
        this.setState({country: val});
    }

    onSliderChange(value) {
        this.setState({filterPay: value});
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
        let filteredJobs = this.props.jobs;
        if (this.state.filterCurrency) {
            filteredJobs = filteredJobs.filter(job => job.currency.toUpperCase().startsWith(this.state.filterCurrency.toUpperCase()));
        }
        if (this.state.filterPay) {
            filteredJobs = filteredJobs.filter(job => job.pay >= this.state.filterPay);
        }
        if (this.state.filterCountry) {
            filteredJobs = filteredJobs.filter(job => job.country.label === this.state.filterCountry.label);
        }
        if (this.state.filterCity) {
            filteredJobs = filteredJobs.filter(job => job.city.toUpperCase().startsWith(this.state.filterCity.toUpperCase()));
        }
        var max = 0;
        filteredJobs.map(job => {
            if (max <= parseInt(job.pay)) {
                max = parseInt(job.pay)
            }

        })
        if (Meteor.userId()) {
            return (
                <div className="container job-container">
                    <div className="col-md-3">
                        <div id="job-filter">
                            <h4>Filter Menu</h4>
                            <button className="btn btn-sm btn-primary" onClick={this.openModal.bind(this)}> Add Job
                            </button>
                        </div>

                        <div id="job-filter">
                            <h5>Filter by pay</h5>
                            <h6> Currency</h6>
                            <input type="text" value={this.state.filterCurrency}
                                   placeholder="Currency"
                                   required onChange={(event) => {
                                this.setState({filterCurrency: event.target.value})
                            }}/>
                            <Slider defaultValue={2} min={this.state.min} max={max}
                                    onChange={this.onSliderChange.bind(this)}
                            />
                        </div>
                        <div id="job-filter">
                            <h5>Filter by country</h5>
                            <CountrySelect multi={false} id="sinput" flagImagePath="/flags/"
                                           onSelect={this.onSelect} required/>
                        </div>
                        <div id="job-filter">
                            <h5>Filter by city</h5>
                            <input type="text" value={this.state.filterCity}
                                   placeholder="City"
                                   required onChange={(event) => {
                                this.setState({filterCity: event.target.value})
                            }}/>
                        </div>

                        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}
                               contentLabel="Register"
                               shouldCloseOnOverlayClick={true} style={customStyles}>
                            <form onSubmit={this.insertJob.bind(this)}>
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
                                    <CountrySelect multi={false} id="sinput" flagImagePath="/flags/"
                                                   onSelect={this.onSelect} required/>
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
                                    <input id="sinput" type="number" value={this.state.pay}
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
                                        <button type="submit" className="btn btn-lg btn-primary">Add
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Modal>
                    </div>
                    <div className="col-md-9" id="job-list">
                        {filteredJobs.map((job, index) => {
                            return <Job key={index} delete={true} job={job}/>
                        })}
                    </div>
                </div>

            )
        }
        else {
            return (
                <div>
                    <Home/>
                </div>
            )
        }

    }
}

MyJobs.propTypes = {
    jobs: PropTypes.array,
    currentUser: PropTypes.object,
    onSelect: React.PropTypes.func
};

export default createContainer(() => {
    Meteor.subscribe('jobs');
    return {
        jobs: Jobs.find({owner: Meteor.userId()}).fetch(),
        currentUser: Meteor.user()
    };

}, MyJobs);