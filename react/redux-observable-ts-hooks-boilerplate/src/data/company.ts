import firebase from 'firebase/app';
import { Company } from 'types/common';
import { from, Observable } from 'rxjs';
import { collection } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
export class CompanyApi {
    private firestore: firebase.firestore.Firestore;

    constructor(firestore: firebase.firestore.Firestore) {
        this.firestore = firestore;
    }

    getCompanies() {
        let companies: Array<Company> = [];
        const collectionRef: firebase.firestore.CollectionReference = this.firestore.collection('companies');
        collection(collectionRef)
            .pipe(map(docs => docs.map(d => d.data())))
            .subscribe(function (companiesArr) {
                companiesArr.forEach(function (document) {
                    const company = document as Company;

                    companies.push(company);
                })
            });

        // fetchProducts(): Observable < Product[] > {
        //     return this.http.get("http://examples.com/myData")
        //         .map((response) => {
        //             return response.json().products;
        //         })
        //         .switchMap(productArray => {
        //             return Observable.from(productArray);
        //         })
        //         .map((productData: any) => {
        //             return new Product(
        //                 productData.id,
        //                 productData.name,
        //                 productData.materials
        //             );
        //         })
        //         .toArray();
        // }
        // .then(function (snapshot: firebase.firestore.QuerySnapshot) {
        //     snapshot.forEach((document) => {
        //         const company = document.data() as Company;
        //         companies.push(company);
        //     })
        // });
        return companies;
    }
}