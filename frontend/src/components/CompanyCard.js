import { Paper, makeStyles, Typography, Grid, Avatar } from '@material-ui/core';
import { Business } from '@material-ui/icons';
import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    height: "100%",
    cursor: "pointer",
    transition: "background-color 0.5s",
    "&:hover": {
      backgroundColor: "#f5f5f5"
    }
  }
}));

const CompanyCard = ({ handle, name, description, logoUrl }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper className={classes.root} onClick={() => history.push(`/companies/${handle}`)}>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar src={logoUrl} alt={`${name} logo`}>
            <Business /> 
          </Avatar>
        </Grid>
        <Grid item xs>
          <Typography variant="h6">
            {name}
          </Typography>
          <Typography variant="body1">
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CompanyCard;