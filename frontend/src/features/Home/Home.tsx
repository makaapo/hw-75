import React from 'react';
import {CircularProgress, TextField, Button, Grid, Box} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  selectDecode,
  selectEncode,
  selectLoadingDecoded, selectLoadingEncoded,
  selectPassword,
  setDecode,
  setEncode,
  setPassword
} from '../codingSlice';
import {decodeMessage, encodeMessage} from '../codingThunks';
import {toast} from 'react-toastify';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';


const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const encode = useAppSelector(selectEncode);
  const decode = useAppSelector(selectDecode);
  const password = useAppSelector(selectPassword);
  const loadingEncode = useAppSelector(selectLoadingEncoded);
  const loadingDecode = useAppSelector(selectLoadingDecoded);

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if (name === 'password') {
      dispatch(setPassword(value));
    } else if (name === 'encode') {
      dispatch(setEncode(value));
    } else if (name === 'decode') {
      dispatch(setDecode(value));
    }
  };

  const onEncode = async () => {
    try {
      if (password.trim() && encode.trim()) {
        await dispatch(encodeMessage({password, message: encode})).unwrap();
      }
    } catch (error) {
      toast.error('error while encoding the message');
    }
  };

  const onDecode = async () => {
    try {
      if (password.trim() && decode.trim()) {
        await dispatch(decodeMessage({password, message: decode})).unwrap();
      }
    } catch (error) {
      toast.error('error while decoding the message');
    }
  };

  return (
    <Box sx={{maxWidth: 400, mx: 'auto', mt: 4}}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextField
            label="Decoded message"
            name="encode"
            value={encode}
            onChange={onFieldChange}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={7}>
          <TextField
            label="Password"
            name="password"
            value={password}
            onChange={onFieldChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={5} container justifyContent="space-between">
          <Button
            variant="contained"
            onClick={onEncode}
            disabled={!password.trim() || !encode.trim() || loadingEncode}
            sx={{
              flexGrow: 1,
              mr: 1,
              '& .MuiButton-startIcon': {
                marginRight: 0,
                marginLeft: 0,
              },
            }}
            startIcon={loadingEncode ? <CircularProgress size={20}/> : <ArrowCircleDownIcon />}
          >
          </Button>
          <Button
            variant="contained"
            onClick={onDecode}
            disabled={!password.trim() || !decode.trim() || loadingDecode}
            sx={{
              flexGrow: 1,
              mr: 1,
              '& .MuiButton-startIcon': {
                marginRight: 0,
                marginLeft: 0,
              },
            }}
            startIcon={loadingDecode ? <CircularProgress size={20} /> : <ArrowCircleUpIcon />}
          >
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Encoded message"
            name="decode"
            value={decode}
            onChange={onFieldChange}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
