import { ChangeEvent } from 'react';

export interface PlayerInterface {
    title: string;
    describe: string;
    handleAnswer: (event: ChangeEvent<{ value: unknown }>) => void;
    answerCandidates: number[] | string[];
}
