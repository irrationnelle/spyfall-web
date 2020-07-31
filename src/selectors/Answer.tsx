import { selector } from 'recoil';
import Answer from '../atoms/Answer';

const answerFromPlayerSelector = selector<number>({
  key: 'answerFromPlayer',
  get: ({ get }) => {
    const answer = get(Answer);
    return answer.answerFromPlayer;
  },
  set: ({ set }, answerFromPlayer) => set(Answer, (answer) => ({
    ...answer,
    answerFromPlayer,
  })),
});

const answerFromSpySelector = selector({
  key: 'answerFromPlayers',
  get: ({ get }) => {
    const answer = get(Answer);
    return answer.answerFromSpy;
  },
  set: ({ set }, answerFromSpy) => set(Answer, (answer) => ({
    ...answer,
    answerFromSpy,
  })),
});

export {
  answerFromPlayerSelector,
  answerFromSpySelector,
};
