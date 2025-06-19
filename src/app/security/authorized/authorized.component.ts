import { Component, inject } from '@angular/core';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-authorized',
  standalone: true,
  imports: [],
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.css'
})
export class AuthorizedComponent {
  securityService: SecurityService = inject(SecurityService);

  isAuthorized(): boolean {
    return this.securityService.isLogged();
  }
}
