import { EventEmitter } from "@angular/core";

export interface IFormComponent<TDTO, TCreationDTO> {
  // Attributes
  model: TDTO | undefined;
  postSendEvent: EventEmitter<TCreationDTO>;

  // Methods
  saveChanges(): void;
}