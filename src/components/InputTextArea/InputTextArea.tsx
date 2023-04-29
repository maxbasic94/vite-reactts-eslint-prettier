import { Textarea } from '@mui/joy';
import React, { ChangeEvent } from 'react';

import { useStyles } from '../../AppStyles';

interface InputTextAreaProps {
  value: string;
  onChangeValue: (...event: string[]) => void;
}

export const InputTextArea: React.FC<InputTextAreaProps> = ({ value, onChangeValue }) => {
  const { classes } = useStyles();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChangeValue(event.target.value);
  };

  return (
    <Textarea
      className={classes.textArea}
      minRows={4}
      maxRows={8}
      placeholder="text area"
      value={value}
      onChange={handleChange}
    />
  );
};
