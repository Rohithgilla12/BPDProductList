import { Company } from 'types/common';
import { CompanyApi } from './../data/company';
import { from, Observable } from 'rxjs'
import { Epic } from 'redux-observable'

import { ofAction } from 'typescript-fsa-redux-observable'
// for actions
import { AnyAction } from 'typescript-fsa'
import actions from 'actions/company'
import { ajax } from 'rxjs/ajax'
import { catchError, map, mergeMap } from 'rxjs/operators'
import firebase from 'firebase';

const api: CompanyApi = new CompanyApi(firebase.firestore());

export const fetchCompanies: Epic<AnyAction> = (action$) => action$.pipe(
    ofAction(actions.fetchCompanies.started),
    map((param) => {
        const companies: Array<Company> = api.getCompanies();
        return actions.fetchCompanies.done({
            params: param.payload,
            result: { companies: companies },
        });
    }),
    catchError(error => Observable.of(actions.fetchCompanies.failed({
        params: 'param.payload',
        error: error,
    }))
    )
)