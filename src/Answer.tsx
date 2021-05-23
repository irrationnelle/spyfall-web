import React, { ReactElement } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { answerFromSpySelector, answerFromPlayerSelector } from './selectors/Answer';
import { categorySelector, countPlayerSelector } from './selectors/InitialSetting';
import { getPlaces } from './places';
import { createSequentialNumberArray } from './helper';
import { CategoryList } from './atoms/InitialSetting';
import AnswerView from './components/AnswerView';
import { PlayerInterface } from './player/player-interface';
import Spy from './player/spy';
import NonSpy from './player/non-spy';

interface Props {
    isSpy: boolean
}

const Answer: React.FC<Props> = ({ isSpy }: Props): ReactElement => {
  const setAnswerFromSpy = useSetRecoilState(answerFromSpySelector);
  const setAnswerFromPlayer = useSetRecoilState(answerFromPlayerSelector);
  const countPlayer = useRecoilValue<number>(countPlayerSelector);

  const category = useRecoilValue<CategoryList>(categorySelector);
  const places: string[] = getPlaces(category);
  const players: number[] = createSequentialNumberArray(countPlayer).map((num) => num + 1);

  const handleAnswerFromSpy = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAnswerFromSpy(event.target.value as string);
  };

  const handleAnswerFromNonSpy = (event: React.ChangeEvent<{ value: unknown }>) => {
    const numString = event.target.value as string;
    const num = parseInt(numString, 10);
    setAnswerFromPlayer(num);
  };

  const player: PlayerInterface = isSpy ? new Spy(handleAnswerFromSpy, places)
    : new NonSpy(handleAnswerFromNonSpy, players);

  return (
    <AnswerView
      isSpy={isSpy}
      title={player.title}
      describe={player.describe}
      handleAnswer={player.handleAnswer}
      answerCandidates={player.answerCandidates}
    />
  );
};

export default Answer;
