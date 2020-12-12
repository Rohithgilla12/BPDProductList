import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'
import Wrapper from 'components/Wrapper'
import { useDispatch, useSelector } from 'react-redux'
import actions from 'actions/company'

const Home = () => {
    const dispatch = useDispatch()
    const company = useSelector((state: any) => state.company)
    const isLoading = company.loading
    const companies = company.companies
    useEffect(() => {
        dispatch(actions.fetchCompanies.started({}));
    }, [])
    return (
        <Wrapper>
            <Button onClick={()=>{console.log(companies)}}>Hi</Button>
        </Wrapper>
    )
}

export default Home