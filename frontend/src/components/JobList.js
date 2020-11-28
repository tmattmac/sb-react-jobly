import React, { useState } from 'react';
import JobCard from './JobCard';
import SearchBar from './SearchBar';
import { Grid, Typography } from '@material-ui/core';
import useAPI from '../hooks/useAPI';
import Loader from './Loader';

const CompanyList = () => {

  const [searchTerm, setSearchTerm] = useState(null);
  const [jobs, loading, error, retry] = useAPI('getJobs', searchTerm);

  const handleSearch = (term) => setSearchTerm(term ? { title: term } : null);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchBar doSearch={handleSearch} />
        </Grid>
        <Loader {...{ error, loading, retry }}>
          {jobs &&
            jobs.length > 0 ?
            jobs.map(j => (
              <Grid item xs={12} md={6} key={j.id}>
                <JobCard {...j} />
              </Grid>
            ))
            :
            <div style={{ width: "100%", textAlign: "center" }}>
              <Typography variant="h6">
                No results.
              </Typography>
            </div>
          }
        </Loader>
      </Grid>
    </div>
  )
}

export default CompanyList;