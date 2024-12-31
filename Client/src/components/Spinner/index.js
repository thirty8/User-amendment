import React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import classes from "./Spinner.module.css";
import { useState, useEffect } from 'react';

import { ThreeDots } from 'react-loader-spinner';
import { Audio } from 'react-loader-spinner';
import { BallTriangle } from 'react-loader-spinner';
import { Bars } from 'react-loader-spinner';
import { Circles } from 'react-loader-spinner';
import { Grid	} from 'react-loader-spinner';
import { Oval } from 'react-loader-spinner';
import { Puff	} from 'react-loader-spinner';
import { Rings } from 'react-loader-spinner';
import { TailSpin } from 'react-loader-spinner';

const Spinner = () => {

  const customTheme = JSON.parse(localStorage.getItem('theme'));

  const [getTheme, setTheme] = useState(customTheme);  

  const bgColor = getTheme.theme.navBarColor;

  return (
  <>
  <Backdrop style={{ background: bgColor }} sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
    {/* <ThreeDots height="100" width="100" color="yellow" ariaLabel="loading" /> */}
    <CircularProgress color="inherit" /> &nbsp;&nbsp;&nbsp;<p className="blink" style={{ marginTop: "15px" }}>Loading.. Please wait...</p>
  </Backdrop>
  </>
  );
};

export default Spinner;
