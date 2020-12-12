import jsonpickle
from typing import Sequence
from product_list.models.product import Product


class Company(object):
    def __init__(self, id: str, name: str, products: Sequence[Product]):
        self.id = id
        self.name = name
        self.products = products

    @classmethod
    def from_json(cls, obj):
        company: Company = jsonpickle.decode(obj)
        return company

    def to_json(self):
        return jsonpickle.encode(self, unpicklable=False)
