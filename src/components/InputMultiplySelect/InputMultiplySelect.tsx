import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import { PositionType } from '../../App';
import { useStyles } from '../../AppStyles';

interface InputMultiplySelectProps {
  fieldError:
    | Merge<FieldError, FieldErrorsImpl<{ name: string; id: string }>>
    | undefined;
  placeholder: string;
  onChangeValue: (...event: any[]) => void;
  options: PositionType[];
  onReset: () => void;
}

export const InputMultiplySelect: React.FC<InputMultiplySelectProps> = ({
  fieldError,
  placeholder,
  onChangeValue,
  options,
  onReset,
}) => {
  const { classes } = useStyles();

  const [value, setValue] = useState<PositionType[]>([]);

  useEffect(() => {
    onChangeValue(value);
  }, [value]);

  useEffect(() => {
    setValue([]);
  }, [onReset]);

  return (
    <Autocomplete
      value={value}
      multiple
      className={classes.inputAutocomplete}
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={fieldError && true}
          FormHelperTextProps={{
            className: classes.helperText,
          }}
          helperText={fieldError && fieldError.message}
        />
      )}
      onChange={(_, data) => setValue(data)}
    />
  );
};
