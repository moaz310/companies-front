import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addCompanyUrl, deleteCompanyUrl, getCompaniesUrl, updateCompanyUrl } from '../constants/Urls';
import { Observable } from 'rxjs';

export interface Company{
  id: number;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  companyWebsite: string;
  companyDescription: string;
  companyLogoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(getCompaniesUrl);
  }

  deleteCompany(id: number): Observable<any> {
    return this.httpClient.delete<any>(deleteCompanyUrl + id);
  }

  updateCompany(company: Company): Observable<any> {
    return this.httpClient.put<any>(updateCompanyUrl + company.id, company);
  }

  addCompany(company: Company): Observable<any> {
    return this.httpClient.post<any>(addCompanyUrl, company);
  }
}
