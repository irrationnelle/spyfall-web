import { atom } from 'recoil';

const Answer = atom({
  key: 'answer',
  default: {
    answerFromSpy: '',
    answerFromPlayer: 1,
  },
});

export default Answer;
