import { ChangeEvent } from 'react';
import { PlayerInterface } from './player-interface';

class Spy implements PlayerInterface {
    readonly title = '지정된 장소를 맞춰주세요';

    readonly describe = 'Where is target place?';

    public handleAnswer: (event: ChangeEvent<{ value: unknown }>) => void;

    private currentAnswerCandidates: string[] = [];

    constructor(
      handleAnswer: (event: ChangeEvent<{ value: unknown }>) => void,
      answerCandidates: string[],
    ) {
      this.handleAnswer = handleAnswer;
      this.answerCandidates = answerCandidates;
    }

    get answerCandidates(): string[] {
      return this.currentAnswerCandidates;
    }

    set answerCandidates(value: string[]) {
      this.currentAnswerCandidates = value;
    }
}

export default Spy;
