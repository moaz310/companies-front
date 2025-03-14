import { Component, OnInit } from '@angular/core';
import { CompaniesService, Company } from '../../services/companies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { CompanyComponent } from './company/company.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-companies',
  imports: [
    CompanyComponent,
    MatGridListModule,
    MatButtonModule
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
  standalone: true
})
export class CompaniesComponent implements OnInit {
addCompany() {
throw new Error('Method not implemented.');
}
  companies!: Company[];

  constructor(
    private companiesService: CompaniesService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.companiesService.getCompanies().subscribe({
      next: (res) => {
        this.companies = res;
      },
      error: (err) => {
        this.snackBar.open(err.error, 'Close', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      }
    });
  }

  onDeletedCompany(id: number) {
    this.companies.findIndex((company, index) => {
      if (company.id === id) {
        this.companies.splice(index, 1);
      }
    })
  }
}
