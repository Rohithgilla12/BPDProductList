import { firestoreInstance } from './../../app/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';


interface CompanyState {
  readonly loading: boolean,
  readonly companies: Array<Company>,
  readonly selectedCompanyId?: string,
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

    setSelectedCompany: (state, action: PayloadAction<string>) => {
      state.selectedCompanyId = action.payload;
    },
  },
});

export const { setLoading, getCompanies, setSelectedCompany } = companySlice.actions;

export const getCompaniesData = (): AppThunk => dispatch => {
  dispatch(setLoading(true));
  var companies: Array<Company> = [];
  firestoreInstance.collection('companies').orderBy('name').get().then((documentSnapshot) => {
    documentSnapshot.forEach((document) => {
      if (document.exists) {
        const company = document.data() as Company;
        companies = companies.concat(company);
      }
    });
    dispatch(getCompanies(companies));
  })

};

export const selectCompanies = (state: RootState) => state.company.companies;
export const isGettingCompanies = (state: RootState) => state.company.loading;

export default companySlice.reducer;
