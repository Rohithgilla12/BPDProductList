import uuid

from product_list.models.product import Product


def test_product_model_init():
    id = uuid.uuid4()
    product: Product = Product(id=id, name='Calpol', packaging='10 sheets')
    assert product.id == id
    assert product.name == 'Calpol'
    assert product.packaging == '10 sheets'
