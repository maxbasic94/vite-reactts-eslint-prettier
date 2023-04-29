import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import { RelationType } from '../../App';
import { useStyles } from '../../AppStyles';

interface InputAutocompleteProps {
  fieldError:
    | Merge<FieldError, FieldErrorsImpl<{ name: string; id: string }>>
    | undefined;
  placeholder: string;
  onChangeValue: (...event: unknown[]) => void;
  options: RelationType[];
  onReset: () => void;
}

const filter = createFilterOptions<RelationType>();

export const InputAutocomplete: React.FC<InputAutocompleteProps> = ({
  fieldError,
  placeholder,
  options,
  onChangeValue,
  onReset,
}) => {
  const { classes } = useStyles();

  const [value, setValue] = useState<RelationType | null>(null);

  useEffect(() => {
    onChangeValue(value);
  }, [value]);

  useEffect(() => {
    setValue(null);
  }, [onReset]);

  return (
    <Autocomplete
      className={classes.inputAutocomplete}
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({ name: newValue });
        } else if (newValue && newValue.inputValue) {
          setValue({ name: newValue.inputValue });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;

        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({ inputValue, name: `Add "${inputValue}"` });
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.name;
      }}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.name}
        </li>
      )}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={fieldError && true}
          FormHelperTextProps={{ className: classes.helperText }}
          helperText={fieldError && fieldError.message}
        />
      )}
    />
  );
};
