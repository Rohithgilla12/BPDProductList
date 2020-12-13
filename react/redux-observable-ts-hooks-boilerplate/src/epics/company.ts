import { Company } from 'types/common';
import { CompanyApi } from './../data/company';
import { from, Observable } from 'rxjs'
import { Epic } from 'redux-observable'

import { ofAction } from 'typescript-fsa-redux-observable'
// for actions
import { AnyAction } from 'typescript-fsa'
import actions from 'actions/company'
import { ajax } from 'rxjs/ajax'
import { catchError, flatMap, map, switchMap } from 'rxjs/operators'
import firebase from 'firebase';

const api: CompanyApi = new CompanyApi(firebase.firestore());

export const fetchCompanies: Epic<AnyAction> = (action$) => action$.pipe(
    ofAction(actions.fetchCompanies.started),
    switchMap(() =>
        from(api.getCompanies()).pipe(
            flatMap((companies) => {
                console.log(companies);
                return (actions.fetchCompanies.done({ params: '', result: { companies: companies } }
                )
                );
            }),
        )),
    catchError(error => Observable.of(actions.fetchCompanies.failed({
        params: 'param.payload',
        error: error,
    }))
    )
)