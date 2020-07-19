import React, { ReactElement, useState } from 'react';
import {
  Box, Button, Container, Typography, Link, InputLabel, MenuItem, FormControl, Select, TextField,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import randomIntFromInterval from './helper';
import { getPlace } from './places';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  form: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Copyright: React.FC = (): ReactElement => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://dev.rase.blog/">
      irrationnelle
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>
);

const DEFAULT_COUNT_PLAYER = 4;
const DEFAULT_TIME_MINUTE = 5;
export enum CategoryList {
  ALL = 'all',
  BASIC = 'basic',
  COUNTRY = 'country',
  STRANGE = 'strange'
}

const App:React.FC = (): ReactElement => {
  const classes = useStyles();
  const [time, setTime] = useState(DEFAULT_TIME_MINUTE);
  const [countPlayer, setCountPlayer] = useState(DEFAULT_COUNT_PLAYER);
  const [category, setCategory] = useState<CategoryList>(CategoryList.BASIC);
  const [shouldStartGame, startGame] = useState<boolean>(false);
  const [spyNumber, setSpyNumber] = useState<number>(0);
  const [count, setCount] = useState<number>(1);
  const [place, setPlace] = useState<string>('허공');

  const countPlayerError = countPlayer <= 2 || countPlayer > 8;
  const handleTime = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTime(event.target.value as number);
  };
  const handleCountPlayer = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCountPlayer(event.target.value as number);
  };
  const handleCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as CategoryList);
  };
  const handleStartGame = () => {
    startGame(true);
    setSpyNumber(randomIntFromInterval(1, countPlayer));
    const currentPlace = getPlace(category);
    setPlace(currentPlace);
  };

  return (
    <Container maxWidth="sm">
      {!shouldStartGame && (
      <Box
        data-testid="game-setting-box"
        my={4}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <FormControl className={classes.formControl}>
          <InputLabel id="time-select-input-label">Time</InputLabel>
          <Select
            labelId="time-select-label"
            id="time-select"
            value={time}
            onChange={handleTime}
          >
            <MenuItem value={5}>5 min</MenuItem>
            <MenuItem value={10}>10 min</MenuItem>
            <MenuItem value={15}>15 min</MenuItem>
          </Select>
        </FormControl>
        <form noValidate autoComplete="off" className={classes.form}>
          <TextField
            error={countPlayerError}
            id="player-input"
            label={countPlayerError ? 'Error' : 'Player'}
            type="number"
            value={countPlayer}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleCountPlayer}
            helperText={countPlayerError && '참여 인원은 최소 3명이상 최대 8명까지 입니다.'}
          />
        </form>
        <FormControl className={classes.formControl}>
          <InputLabel id="category-select-input-label">Category</InputLabel>
          <Select
            labelId="categroy-select-label"
            id="category-select"
            value={category}
            onChange={handleCategory}
          >
            <MenuItem value={CategoryList.ALL}>전체</MenuItem>
            <MenuItem value={CategoryList.BASIC}>기본</MenuItem>
            <MenuItem value={CategoryList.COUNTRY}>국가</MenuItem>
            <MenuItem value={CategoryList.STRANGE}>희귀</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={handleStartGame}>GAME START!</Button>
        <Copyright />
      </Box>
      )}
      {shouldStartGame && count <= countPlayer
          && (
          <Box>
            <Typography variant="h5" component="h2">
              {`Player ${count}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              {count === spyNumber ? '당신은 스파이입니다.' : `지정한 장소는 ${place}입니다`}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setCount((number) => number + 1);
              }}
            >
              Next Player
            </Button>
          </Box>
          )}
      {shouldStartGame && count > countPlayer && (
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
      </Box>
      )}
    </Container>
  );
};

export default App;
