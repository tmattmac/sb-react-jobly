import React, { useEffect, useState, useRef } from 'react';
import { TextField, Box, InputAdornment, IconButton, makeStyles } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import { debounce } from 'lodash';

const useStyles = makeStyles(theme => ({
  searchField: {
    paddingRight: 0,
    backgroundColor: "#fff",
    marginBottom: theme.spacing(2)
  }
}))

const SearchBar = ({ doSearch, live = true, delay = 500 }) => {
  const classes = useStyles();

  const [term, setTerm] = useState('');

  const { current: delaySearch } = useRef(debounce(doSearch, delay));
  useEffect(() => {
    live && delaySearch(term);
  }, [term, live, delaySearch]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    live ? delaySearch.flush() : doSearch(term);
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={term}
        onChange={handleChange}
        InputProps={{
          className: classes.searchField,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Submit Search"
                type="submit">
                <ArrowForward />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Box>
  )
}

export default SearchBar;