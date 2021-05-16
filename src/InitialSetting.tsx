import {
  Box, Button, FormControl, InputLabel, Link, MenuItem, Select, TextField, Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { getPlace } from './places';
import {
  categorySelector,
  countPlayerSelector,
  placeSelector,
  shouldStartGameSelector,
  spyNumberSelector,
  timeSelector,
} from './selectors/InitialSetting';
import { randomIntFromInterval } from './helper';
import { CategoryList } from './atoms/InitialSetting';

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

const InitialSetting = (): ReactElement => {
  const classes = useStyles();
  const [countPlayer, setCountPlayer] = useRecoilState<number>(countPlayerSelector);
  const [time, setTime] = useRecoilState<number>(timeSelector);
  const [category, setCategory] = useRecoilState<CategoryList>(categorySelector);
  const startGame = useSetRecoilState(shouldStartGameSelector);
  const setSpyNumber = useSetRecoilState(spyNumberSelector);
  const setPlace = useSetRecoilState(placeSelector);

  const countPlayerError = countPlayer <= 2 || countPlayer > 8;
  const handleTime = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTime(event.target.value as number);
  };

  const handleCountPlayer = (event: React.ChangeEvent<{ value: unknown }>) => {
    const currentCountPlayer = parseInt(event.target.value as string, 10);
    setCountPlayer(currentCountPlayer);
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
          inputProps={{ 'data-testid': 'player-input' }}
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
