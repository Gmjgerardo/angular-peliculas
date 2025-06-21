import { Component, inject, Input } from '@angular/core';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-authorized',
  standalone: true,
  imports: [],
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.css'
})
export class AuthorizedComponent {
  private securityService: SecurityService = inject(SecurityService);

  @Input() role: string | null = null;

  isAuthorized(): boolean {
    return this.securityService.isLogged()
        && this.role == null
        || this.securityService.getRoles().includes(this.role!);
  }
}
