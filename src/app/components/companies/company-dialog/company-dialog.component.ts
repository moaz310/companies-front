import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CompaniesService, Company } from '../../../services/companies.service';

@Component({
  selector: 'app-company-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
  ],
  templateUrl: './company-dialog.component.html',
  styleUrl: './company-dialog.component.scss',
  standalone: true,
})
export class CompanyDialogComponent {
  editMode = false;
  companyForm = new FormGroup({
    companyName: new FormControl(''),
    companyAddress: new FormControl(''),
    companyEmail: new FormControl('', [Validators.email]),
    companyPhone: new FormControl(''),
    companyWebsite: new FormControl(''),
    companyDescription: new FormControl(''),
    companyLogoUrl: new FormControl(''),
  });

  constructor(
    private dialogRef: MatDialogRef<CompanyDialogComponent>,
    private companiesService: CompaniesService,
    @Inject(MAT_DIALOG_DATA) public company: Company
  ) {
    if (company) {
      this.editMode = true;
      this.companyForm.patchValue(this.company);
    }
  }

  CloseDialog(action: null | Company) {
    this.dialogRef.close(action);
  }

  updateCompany() {
    this.companiesService
      .updateCompany(this.company.id, this.companyForm.value as Company)
      .subscribe({
        next: (savedCompany) => {
          this.CloseDialog(savedCompany);
        },
      });
  }

  addCompany() {
    this.companiesService
      .addCompany(this.companyForm.value as Company)
      .subscribe({
        next: (savedCompany) => {
          this.CloseDialog(savedCompany);
        },
      });
  }
}
