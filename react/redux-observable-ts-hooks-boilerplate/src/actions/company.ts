import { ActionTypes } from 'constants/index'

import actionCreatorFactory from 'typescript-fsa'

const ac = actionCreatorFactory()

interface FetchCompanies {
}

interface FetchCompaniesResult {
    companies: any
}

interface FetchCompaniesError {
    error: string
}

export default {
    fetchCompanies: ac.async<FetchCompanies, FetchCompaniesResult, FetchCompaniesError>(ActionTypes.FETCH_COMPANIES),
}