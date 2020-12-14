import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCompaniesData, selectCompanies, isGettingCompanies, searchCompanies, searchResults } from './companySlice';
import styled from 'styled-components';
import { Grid, TextField } from '@material-ui/core';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export function CompanyList() {
    const companies = useSelector(selectCompanies);
    const loading = useSelector(isGettingCompanies);
    const searchedCompanies = useSelector(searchResults);
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (companies.length === 0)
            dispatch(getCompaniesData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (loading) {
        return (
            <Loader type="TailSpin" color="#00adb5" height={80} width={80} />
        )
    }

    const companiesToRender = query === "" ? companies : searchedCompanies;

    return (
        <CompanyWrapper>
            <SearchWrapper>
                <TextField
                    fullWidth
                    color="primary"
                    margin="normal"
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    placeholder="Search for companies"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        dispatch(searchCompanies(query));
                    }}
                />
            </SearchWrapper>
            <Grid container spacing={3}>
                {companiesToRender.map((company) => (
                    <Grid item xs={6} md={3}>
                        <CompanyCard key={company.id}>
                            {company.name}
                        </CompanyCard>
                    </Grid>
                ))}
            </Grid>
        </CompanyWrapper>
    );
}


const CompanyWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const CompanyCard = styled.div`
    margin: 1rem;
    padding: 1rem;
    background-color:#393e46;    
    font-size:0.6em;
    border-radius:16px;
`;

const SearchWrapper = styled.div`
    margin: 1rem;
    padding: 1rem;
    width:100%;
    color:#eeeeee;
`;
