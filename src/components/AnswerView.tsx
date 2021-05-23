import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';

export interface AnswerViewProps {
    title: string;
    describe: string;
    handleAnswer: (event: React.ChangeEvent<{ value: unknown }>) => void;
    answerCandidates: string[] | number[];
    isSpy?: boolean;
}

const AnswerView: React.FC<AnswerViewProps> = ({
  title, describe, handleAnswer, answerCandidates, isSpy,
}: AnswerViewProps) => {
  const [answer, setAnswer] = useState<number | string>(() => (isSpy ? '허공' : -1));

  return (
    <Box>
      <Typography variant="body2" color="textSecondary" align="center">{title}</Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">{describe}</FormLabel>
        <RadioGroup
          value={answer}
          onChange={(event) => {
            handleAnswer(event);
            setAnswer(event.target.value);
          }}
        >
          {answerCandidates.map((answerCandidate: string | number) => (
            <FormControlLabel
              key={answerCandidate}
              value={answerCandidate}
              control={<Radio />}
              label={isSpy ? answerCandidate : `Player ${answerCandidate}`}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default AnswerView;
