import React from 'react';
import { useField } from '@unform/core';
import { TextField, TextFieldProps } from '@mui/material';

type TVTextFieldProps = TextFieldProps & {
  name: string;
};
export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  const [value, setValue] = React.useState(defaultValue || '');

  React.useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}
      value={value}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onChange={(e) => { setValue(e.target.value); rest.onChange?.(e); }}
      onKeyDown={(e) => { error && clearError(); rest.onKeyDown?.(e); }}
    />
  );
};
