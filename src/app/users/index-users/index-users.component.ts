import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserDTO } from '../users';
import { GenericListComponent } from "../../shared/components/generic-list/generic-list.component";
import { MatTableModule } from '@angular/material/table';
import { PaginationDTO } from '../../shared/models/PaginationDTO';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-users',
  standalone: true,
  imports: [GenericListComponent, MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './index-users.component.html',
  styleUrl: './index-users.component.css'
})
export class IndexUsersComponent implements OnInit {
  private usersService: UsersService = inject(UsersService);

  displayedColumns: string[] = ['email', 'actions'];
  pagination: PaginationDTO = { page:1, rowsPerPage: 5 };
  totalCount!: number;
  
  users: UserDTO[] = [];

  ngOnInit(): void {
    this.usersService.getUsers(this.pagination).subscribe({
      next: ({ headers, body: usersResponse }) => {
        this.users = usersResponse ?? [];
        this.totalCount = parseInt(headers.get('total-records-count') ?? "0", 10);
      },
      error: (err) => console.error('An error occurred when trying get user.', err),
    });
  }

  becomeAdmin(user: UserDTO): void {
    this.usersService.addAdminClaimToUser(user).subscribe({
      next: () => Swal.fire('Exitoso', `El usuario ${user.email} ha sido asignado como administrador correctamente.` , 'success'),
      error: (err) => this.manageErrors(err),
    });
  };

  revokeAdmin(user: UserDTO): void {
    this.usersService.removeAdminClaimToUser(user).subscribe({
      next: () => Swal.fire('Exitoso', `El usuario ${user.email} ha sido eliminado como administrador correctamente.` , 'success'),
      error: (err) => this.manageErrors(err),
    });
  };

  private manageErrors(err: any): void {
    Swal.fire('Error', `Ocurrio un error, intentalo nuevamente.` , 'error')
    console.error('An error has occurred when modifying Admin Claim to user', err);
  }
}
