import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { firestoreInstance } from '../../app/constants';
import { AppThunk, RootState } from '../../app/store';

interface ProductState {
	readonly loading: boolean;
	readonly products: Record<string, Array<Product>>;
	readonly selectedCompanyId?: string;
}

export interface Product {
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
			state.loading = false;
		},

		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},

		setSelectedCompany: (state, action: PayloadAction<string>) => {
			state.selectedCompanyId = action.payload;
		},
	}
})

export const { getProducts, setLoading, setSelectedCompany } = productSlice.actions;

export const getSelectedProducts = (): AppThunk => (dispatch, getState) => {
	dispatch(setLoading(true));
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

export const selectedProducts = (state: RootState) => {
	if (state.product.selectedCompanyId) return state.product.products[state.product.selectedCompanyId];
};
export const isGettingProducts = (state: RootState) => state.product.loading;

export default productSlice.reducer;
