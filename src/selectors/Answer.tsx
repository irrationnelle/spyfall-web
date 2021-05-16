import { DefaultValue, selector } from 'recoil';
import Answer from '../atoms/Answer';

const answerFromPlayerSelector = selector<number>({
  key: 'answerFromPlayer',
  get: ({ get }) => {
    const answer = get(Answer);
    return answer.answerFromPlayer;
  },
  set: ({ set }, answerFromPlayer) => set(Answer, (answer) => {
    const currentAnswerFromPlater = answerFromPlayer instanceof DefaultValue ? 0 : answerFromPlayer;

    if (answer instanceof DefaultValue) {
      return {
        answerFromPlayer: currentAnswerFromPlater,
        answerFromSpy: 'nowhere',
      };
    }

    return {
      ...answer,
      answerFromPlayer: currentAnswerFromPlater,
    };
  }),
});

const answerFromSpySelector = selector<string>({
  key: 'answerFromPlayers',
  get: ({ get }) => {
    const answer = get(Answer);
    return answer.answerFromSpy;
  },
  set: ({ set }, answerFromSpy) => set(Answer, (answer) => {
    const currentAnswerFromSpy = answerFromSpy instanceof DefaultValue ? '0' : answerFromSpy;

    if (answer instanceof DefaultValue) {
      return {
        answerFromPlayer: -1,
        answerFromSpy: currentAnswerFromSpy,
      };
    }

    return {
      ...answer,
      answerFromSpy: currentAnswerFromSpy,
    };
  }),
});

export {
  answerFromPlayerSelector,
  answerFromSpySelector,
};
