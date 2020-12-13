import React, { useEffect } from 'react'
import actions from 'actions/company'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Form } from 'semantic-ui-react'
import CenterLoader from 'components/CenterLoader'
import LoginInput from '../components/form/LoginInput'
import LoginButton from '../components/form/LoginButton'
import LoginWrapper from '../components/LoginWrapper'
import { Company } from 'types/common'

const Login = () => {
    const dispatch = useDispatch()
    const company = useSelector((state: any) => state.company)
    // const isLoading = company.loading
    const companies:Array<Company> = company.companies
    useEffect(() => {
        dispatch(actions.fetchCompanies.started({}));
    }, [])
    const user = useSelector((state: any) => state.user)
    const isLoading = user.status === 'running'
    return (
        <LoginWrapper>
            <Header as="h1">LOGIN</Header>
            <Form>
                <Form.Field>
                    <LoginInput onFocus={() => {}} placeholder="ID" />
                </Form.Field>
                <Form.Field>
                    <LoginInput type="password" placeholder="Password" />
                </Form.Field>
                <LoginButton
                    onClick={() => {
                        // dispatch(actions.login.started({ id: '1' }))
                    }}
                    disabled={isLoading}
                >
                    Login
                </LoginButton>
            </Form>
            <CenterLoader isLoading={isLoading} />
            {companies.map((item: Company) => {                
                return (
                    <div>{item.name}</div>
                )
            })}
        </LoginWrapper>
    )
}

export default Login
