import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { toBase64 } from '../../functions/toBase64';

@Component({
  selector: 'app-input-img',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css'
})
export class InputImgComponent {
  @Input({required: true})
  title!: string;

  @Input()
  imageURL: string | undefined;

  base64Image: string | undefined;

  @Output()
  selectedFile: EventEmitter<File> = new EventEmitter<File>();

  changeImage(event: Event) {
    const input: HTMLInputElement = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];

      toBase64(file)
        .then((value: string) => this.base64Image = value)
        .catch(error => console.error(error));

      this.selectedFile.emit(file);
      this.imageURL = undefined;
    }
  }
}
