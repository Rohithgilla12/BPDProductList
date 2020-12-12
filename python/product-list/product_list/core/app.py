import pandas as pd
from product_list.data.company_api import CompanyApi
from product_list.data.products_api import ProductApi
from product_list.models.company import Company
from product_list.models.product import Product
from typing import Mapping, Sequence
import uuid
import product_list.core.config


df = pd.read_excel('assets/bpdprielist.xlsx')


def get_company_name(name: str):
    return name.split(':')[-1]


def get_company_from_df(adf: pd.DataFrame):
    return get_company_name(adf.iloc[0].Code)


def dict_to_products(dicts: Sequence[Mapping]):
    products: Sequence[Product] = []
    for adict in dicts:
        product: Product = Product.from_dict(adict=adict)
        products.append(product)
    return products


splits: Sequence[int] = []
dfs: Sequence[pd.DataFrame] = []
companies: Sequence[Company] = []

for ind in df.index:
    if(pd.isna(df['Name'][ind])):
        splits.append(ind)

for i in range(len(splits) - 1):
    dfs.append(df[splits[i]:splits[i+1]])


for adf in dfs:
    name = get_company_from_df(adf)
    adf: pd.DataFrame = adf[1:]
    dicts = adf.to_dict(orient='records')
    products = dict_to_products(dicts=dicts)
    company: Company = Company(
        name=name, products=products, id=str(uuid.uuid4()))
    companies.append(company)


# To add companies to the database
# company_api: CompanyApi = CompanyApi()

# company_api.add_companies(companies=companies)

# To add products to the database

# product_api: ProductApi = ProductApi()

# product_api.add_products(companies=companies)
