import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Jobs } from './jobs.js';

if (Meteor.isServer) {
  describe('Jobs', () => {
    describe('methods', () => {
      const userId = Random.id();
      let jobId;

      beforeEach(() => {
        Jobs.remove({});
        jobId = Jobs.insert({
          name: 'test farm 1',
          description: 'description',
          city: 'Bogotá',
          country: 'Colombia',
          pay: 300,
          currency: 'Dollar',
          profiles: [],
          owner: userId,
        });
      });

      it('can delete a job offer', () => {

        const deleteJob = Meteor.server.method_handlers['jobs.remove'];

        const invocation = { userId };

        deleteJob.apply(invocation, [jobId]);

        assert.equal(Jobs.find().count(), 0);
      });

      it('can add a new job offer', () => {

        const addJob = Meteor.server.method_handlers['jobs.insert'];

        const invocation = { userId };

        addJob.apply(invocation, ["test job 2"]);

        assert.equal(Jobs.find().count(), 2);
      });

      it('can remove all job offers', () => {

        const addJob = Meteor.server.method_handlers['jobs.removeAll'];

        const invocation = { userId };

        addJob.apply(invocation);

        assert.equal(Jobs.find().count(), 0);
      });

      it('can get a specific job offer', () => {

        const addJob = Meteor.server.method_handlers['jobs.get'];

        const invocation = { userId };

        const jobFind=addJob.apply(invocation,[jobId]);

        const jobFind2=Jobs.findOne(jobId);

        assert.equal(JSON.stringify(jobFind), JSON.stringify(jobFind2));
      });

      it('can update a job offer', () => {

        const addJob = Meteor.server.method_handlers['jobs.update'];

        const invocation = { userId };

        addJob.apply(invocation,[jobId, {_id: 'dato 1'}]);

        const jobFind2=Jobs.findOne(jobId);

        assert.equal(jobFind2.profiles.length , 1);

        assert.equal(JSON.stringify(jobFind2.profiles[0]), JSON.stringify({_id: 'dato 1'}));
      });

    });
  });
}
