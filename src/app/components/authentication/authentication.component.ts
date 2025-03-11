import { Component, signal } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
  standalone: true
})
export class AuthenticationComponent {

  hide = signal(true);
  userForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  login() {
    this.authenticationService.login(this.userForm.value).subscribe({
      next: () => {
        this.snackBar.open('Login successful', 'Close', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.snackBar.open(err.error, 'Close', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      }
    });
  }

  register() {
    this.authenticationService.register(this.userForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
}
