/**
 * ./containers/WeDataTitle.js
 * 
 * Copyright (c) of WeData
 * All rights reserved
 * ------------------------------------------------------------------
 * Description:
 *  LineChart for main application, this container should be used
 *  whenever line charts are needed.
 * ------------------------------------------------------------------
 * NOTABLE CHANGES:
 * 24-Aug-2020 VTurnier
 * 1. original
 */

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function WeDataTitle(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

WeDataTitle.propTypes = {
  children: PropTypes.node,
};