import { Component, inject } from '@angular/core';
import { AutheticationFormComponent } from "../authetication-form/authetication-form.component";
import { UserCredentialsDTO } from '../security';
import { SecurityService } from '../security.service';
import { extractErrors } from '../../shared/functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AutheticationFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private securityService: SecurityService = inject(SecurityService);
  private router: Router = inject(Router);

  errors: string[] = [];

  submitLogin(credentials: UserCredentialsDTO): void {
    this.securityService.login(credentials)
    .subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.errors = extractErrors(err),
    });
  }
}
