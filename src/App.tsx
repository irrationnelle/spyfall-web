import React, { ReactElement, useState } from 'react';
import {
  Container, Typography, Box, Link, InputLabel, MenuItem, FormControl, Select, TextField,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Copyright: React.FC = (): ReactElement => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://material-ui.com/">
      Your Website
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>
);

const DEFAULT_COUNT_PLAYER = 4;
const DEFAULT_TIME_MINUTE = 5;
enum CategoryList {
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

  return (
    <Container maxWidth="sm">
      <Box my={4}>
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
        <form noValidate autoComplete="off">
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
        <Copyright />
      </Box>
    </Container>
  );
};

export default App;
