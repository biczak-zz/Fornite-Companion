import { NOTFOUND } from 'dns';

const testState = [
  {
    id: 0,
    progress: 0,
    goal: 100,
    complete: false,
  },
  {
    id: 1,
    progress: 0,
    goal: 500,
    complete: false,
  },
];
const notFound = id => 'There was no challenge found with that ID.';

const updateChallenge = (id, progress) => {
  const newState = testState.slice();
  let flag = false;
  newState.forEach((challenge) => {
    if (challenge.id === id) {
      flag = true;
      challenge.progress = progress;
      if (challenge.goal === progress) {
        challenge.complete = true;
      } else {
        challenge.complete = false;
      }
    } else if (challenge.id === newState[newState.length - 1].id) {
      return notFound(id);
    }
  });
  if (flag === false) {
    return 'There was no challenge found with that ID.';
  }
  return [newState[id].progress, newState[id].complete];
};

test('Updates and Completes the First Challenge', () => {
  expect(updateChallenge(0, 100)).toEqual([100, true]);
});

test('Updates and Completes the Second Challenge', () => {
  expect(updateChallenge(1, 500)).toEqual([500, true]);
});

test('Updates, but does not Complete the First Challenge', () => {
  expect(updateChallenge(0, 50)).toEqual([50, false]);
});

test('Updates, but does not Complete the Second Challenge', () => {
  expect(updateChallenge(0, 50)).toEqual([50, false]);
});

test('Updates a non-existant challenge', () => {
  expect(updateChallenge(
    26,
    '01011001 01101111 01110101 00100000 01100110 01101111 01110101 01101110 01100100 00100000 01101101 01100101 00100001',
  )).toEqual('There was no challenge found with that ID.');
});
