import { Component, ComponentRef, inject, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ErrorListComponent } from '../error-list/error-list.component';
import { LoadingComponent } from '../loading/loading.component';
import { Router } from '@angular/router';
import { extractErrors } from '../../../shared/functions';
import { ICRUDService } from '../../interfaces/ICRUDService';
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { IFormComponent } from '../../interfaces/IFormComponent';

@Component({
  selector: 'app-entity-edit',
  standalone: true,
  imports: [ErrorListComponent, LoadingComponent],
  templateUrl: './entity-edit.component.html',
  styleUrl: './entity-edit.component.css'
})
export class EntityEditComponent<TDTO, TCreationDTO> implements OnInit {
  private ICRUDservice: ICRUDService<TDTO, TCreationDTO> = inject(CRUD_SERVICE_TOKEN) as ICRUDService<TDTO, TCreationDTO>;
  private router: Router = inject(Router);

  @Input({ required: true }) id!: number;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) indexRoute!: string;
  @Input({ required: true }) form!: Type<IFormComponent<TDTO, TCreationDTO>>;

  @ViewChild('formContainer', { read: ViewContainerRef }) formContainer!: ViewContainerRef;

  errors: string[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.ICRUDservice.obtainById(this.id).subscribe({
      next: (entity: TDTO) => this.loadComponent(entity),
      error: (err) => { 
        // ToDo: Show NotFound error
        console.log(typeof(err));
        setTimeout(() => this.router.navigate([this.indexRoute]), 2500);
      }
    });
  }

  loadComponent(entity: TDTO): void {
    if(this.formContainer) {
      const componentRef: ComponentRef<IFormComponent<TDTO, TCreationDTO>> = this.formContainer.createComponent(this.form);
      componentRef.instance.model = entity;
      componentRef.instance.postSendEvent.subscribe(entity => this.saveChanges(entity));
      
      this.loading = false;
    }
  }

  saveChanges(entity: TCreationDTO): void {
    this.ICRUDservice.update(this.id, entity).subscribe({
      next: () => this.router.navigate([this.indexRoute]),
      error: (err) => this.errors = extractErrors(err),
    });
  }
}
