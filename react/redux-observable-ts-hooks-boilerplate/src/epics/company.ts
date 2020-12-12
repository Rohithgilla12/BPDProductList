import { CompanyApi } from './../data/company';
import { Observable } from 'rxjs'
import { Epic } from 'redux-observable'

import { ofAction } from 'typescript-fsa-redux-observable'
// for actions
import { AnyAction } from 'typescript-fsa'
import actions from 'actions/company'
import { ajax } from 'rxjs/ajax'
import { catchError, debounceTime, map, mergeMap } from 'rxjs/operators'
import firebase from 'firebase';

const api: CompanyApi = new CompanyApi(firebase.firestore());

export const fetchCompanies: Epic<AnyAction> = (action$) => action$.pipe(
    ofAction(actions.fetchCompanies.started),
    mergeMap((param) =>
        ajax.getJSON(`https://api.github.com/search/repositories?q=+language:javascript+created:%3E2016-10-01&sort=stars&order=desc`).pipe(
            map(data => {
                return actions.fetchCompanies.done({
                    params: param.payload,
                    result: { companies: data },
                })
            }),
            catchError(error =>
                Observable.of(actions.fetchCompanies.failed({
                    params: param.payload,
                    error: error,
                })),
            ),
        ),
    ),
)
