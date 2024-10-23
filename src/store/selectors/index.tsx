import { RootState } from '../index';

const getDataCustomers = (state: RootState) => state.customers.data;
const getDataTransactionReports = (state: RootState) => state.transactionReports.data;
const getDataProducts = (state: RootState) => state.products.data;
const getDataUsers = (state: RootState) => state.users.data;

export { getDataCustomers, getDataTransactionReports, getDataProducts, getDataUsers };