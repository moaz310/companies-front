import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CompaniesService, Company } from '../../../services/companies.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDialogComponent } from '../company-dialog/company-dialog.component';

@Component({
  selector: 'app-company',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
  standalone: true,
})
export class CompanyComponent {
  @Input() company!: Company;
  @Output() companyDeleted = new EventEmitter<number>();
  @Output() companyUpdated = new EventEmitter<Company>();

  constructor(
    private companiesService: CompaniesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  deleteCompany(companyId: number) {
    this.companiesService.deleteCompany(companyId).subscribe({
      next: () => {
        this.companyDeleted.emit(companyId);
        this.snackBar.open('Company deleted', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: () => {
        this.snackBar.open('Erorr deleting company', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }
  updateCompany() {
    this.dialog.open(CompanyDialogComponent, { data: this.company }).afterClosed().subscribe((company) => {
      if (company) {
        this.companyUpdated.emit(company);
      }
    })
  }
}
