import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()({
  app: {
    display: 'flex',
    justifyContent: 'center',
    background: '#2a2d34',
    color: '#dddddd',
    height: '100vh',
    width: '100vw',
  },
  input: {
    display: 'block',
    boxSizing: 'border-box',
    width: '100%',
    borderRadius: 4,
    border: '1px solid white',
    padding: '10px 15px',
    marginBottom: 10,
    fontSize: 14,
  },
  helperText: {
    position: 'absolute',
    bottom: -20,
    padding: 0,
    margin: 0,
    background: '#2a2d34',
  },
  fieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 20,
  },
  formWrapper: {
    width: '800px',
    padding: 20,
  },
  textArea: {
    background: '#dddddd',
    borderRadius: 0,
  },
  inputText: {
    background: '#dddddd',
    '& .MuiInputBase-root': {
      borderRadius: 0,
    },
  },
  inputAutocomplete: {
    width: '100%',
    background: '#dddddd',
    '& .MuiInputBase-root': {
      borderRadius: 0,
    },
  },
});
