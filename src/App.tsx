import React, {
  ReactElement, useState, useEffect, useMemo,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Box,
  Button,
  Container,
  Typography,
} from '@material-ui/core';

import InitialSetting from './InitialSetting';
import Answer from './Answer';
import IdentifyRole from './components/IdentifyRole';
import {
  countPlayerSelector,
  placeSelector,
  shouldStartGameSelector,
  spyNumberSelector,
  timeSelector,
} from './selectors/InitialSetting';
import { answerFromPlayerSelector, answerFromSpySelector } from './selectors/Answer';
import { useInterval } from './helper';

export enum CategoryList {
  ALL = 'all',
  BASIC = 'basic',
  COUNTRY = 'country',
  STRANGE = 'strange'
}

const ONE_MINUTE = 60;

const App:React.FC = (): ReactElement => {
  const shouldStartGame = useRecoilValue(shouldStartGameSelector);
  const spyNumber = useRecoilValue(spyNumberSelector);
  const place = useRecoilValue(placeSelector);
  const time = useRecoilValue<number>(timeSelector);
  const countPlayer = useRecoilValue<number>(countPlayerSelector);

  const [count, setCount] = useState<number>(1);
  const [remainingTime, setRemainingTime] = useState<number>(time * ONE_MINUTE);
  const [displayTime, setDisplayTime] = useState<string>('00:00');
  const [shouldEndGame, endGame] = useState<boolean>(false);

  const answerFromSpy = useRecoilValue(answerFromSpySelector);
  const [answerFromPlayers, setAnswerFromPlayers] = useState<number[]>([]);
  const [answerFromPlayer, setAnswerFromPlayer] = useRecoilState<number>(answerFromPlayerSelector);

  const [shouldShowResult, setShouldShowResult] = useState<boolean>(false);

  const [isSpyWin, setIsSpyWin] = useState<boolean>(false);
  const [arePlayersWin, setArePlayersWin] = useState<boolean>(false);

  const shouldStartTimer = shouldStartGame && count > countPlayer;

  const roleMessage = useMemo(
    () => (count === spyNumber ? '당신은 스파이입니다.' : `지정한 장소는 ${place}입니다`),
    [count, spyNumber, place],
  );

  const resultMessage = () => {
    const areBothWin = isSpyWin && arePlayersWin;
    const areBothLost = !isSpyWin && !arePlayersWin;
    const isDraw = areBothWin || areBothLost;

    if (isDraw) return '무승부';
    if (isSpyWin) return '스파이 승리';
    return '플레이어 승리';
  };

  const handleSkipTimer = () => {
    setRemainingTime(0);
    endGame(true);
    setCount(1);
  };

  const handleNextPlayerToIdentify = () => {
    setCount((number) => number + 1);
    if (count === countPlayer) {
      setRemainingTime(time * ONE_MINUTE);
      setDisplayTime(`${time}:00`);
    }
  };

  const handleNextPlayerToAnswer = () => {
    setCount((number) => number + 1);
    if (count !== spyNumber) {
      setAnswerFromPlayers((oldAnswers) => [...oldAnswers, answerFromPlayer]);
      setAnswerFromPlayer(1);
    }

    if (count === countPlayer) {
      setShouldShowResult(true);
    }
  };

  useInterval(() => {
    if (remainingTime === 0 && !shouldEndGame) {
      endGame(true);
      setCount(1);
      return;
    }

    if (shouldStartTimer) {
      setRemainingTime(remainingTime - 1);
      const currentMinute = Math.floor(remainingTime / ONE_MINUTE);
      const isOneMinutePassed = remainingTime % ONE_MINUTE === 0;
      const min = isOneMinutePassed ? currentMinute - 1 : currentMinute;

      const displaySecondsWithConditionalZero = (currentRemainingTime: number): string => {
        const isSmallerThanTenSeconds = currentRemainingTime % ONE_MINUTE - 1 < 10;
        return isSmallerThanTenSeconds ? `0${currentRemainingTime % ONE_MINUTE - 1}` : `${currentRemainingTime % ONE_MINUTE - 1}`;
      };

      const sec = isOneMinutePassed ? '59' : displaySecondsWithConditionalZero(remainingTime);

      setDisplayTime(`${min}:${sec}`);
    }
  }, 1000);

  useEffect(() => {
    if (!shouldShowResult) return;

    const isSpyWinCurrently = answerFromSpy === place;
    const correctAnswerCount = answerFromPlayers.filter(
      (answer: number) => answer === spyNumber,
    ).length;
    const necessaryCountToWin = Math.ceil((countPlayer - 1) / 2);
    const arePlayersWinCurrently = correctAnswerCount >= necessaryCountToWin;

    setIsSpyWin(isSpyWinCurrently);
    setArePlayersWin(arePlayersWinCurrently);
  }, [shouldShowResult, answerFromSpy, place, answerFromPlayers, spyNumber, countPlayer]);

  return (
    <Container maxWidth="sm">
      {!shouldStartGame && <InitialSetting />}
      {shouldStartGame && count <= countPlayer && !shouldEndGame
          && (
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <IdentifyRole
              playerName={`Player ${count}`}
              roleMessage={roleMessage}
            />
            <Button
              variant="outlined"
              onClick={handleNextPlayerToIdentify}
            >
              Next Player
            </Button>
          </Box>
          )}
      {shouldStartTimer && !shouldEndGame && (
      <Box>
        <Typography variant="h5" component="h2">
          이제부터 지정된 장소에 대해 이야기하면서
        </Typography>
        <Typography variant="h5" component="h2">
          스파이를 찾아내도록 합니다.
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {`제한된 시간은 ${time} 분 입니다.`}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {displayTime}
        </Typography>
        <Button
          variant="outlined"
          onClick={handleSkipTimer}
        >
          Skip
        </Button>
      </Box>
      )}
      {
        shouldEndGame && count <= countPlayer && (
        <Box>
          <Typography variant="h5" component="h2">
            {`Player ${count}`}
          </Typography>
          <Answer isSpy={count === spyNumber} />
          <Button
            variant="outlined"
            onClick={handleNextPlayerToAnswer}
          >
            Next Player
          </Button>
        </Box>
        )
    }
      {
        shouldShowResult && (
        <Box>
          <Typography variant="h5" component="h2">
            {resultMessage()}
          </Typography>
        </Box>
        )
      }
    </Container>
  );
};

export default App;
