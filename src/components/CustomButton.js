import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import React from 'react';

const CustomButton = ({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName,
  tipPlacement,
}) => (
  <Tooltip title={tip} className={tipClassName} placement={tipPlacement}>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);

export default CustomButton;
