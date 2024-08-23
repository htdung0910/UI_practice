import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
  @Input() message: string = 'Are you sure you want to proceed?'; 
  @Output() confirmed = new EventEmitter<boolean>();

  onNoClick(): void {
    this.confirmed.emit(false);
  }

  onYesClick(): void {
    this.confirmed.emit(true);
  }
}
