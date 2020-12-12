import immutable from 'immutability-helper'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import actions from 'actions/company'

export const companyState = {
    loading: false,
    companies: [],
}
export default {
    company: reducerWithInitialState(companyState)
        .case(actions.fetchCompanies.started, (state, action) => {
            return immutable(state, {
                loading: { $set: true },
                companies: { $set: [] },
            })
        })
        .case(actions.fetchCompanies.done, (state, action) => {
            return immutable(state, {
                loading: { $set: false },
                companies: { $set: action.result.companies },
            })
        })
        .case(actions.fetchCompanies.failed, (state, action) => {
            return immutable(state, {
                loading: { $set: false },
                companies: { $set: [] },
            })
        })
    ,
}
