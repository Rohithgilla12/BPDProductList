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
        //Mount
        console.log('mount')
        dispatch(actions.fetchCompanies.started({}));
        return () => {
            console.log('unmount')
        }
    }, [])
    return (
        <Wrapper>
            <Header as="h1">Top</Header>
            <Button>
                <Link to="/login">Go to Login Page</Link>
            </Button>
        </Wrapper>
    )
}

export default Home