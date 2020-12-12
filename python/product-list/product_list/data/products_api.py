from typing import Sequence
from firebase_admin import firestore
from product_list.models.company import Company


class ProductApi(object):
    def __init__(self):
        self.client = firestore.client()
        self.collection = firestore.client().collection(u'products')

    def add_product(self, company: Company):
        for product in company.products:
            self.collection.add({
                u'companyId': company.id,
                u'name': product.name,
                u'packing': product.packaging,
                u'id': product.id,
            })

    def add_products(self, companies: Sequence[Company]):
        for company in companies:
            self.add_product(company=company)
