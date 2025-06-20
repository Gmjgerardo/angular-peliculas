import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { SecurityService } from '../../../security/security.service';
import { AuthorizedComponent } from "../../../security/authorized/authorized.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, AuthorizedComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private securityService: SecurityService = inject(SecurityService);

  logout = () => this.securityService.logout();
  getJWTField = (field: string) => this.securityService.getJWTField(field);
}
