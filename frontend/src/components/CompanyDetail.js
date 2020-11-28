import React from 'react';
import JobCard from './JobCard';
import { Grid, Typography, Avatar } from '@material-ui/core';
import { Business } from '@material-ui/icons';
import useAPI from '../hooks/useAPI';
import Loader from './Loader';
import { useParams } from 'react-router-dom';

const CompanyDetail = () => {

  const { handle } = useParams();

  const [company, loading, error, retry] = useAPI('getCompanyDetails', handle);

  return (
    <div>
      <Loader {...{ error, loading, retry }}>
        {company &&
          <Grid container spacing={2}>
            <Grid item container spacing={2} xs={12}>
              <Grid item>
                <Avatar src={company.logoUrl} alt={`${company.name} logo`}>
                  <Business />
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h6">
                  {company.name}
                </Typography>
                <Typography variant="body1">
                  {company.description}
                </Typography>
              </Grid>
            </Grid>
            {company.jobs &&
              company.jobs.length > 0 &&
              company.jobs.map(j => (
                <Grid item xs={12} md={6} key={j.id}>
                  <JobCard {...j} />
                </Grid>
              ))
            }
          </Grid>}
      </Loader>
    </div>
  )
}

export default CompanyDetail;