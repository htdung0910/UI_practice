import { Component, EventEmitter, Input, Output, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements AfterViewInit {
  @Input() title: string = ''; 
  @Output() close = new EventEmitter<void>(); 

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const overlay = this.el.nativeElement.querySelector('.popup-overlay');
    overlay.addEventListener('click', () => this.onOverlayClick());
  }

  onDialogClick(event: MouseEvent): void {
    event.stopPropagation();  
  }

  onOverlayClick(): void {
    this.close.emit(); 
  }
}
