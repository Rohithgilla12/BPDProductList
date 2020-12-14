import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { firestoreInstance } from '../../app/constants';
import { AppThunk } from '../../app/store';

interface ProductState {
    readonly loading: boolean;
    readonly products: Record<string, Array<Product>>;
    readonly selectedCompanyId?: string;
}

interface Product {
    readonly id: string;
    readonly companyId: string;
    readonly name: string;
    readonly packing: string;
}

const initialState: ProductState = {
    loading: false,
    products: {}
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProducts: (state, action: PayloadAction<Array<Product>>) => {
            if (state.selectedCompanyId !== undefined) {
                state.products[state.selectedCompanyId] = action.payload;
            }
        },

        setSelectedCompany: (state, action: PayloadAction<string>) => {
            state.selectedCompanyId = action.payload;
        },
    }
})

export const { getProducts, setSelectedCompany } = productSlice.actions;

export const getSelectedProducts = (): AppThunk => (dispatch, getState) => {
    const currentState: ProductState = getState().product;
    var products: Array<Product> = [];
    firestoreInstance
        .collection('products')
        .orderBy('name')
        .where('companyId', '==', currentState.selectedCompanyId)
        .get()
        .then((documentSnapshot) => {
            documentSnapshot.forEach((document) => {
                if (document.exists) {
                    const product = document.data() as Product;
                    products = products.concat(product);
                }
            });
            dispatch(getProducts(products));
        })
}

export default productSlice.reducer;