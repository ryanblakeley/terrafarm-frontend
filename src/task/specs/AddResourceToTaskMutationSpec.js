import Relay from 'react-relay';
import { expect } from 'chai';
import sinon from 'sinon';

import AddResourceToTask from 'task/mutations/AddResourceToTaskMutation';

describe('AddResourceToTask mutation', () => {
  const mock = sinon.mock(Relay);

  describe('.fragments', () => {

    it('requests the proper resource fragments', () => {
      mock.expects('QL').withArgs([`
      fragment on Resource {
        id,
        name,
        tasks(first: 18) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `]).atLeast(1);
      AddResourceToTask.fragments.resource();
    });

    it('returns the proper task fragments', () => {
      mock.expects('QL').withArgs([`
      fragment on Task {
        id,
        name,
        resources(first: 18) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `]).atLeast(1);
      AddResourceToTask.fragments.task();
    });
  });

  // TODO: Define a pattern for testing these. Currently mocking out Relay is
  // spotty at best. The issue at hand here is that we are mocking out calls
  // to Relay.QL, and we are not returning proper fragments so when we attempt
  // to create a new instance of the mutation so that we can test the instance
  // methods Relay throws an error. Hopefully there will be better testing
  // support in v2.
  describe('#getMutation', () => {
    it('returns the proper mutation', /*() => {
      mock.expects('QL').withArgs(['mutation{addResourceToTask}']);
      const mutation = new AddResourceToTask({ resource: {}, task: {} });
      mutation.getMutation();
    }*/);
  });

  describe('#getFatQuery', () => {
    it('returns the proper fat query', /*() => {
      mock.expects('QL').withArgs([`
      fragment on AddResourceToTaskPayload {
        taskEdge {
          node,
        },
        resourceEdge,
        resource,
        task,
      }
    `]);
      const mutation = new AddResourceToTask({ resource: {}, task: {} });
      mutation.getFatQuery();
    }*/);
  });

  describe('#getConfigs', () => {
    it('returns the proper configurations');
  });

  describe('#getOptimisticResponse', () => {
    it('returns the proper optimistic response');
  });

  describe('#getVariables', () => {
    it('returns the proper variables', /*() => {
      const mutation = new AddResourceToTask({
        resource: { id: 'Foo' },
        task: { id: 'Bar' }
      });

      expect(mutation.getVariables()).to.eq({
        resourceId: 'Foo',
        taskId: 'Bar'
      });
    }*/);
  });
});
