import React, { ReactElement } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography,
} from '@material-ui/core';
import { answerFromSpySelector, answerFromPlayerSelector } from './selectors/Answer';
import { categorySelector, countPlayerSelector } from './selectors/InitialSetting';
import { getPlaces } from './places';
import { createSequentialNumberArray } from './helper';
import { CategoryList } from './atoms/InitialSetting';

interface Props {
    isSpy: boolean
}

const Answer: React.FC<Props> = ({ isSpy }: Props): ReactElement => {
  const [answerFromSpy, setAnswerFromSpy] = useRecoilState(answerFromSpySelector);
  const [answerFromPlayer, setAnswerFromPlayer] = useRecoilState(answerFromPlayerSelector);
  const countPlayer = useRecoilValue<number>(countPlayerSelector);

  const category = useRecoilValue<CategoryList>(categorySelector);
  const places: string[] = getPlaces(category);
  const players: number[] = createSequentialNumberArray(countPlayer).map((num) => num + 1);

  const handleAnswerFromSpy = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAnswerFromSpy(event.target.value as string);
  };

  const handleAnswerFromPlayer = (event: React.ChangeEvent<{ value: unknown }>) => {
    const numString = event.target.value as string;
    const num = parseInt(numString, 10);
    setAnswerFromPlayer(num);
  };

  if (isSpy) {
    return (
      <Box>
        <Typography variant="body2" color="textSecondary" align="center">지정된 장소를 맞춰주세요</Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Where is target place?</FormLabel>
          <RadioGroup
            aria-label="spy-answer"
            name="spy-answer"
            value={answerFromSpy}
            onChange={handleAnswerFromSpy}
          >
            {places.map((placeCandidate) => (
              <FormControlLabel
                key={placeCandidate}
                value={placeCandidate}
                control={<Radio />}
                label={placeCandidate}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="body2" color="textSecondary" align="center">스파이를 찾아주세요</Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Who is spy?</FormLabel>
        <RadioGroup
          aria-label="player-answer"
          name="player-answer"
          value={answerFromPlayer}
          onChange={handleAnswerFromPlayer}
        >
          {players.map((playerNum) => (
            <FormControlLabel key={playerNum} value={playerNum} control={<Radio />} label={`Player ${playerNum}`} />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default Answer;
