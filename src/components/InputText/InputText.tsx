import { TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { FieldError } from 'react-hook-form';

import { useStyles } from '../../AppStyles';

interface InputTextProps {
  fieldError: FieldError | undefined;
  placeholder: string;
  value: string;
  onChangeValue: (...event: string[]) => void;
}

export const InputText: React.FC<InputTextProps> = ({
  fieldError,
  placeholder,
  value,
  onChangeValue,
}) => {
  const { classes } = useStyles();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChangeValue(event.target.value);
  };

  return (
    <TextField
      placeholder={placeholder}
      className={classes.inputText}
      error={fieldError && true}
      FormHelperTextProps={{
        className: classes.helperText,
      }}
      helperText={fieldError && fieldError.message}
      value={value}
      onChange={handleChange}
    />
  );
};
