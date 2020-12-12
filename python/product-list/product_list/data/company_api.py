from typing import Sequence
from firebase_admin import firestore
from product_list.models.company import Company


class CompanyApi(object):
    def __init__(self):
        self.client = firestore.client()
        self.collection = firestore.client().collection(u'companies')

    def add_company(self, comapny: Company):
        self.collection.add({
            u'id': comapny.id,
            u'name': comapny.name
        })

    def add_companies(self, companies: Sequence[Company]):
        for company in companies:
            self.add_company(comapny=company)
