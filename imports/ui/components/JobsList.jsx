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
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';


class JobsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filterCurrency: '',
            filterPay: null,
            filterType: null,
            filterCountry: null,
            filterCity: null,
        };


    }

    onSliderChange(value) {
        this.setState({filterPay: value});
    }

    // componentWillUpdate(){
    //     var m = 0;
    //     this.props.jobs.map(job =>{
    //         if( m <= parseInt(job.pay))
    //         {
    //             m=parseInt(job.pay)
    //         }
    //
    //     })
    //     console.log(m);
    //     this.setState({max:m})
    // }

    render() {
        if (true) {


            let filteredJobs = this.props.jobs;
            if (this.state.filterCurrency) {
                filteredJobs = filteredJobs.filter(job => job.currency.toUpperCase() === this.state.filterCurrency.symbol.toUpperCase());
            }
            if (this.state.filterPay) {
                filteredJobs = filteredJobs.filter(job => job.pay >= this.state.filterPay);
            }
            if (this.state.filterCountry) {
                filteredJobs = filteredJobs.filter(job => job.country === this.state.filterCountry);
            }
            if (this.state.filterCity) {
                filteredJobs = filteredJobs.filter(job => job.city.toUpperCase() === this.state.filterCity.toUpperCase());
            }
            var max = 0;
            filteredJobs.map(job => {
                if (max <= parseInt(job.pay)) {
                    max = parseInt(job.pay)
                }

            })

            return (
                <div className="container job-container">
                    <div className="container col-md-3">
                        <div id="job-filter">
                            <h4>Filter Menu</h4>
                        </div>
                        <div id="job-filter">
                            <h5>Filter by pay</h5>
                            <h6> Currency</h6>
                            <input type="text" value={this.state.currency}
                                   placeholder="Currency"
                                   required onChange={(event) => {
                                this.setState({currency: event.target.value})
                            }}/>

                            <Slider defaultValue={2} min={this.state.min} max={max}
                                    onChange={this.onSliderChange.bind(this)}
                            />
                        </div>
                        <div id="job-filter">
                            <h5>Filter by type</h5>
                        </div>
                        <div id="job-filter">
                            <h5>Filter by country</h5>
                        </div>
                        <div id="job-filter">
                            <h5>Filter by city</h5>
                        </div>

                    </div>
                    <div className="col-md-9" id="job-list">
                        {filteredJobs.map((job, index) => {
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