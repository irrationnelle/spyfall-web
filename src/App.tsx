import React, {
  ReactElement, useState, useEffect, useMemo,
} from 'react';
import { useRecoilValue } from 'recoil';
import {
  Box,
  Button,
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { getPlaces } from './places';
import InitialSetting from './InitialSetting';
import {
  categorySelector,
  countPlayerSelector,
  placeSelector,
  shouldStartGameSelector,
  spyNumberSelector,
  timeSelector,
} from './selectors/InitialSetting';
import { createSequentialNumberArray, useInterval } from './helper';
import IdentifyRole from './components/IdentifyRole';

export enum CategoryList {
  ALL = 'all',
  BASIC = 'basic',
  COUNTRY = 'country',
  STRANGE = 'strange'
}

const App:React.FC = (): ReactElement => {
  const shouldStartGame = useRecoilValue(shouldStartGameSelector);
  const spyNumber = useRecoilValue(spyNumberSelector);
  const place = useRecoilValue(placeSelector);
  const time = useRecoilValue<number>(timeSelector);
  const countPlayer = useRecoilValue<number>(countPlayerSelector);
  const category = useRecoilValue<CategoryList>(categorySelector);

  const [count, setCount] = useState<number>(1);
  const [remainningTime, setRemainningTime] = useState<number>(time * 60);
  const [displayTime, setDisplayTime] = useState<string>('00:00');
  const [shouldEndGame, endGame] = useState<boolean>(false);
  const [answerFromSpy, setAnswerFromSpy] = useState<string>('');
  const [answerFromPlayers, setAnswerFromPlayers] = useState<number[]>([]);
  const [answerFromPlayer, setAnswerFromPlayer] = useState<number>(1);
  const [shouldShowResult, setShouldShowResult] = useState<boolean>(false);
  const [isSpyWin, setIsSpyWin] = useState<boolean>(false);
  const [arePlayersWin, setArePlayersWin] = useState<boolean>(false);

  const shouldStartTimer = shouldStartGame && count > countPlayer;

  const handleAnswerFromPlayer = (event: React.ChangeEvent<{ value: unknown }>) => {
    const numString = event.target.value as string;
    const num = parseInt(numString, 10);
    setAnswerFromPlayer(num);
  };
  const handleAnswerFromSpy = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAnswerFromSpy(event.target.value as string);
  };

  const roleMessage = useMemo(
    () => (count === spyNumber ? '당신은 스파이입니다.' : `지정한 장소는 ${place}입니다`),
    [count, spyNumber, place],
  );

  useInterval(() => {
    if (remainningTime === 0 && !shouldEndGame) {
      endGame(true);
      setCount(1);
      return;
    }

    if (shouldStartTimer) {
      setRemainningTime(remainningTime - 1);
      // eslint-disable-next-line max-len
      const min = remainningTime % 60 === 0 ? Math.floor(remainningTime / 60) - 1 : Math.floor(remainningTime / 60);
      // eslint-disable-next-line no-nested-ternary
      const sec = remainningTime % 60 === 0 ? '59' : remainningTime % 60 - 1 < 10 ? `0${remainningTime % 60 - 1}` : `${remainningTime % 60 - 1}`;
      setDisplayTime(`${min}:${sec}`);
    }
  }, 1000);

  const places: string[] = getPlaces(category);
  const players: number[] = createSequentialNumberArray(countPlayer).map((num) => num + 1);

  useEffect(() => {
    if (!shouldShowResult) return;

    const isSpyWinCurrently = answerFromSpy === place;
    const arePlayersWinCurrently = answerFromPlayers.filter(
      (answer: number) => answer === spyNumber,
    ).length >= Math.ceil((countPlayer - 1) / 2);

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
              onClick={() => {
                setCount((number) => number + 1);
                if (count === countPlayer) {
                  setRemainningTime(time * 60);
                  setDisplayTime(`${time}:00`);
                }
              }}
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
          제한된 시간은
          {' '}
          {time}
          {' '}
          분
          {' '}
          입니다.
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {displayTime}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            setRemainningTime(0);
            endGame(true);
            setCount(1);
          }}
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
          {count === spyNumber
            ? (
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
            )
            : (
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
            )}
          <Button
            variant="outlined"
            onClick={() => {
              setCount((number) => number + 1);
              if (count !== spyNumber) {
                setAnswerFromPlayers((oldAnswers) => [...oldAnswers, answerFromPlayer]);
                setAnswerFromPlayer(1);
              }

              if (count === countPlayer) {
                setShouldShowResult(true);
              }
            }}
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
            {/* eslint-disable-next-line no-nested-ternary */}
            {(isSpyWin && arePlayersWin) || (!isSpyWin && !arePlayersWin) ? '무승부' : isSpyWin ? '스파이 승리' : '플레이어 승리'}
          </Typography>
        </Box>
        )
      }
    </Container>
  );
};

export default App;
