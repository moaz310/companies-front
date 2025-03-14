import { Component, OnInit } from '@angular/core';
import { CompaniesService, Company } from '../../services/companies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { CompanyComponent } from './company/company.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDialogComponent } from './company-dialog/company-dialog.component';

@Component({
  selector: 'app-companies',
  imports: [CompanyComponent, MatGridListModule, MatButtonModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
  standalone: true,
})
export class CompaniesComponent implements OnInit {
  companies!: Company[];

  constructor(
    private companiesService: CompaniesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.companiesService.getCompanies().subscribe({
      next: (res) => {
        this.companies = res;
      },
      error: (err) => {
        this.snackBar.open(err.error, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  onDeletedCompany(id: number) {
    this.companies.findIndex((company, index) => {
      if (company.id === id) {
        this.companies.splice(index, 1);
      }
    });
  }

  onUpdatedCompany(updatedCompany: Company) {
    this.companies.findIndex((company, index) => {
      if (company.id === updatedCompany.id) {
        this.companies[index] = updatedCompany;
      }
    });
  }

  addCompany() {
    this.dialog.open(CompanyDialogComponent).afterClosed().subscribe((company) => {
      if (company) {
        this.companies.push(company);
      }
    });
  }
}
