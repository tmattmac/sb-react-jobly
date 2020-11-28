import React, { useState } from 'react';
import CompanyCard from './CompanyCard';
import SearchBar from './SearchBar';
import { Grid, Typography } from '@material-ui/core';
import useAPI from '../hooks/useAPI';
import Loader from './Loader';

const CompanyList = () => {

  const [searchTerm, setSearchTerm] = useState(null);
  const [companies, loading, error, retry] = useAPI('getCompanies', searchTerm);

  const handleSearch = (term) => setSearchTerm(term ? { name: term } : null);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchBar doSearch={handleSearch} />
        </Grid>
        <Loader {...{ error, loading, retry }}>
          {companies &&
            companies.length > 0 ?
            companies.map(c => (
              <Grid item xs={12} md={6} key={c.handle}>
                <CompanyCard {...c} />
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