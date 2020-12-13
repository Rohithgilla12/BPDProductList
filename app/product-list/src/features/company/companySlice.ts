import { firestoreInstance } from './../../app/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';


interface CompanyState {
  readonly loading: boolean,
  readonly companies: Array<Company>,
}


interface Company {
  id: string
  name: string
}

const initialState: CompanyState = {
  loading: false,
  companies: [],
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    getCompanies: (state, action: PayloadAction<Array<Company>>) => {
      state.companies = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading, getCompanies } = companySlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getCompaniesData = (): AppThunk => dispatch => {
  dispatch(setLoading(true));
  var companies: Array<Company> = [];
  firestoreInstance.collection('companies').get().then((documentSnapshot) => {
    documentSnapshot.forEach((document) => {
      if (document.exists) {
        const company = document.data() as Company;
        companies = companies.concat(company);
      }
    });
    dispatch(getCompanies(companies));
  })

};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCompanies = (state: RootState) => state.company.companies;
export const isGettingCompanies = (state: RootState) => state.company.loading;

export default companySlice.reducer;
