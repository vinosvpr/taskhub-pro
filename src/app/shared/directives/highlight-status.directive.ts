import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightStatus]',
  standalone: true,
})
export class HighlightStatusDirective implements OnInit {
  @Input()
  appHighlightStatus = '';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appHighlightStatus === 'Completed') {
      this.el.nativeElement.style.color = 'green';
    } else {
      this.el.nativeElement.style.color = 'orange';
    }
  }
}
