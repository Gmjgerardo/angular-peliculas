import { AfterViewInit, Component, ComponentRef, inject, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ErrorListComponent } from '../error-list/error-list.component';
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { ICRUDService } from '../../interfaces/ICRUDService';
import { HttpErrorResponse } from '@angular/common/http';
import { extractErrors } from '../../functions';
import { Router } from '@angular/router';
import { IFormComponent } from '../../interfaces/IFormComponent';

@Component({
  selector: 'app-entity-create',
  standalone: true,
  imports: [ErrorListComponent],
  templateUrl: './entity-create.component.html',
  styleUrl: './entity-create.component.css'
})
export class EntityCreateComponent<TDTO, TCreationDTO> implements AfterViewInit {
  private CRUDservice: ICRUDService<TDTO, TCreationDTO> = inject(CRUD_SERVICE_TOKEN) as ICRUDService<TDTO, TCreationDTO>;
  private router: Router = inject(Router);
  
  @Input({ required: true }) title!: string;
  @Input({ required: true }) indexRoute!: string;
  @Input({ required: true }) form!: Type<IFormComponent<TDTO, TCreationDTO>>;
  
  @ViewChild('formContainer', { read: ViewContainerRef }) formContainer!: ViewContainerRef;
  
  errors: string[] = [];

  ngAfterViewInit(): void {
    const componentRef: ComponentRef<IFormComponent<TDTO,TCreationDTO>> = this.formContainer.createComponent(this.form);
    componentRef.instance.postSendEvent.subscribe((entity: TCreationDTO) => {this.saveChanges(entity)});
  }

  saveChanges(entity: TCreationDTO): void {
    this.CRUDservice.create(entity).subscribe({
      next: () => this.router.navigate([this.indexRoute]),
      error: (err: HttpErrorResponse) => {
        this.errors = extractErrors(err);
      }
    });
  }
}
