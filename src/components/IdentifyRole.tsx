import React, { ReactElement, useState } from 'react';
import {
  Box, Button, Modal, Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  playerName: string;
  roleMessage: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    position: 'relative',
    margin: 'auto',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const IdentifyRole:React.FC<Props> = ({ playerName, roleMessage }: Props): ReactElement => {
  const classes = useStyles();

  const [shouldOpenModal, setOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h5" component="h2">
        {playerName}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        확인하기
      </Button>
      <Modal
        open={shouldOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">{roleMessage}</h2>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseModal}
          >
            close
          </Button>
        </div>
      </Modal>
    </Box>
  );
};

export default IdentifyRole;
