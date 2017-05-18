/**
 * Created by Juan on 17/05/2017.
 */
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Jobs = new Mongo.Collection('jobs');

if (Meteor.isServer) {
    Meteor.publish('jobs', function generalJobsPublication() {
        if (this.userId) {
            return Jobs.find({});
        }
        else {
            throw new Meteor.Error('not-authorized');
        }
    });
}

Meteor.methods({
    'jobs.insert'(name, description, city, country, pay, currency) {

        //Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Jobs.insert({
            name,
            description,
            city,
            country,
            pay,
            currency,
            profiles:[],
            owner: this.userId
        });
    },

    'jobs.remove'(jobId) {
        console.log(jobId);
        //check(taskId, String);


        const job = Jobs.findOne(jobId);
        if (job.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Jobs.remove(jobId);
    },
    'jobs.update'(jobId,profile)
    {
        const job = Jobs.findOne(jobId);
        if (!this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        var profilesu = job.profiles;
        profilesu.push(profile);
        Jobs.update(jobId,{profiles:profilesu})
    }
});
