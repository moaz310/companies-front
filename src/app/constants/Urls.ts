import { environment } from "../../environments/environment.development";

export const loginUrl = environment.serverUrl + 'auth/api/login';
export const registerUrl = environment.serverUrl + 'auth/api/register';
export const getCompaniesUrl = environment.serverUrl + 'companies/api/all';
export const addCompanyUrl = environment.serverUrl + 'companies/api/add';
export const updateCompanyUrl = environment.serverUrl + 'companies/api/update/';
export const deleteCompanyUrl = environment.serverUrl + 'companies/api/delete/';
