import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCompaniesData, selectCompanies, isGettingCompanies } from './companySlice';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export function CompanyList() {
    const companies = useSelector(selectCompanies);
    const loading = useSelector(isGettingCompanies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompaniesData());
    }, [])
    if (loading) {
        return (
            <Loader type="TailSpin" color="#00adb5" height={80} width={80} />
        )
    }
    return (
        <CompanyWrapper>
            <Grid container spacing={3}>
                {companies.map((company) => (
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
    color:#eeeeee;
    font-size:0.6em;
    border-radius:16px;
`;
