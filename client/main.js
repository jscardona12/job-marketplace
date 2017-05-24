import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import '../imports/startup/accounts-config.js'
import App from '../imports/ui/components/App.jsx';
import Home from '../imports/ui/components/Home.jsx';
import JobsList from '../imports/ui/components/JobsList.jsx';
import MyJobs from '../imports/ui/components/MyJobs.jsx';
import Profile from '../imports/ui/components/Profile.jsx';

FlowRouter.route('/', {
    name: 'Home',
    action() {
        mount(App, {
                main: <Home/>,
    });
    },
});
FlowRouter.route('/findJob', {
    name: 'JobsList',
    action() {
        mount(App, {
            main: <JobsList/>,
        });
    },
});
FlowRouter.route('/publishJobs', {
    name: 'MyJobs',
    action() {
        mount(App, {
            main: <MyJobs/>,
        });
    },
});
FlowRouter.route('/publishJobs/:jobId/applicants', {
    name: 'Profile',
    action(params,queryParams) {
        mount(App, {
            main: <Profile />,
        });
    },
});