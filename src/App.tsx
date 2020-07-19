import React, { ReactElement } from 'react';
import {
  Container, Typography, Box, Link, InputLabel, MenuItem, FormControl, Select, TextField
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

const App:React.FC = (): ReactElement => {
  const classes = useStyles();
  const [time, setTime] = React.useState(5);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTime(event.target.value as number);
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
            onChange={handleChange}
          >
            <MenuItem value={5}>5 min</MenuItem>
            <MenuItem value={10}>10 min</MenuItem>
            <MenuItem value={15}>15 min</MenuItem>
          </Select>
        </FormControl>
        <form noValidate autoComplete="off">
          <TextField
            id="player-input"
            label="Player"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <Copyright />
      </Box>
    </Container>
  );
};

export default App;
