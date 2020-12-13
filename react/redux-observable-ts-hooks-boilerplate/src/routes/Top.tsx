import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Wrapper from 'components/Wrapper'
import { useDispatch, useSelector } from 'react-redux'
import actions from 'actions/company'
import { Company } from 'types/common'

const Home = () => {
    const dispatch = useDispatch()
    const company = useSelector((state: any) => state.company)
    const isLoading = company.loading
    const companies = company.companies as Array<Company>
    useEffect(() => {
        dispatch(actions.fetchCompanies.started({}));
    }, [])
    console.log(companies);
    return (
        <Wrapper>
             <Button
                onClick={() => {
                      {companies.map((item: Company) => {                
                          console.log(item.name);
            })}
                }}
                disabled={isLoading}
            ></Button>
            {console.log(isLoading)}
            {/* {console.log(companies)} */}
            {companies.map((item: Company) => {                
                return (
                    <div>{item.name}</div>
                )
            })}
        </Wrapper>
    )
}

export default Home