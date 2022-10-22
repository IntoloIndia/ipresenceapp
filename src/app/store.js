import {configureStore} from '@reduxjs/toolkit';

import companyAuthReducer from '../../services/companyAuthApi';
import employeeAuthReducer from '../../services/employeeAuthApi';

export const store = configureStore({
  reducer: {
    company: companyAuthReducer,
    employee: employeeAuthReducer,
  },
});


export default store;