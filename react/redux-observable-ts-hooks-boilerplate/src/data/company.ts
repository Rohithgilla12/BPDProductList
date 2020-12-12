import firebase from 'firebase';
import { Company } from 'types/common';

export class CompanyApi {
    private firestore: firebase.firestore.Firestore;

    constructor(firestore: firebase.firestore.Firestore) {
        this.firestore = firestore;
    }

    getCompanies(): Array<Company> {
        let companies: Array<Company> = [];
        this.firestore.collection('companies').get().then((snapshot: firebase.firestore.QuerySnapshot) =>
            snapshot.docs
                .map(function (document: firebase.firestore.DocumentSnapshot) {
                    const company = document.data() as Company;
                    companies.push(company);
                }));
        console.log(companies);
        return companies;
    }
}