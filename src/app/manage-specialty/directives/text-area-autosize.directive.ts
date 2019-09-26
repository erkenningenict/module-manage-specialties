import {
  AfterContentChecked,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: 'textarea[beAutosize]',
})
export class TextAreaAutosizeDirective implements AfterContentChecked {
  constructor(public element: ElementRef) {}

  @HostListener('input', ['$event.target'])
  public onInput() {
    this.resize();
  }
  // @HostListener('click', ['$event.target'])
  // public onClick() {
  //   this.resize();
  // }

  public ngAfterContentChecked() {
    this.resize();
  }

  public resize() {
    const style = this.element.nativeElement.style;
    style.overflow = 'hidden';
    style.height = 'auto';
    const height = this.element.nativeElement.scrollHeight;
    style.height = `${height}px`;
  }
}
