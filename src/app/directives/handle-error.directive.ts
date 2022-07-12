import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { formControlError } from '../validation/form-errors';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[handleError]',
})
export class HandleErrorDirective implements OnInit, OnDestroy {
  @Input('handleError') formControl!: FormControl;

  @Input() set handleErrorStyle(styles: string) {
    this._styles = this.getSafeStyle(styles);

    if (typeof this.spanElement !== 'undefined') {
      this.renderer.setAttribute(this.spanElement, 'style', this._styles);
    }
  }

  @Input() set handleErrorClass(classes: string) {
    this._classes = classes;

    if (typeof this.spanElement !== 'undefined') {
      this.renderer.setAttribute(this.spanElement, 'class', this._classes);
    }
  }

  @Input() set handleErrorMessage(message: string) {
    this._customErrorMessage = message;
  }

  private spanElement!: any;
  private _styles: string = '';
  private _classes: string = '';
  private _customErrorMessage: string | null = null;
  private errorMessage: string | null = null;
  private disposeBlurEvent!: Function;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {
    viewContainerRef.createEmbeddedView(templateRef);
  }

  ngOnInit() {
    const currentElement =
      this.templateRef.elementRef.nativeElement.previousSibling;
    this.createSpan();
    this.disposeBlurEvent = this.renderer.listen(currentElement, 'blur', () => {
      this.checkError();
    });
    this.formControl?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.checkError());
  }

  checkError() {
    if (this.controlHasError()) {
      this.errorMessage =
        this._customErrorMessage === null
          ? this.controlError
          : this._customErrorMessage;
      this.showSpan();
    } else {
      this.errorMessage = null;
      this.hideSpan();
    }
  }

  controlHasError() {
    return (
      this.formControl.touched &&
      this.formControl.invalid &&
      this.formControl.errors
    );
  }

  get controlError(): string {
    const errorCode = Object.keys(
      this.formControl.errors as ValidationErrors
    )[0];
    return formControlError.hasOwnProperty(errorCode)
      ? formControlError[errorCode]
      : 'مقدار وارد شده معتبر نیست';
  }

  createSpan() {
    this.spanElement = this.renderer.createElement('span');

    this.renderer.setAttribute(
      this.spanElement,
      'style',
      this.getSafeStyle(this._styles, 'display: none !important')
    );
    this.renderer.setAttribute(this.spanElement, 'class', this._classes);
    this.renderer.insertBefore(
      this.elementRef.nativeElement.parentNode,
      this.spanElement,
      this.elementRef.nativeElement
    );
  }

  showSpan() {
    this.renderer.setProperty(this.spanElement, 'innerText', this.errorMessage);
    this.renderer.setAttribute(
      this.spanElement,
      'style',
      this.getSafeStyle(this._styles, 'display: block !important')
    );
  }

  hideSpan() {
    this.renderer.setAttribute(
      this.spanElement,
      'style',
      this.getSafeStyle(this._styles, 'display: none !important')
    );
  }

  getSafeStyle(style: string, additionalStyle = ''): string {
    let styles = style
      .split(';')
      .filter((i) => !i.includes('display'))
      .join(';');
    if (styles.trim().endsWith(';')) {
      styles += additionalStyle;
    } else {
      styles += `; ${additionalStyle}`;
    }

    return styles;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.disposeBlurEvent();
  }
}
