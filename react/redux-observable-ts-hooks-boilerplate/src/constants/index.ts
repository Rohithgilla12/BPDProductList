import firebase from 'firebase/app';

const keyMirror = require('fbjs/lib/keyMirror')

export const ActionTypes = keyMirror({
    USER_LOGIN: undefined,
    USER_LOGOUT: undefined,
    FETCH_REPOSITORIES: undefined,
    FETCH_COMPANIES: undefined,
    CANCEL_FETCH: undefined,
    SHOW_ALERT: undefined,
    HIDE_ALERT: undefined,
})

export const ApiBaseUrl = require('./url.dev').ApiBaseUrl

export const firebaseConfig = {
    apiKey: "AIzaSyDUPQY-xTwyL3MUDczzfY79D35FGHqcoLQ",
    authDomain: "zipfinder-1c2ac.firebaseapp.com",
    databaseURL: "https://zipfinder-1c2ac.firebaseio.com",
    projectId: "zipfinder-1c2ac",
    storageBucket: "zipfinder-1c2ac.appspot.com",
    messagingSenderId: "978974681036",
    appId: "1:978974681036:web:c605f186fda4b872bd9f69"
};

firebase.initializeApp(firebaseConfig);

