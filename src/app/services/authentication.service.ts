import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginUrl, registerUrl } from '../constants/Urls';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  login(value: Partial<{ username: string|null; password: string|null; }>): Observable<String|{ token: string }> {
    return this.httpClient.post<String|{ token: string }>(loginUrl, value).pipe(
      tap((response: any)=>{
        if(response.token){
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  register(value: Partial<{ username: string|null; password: string|null; }>): Observable<String> {
    return this.httpClient.post<String>(registerUrl, value);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }
}
