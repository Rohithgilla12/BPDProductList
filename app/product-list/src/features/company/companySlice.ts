import { firestoreInstance } from './../../app/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';


interface CompanyState {
  readonly loading: boolean;
  companies: Array<Company>;
  searchResults: Array<Company>;
}


interface Company {
  id: string
  name: string
}

const initialState: CompanyState = {
  loading: false,
  companies: [],
  searchResults: [],
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

    searchedCompanies: (state, action: PayloadAction<Array<Company>>) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setLoading, getCompanies, searchedCompanies } = companySlice.actions;

export const getCompaniesData = (): AppThunk => dispatch => {
  dispatch(setLoading(true));
  var companies: Array<Company> = [];
  firestoreInstance
    .collection('companies')
    .orderBy('name')
    .get()
    .then((documentSnapshot) => {
      documentSnapshot.forEach((document) => {
        if (document.exists) {
          const company = document.data() as Company;
          companies = companies.concat(company);
        }
      });
      dispatch(getCompanies(companies));
    })
};

export const searchCompanies = (query: string): AppThunk => (dispatch, getState) => {
  const currentState: CompanyState = getState().company;
  const companies = currentState.companies;
  const searchResults: Array<Company> = companies.filter((company) => company.name.includes(query));
  dispatch(searchedCompanies(searchResults));
}

export const selectCompanies = (state: RootState) => state.company.companies;
export const searchResults = (state: RootState) => state.company.searchResults;
export const isGettingCompanies = (state: RootState) => state.company.loading;

export default companySlice.reducer;
