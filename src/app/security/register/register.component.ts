import { Component, inject } from '@angular/core';
import { AutheticationFormComponent } from "../authetication-form/authetication-form.component";
import { SecurityService } from '../security.service';
import { UserCredentialsDTO } from '../security';
import { Router } from '@angular/router';
import { extractErrors } from '../../shared/functions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AutheticationFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private securityService: SecurityService = inject(SecurityService);
  private router: Router = inject(Router);

  errors: string[] = [];

  submitRegister(credientals: UserCredentialsDTO): void {
    this.securityService.register(credientals)
    .subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.errors = extractErrors(err),
    });
  }
}
