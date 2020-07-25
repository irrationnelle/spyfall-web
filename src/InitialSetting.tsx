import {
  Box, Button, FormControl, InputLabel, Link, MenuItem, Select, TextField, Typography,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CategoryList } from './App';
import randomIntFromInterval from './helper';
import { getPlace } from './places';

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

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  form: {
    margin: theme.spacing(1),
  },
}));

const DEFAULT_TIME_MINUTE = 5;
const DEFAULT_COUNT_PLAYER = 4;

const InitialSetting = () => {
  const classes = useStyles();
  const [countPlayer, setCountPlayer] = useState<number>(DEFAULT_COUNT_PLAYER);
  const [time, setTime] = useState<number>(DEFAULT_TIME_MINUTE);
  const [category, setCategory] = useState<CategoryList>(CategoryList.BASIC);
  const [shouldStartGame, startGame] = useState<boolean>(false);
  const [spyNumber, setSpyNumber] = useState<number>(0);
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
  );
};

export default InitialSetting;