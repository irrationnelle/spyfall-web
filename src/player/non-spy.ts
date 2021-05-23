import { ChangeEvent } from 'react';
import { PlayerInterface } from './player-interface';

class NonSpy implements PlayerInterface {
    readonly title = '스파이를 찾아주세요';

    readonly describe = 'Who is spy?';

    public handleAnswer: (event: ChangeEvent<{ value: unknown }>) => void;

    private currentAnswerCandidates: number[] = [];

    constructor(
      handleAnswer: (event: ChangeEvent<{ value: unknown }>) => void,
      answerCandidates: number[],
    ) {
      this.handleAnswer = handleAnswer;
      this.answerCandidates = answerCandidates;
    }

    get answerCandidates(): number[] {
      return this.currentAnswerCandidates;
    }

    set answerCandidates(value: number[]) {
      this.currentAnswerCandidates = value;
    }
}

export default NonSpy;
