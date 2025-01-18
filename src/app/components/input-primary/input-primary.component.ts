import { Component, forwardRef, Input, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type InputTypes = "text" | "email" | "password"

@Component({
  selector: 'app-input-primary',
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPrimaryComponent),
      multi: true,
    },
  ],
  templateUrl: './input-primary.component.html',
  styleUrl: './input-primary.component.scss',
})
export class InputPrimaryComponent implements ControlValueAccessor {
  @Input() type: InputTypes = 'text';
  @Input() InputName: string = '';
  @Input() placeHolder: string = '';
  @Input() label: string = '';

  value: string = '';

  onChange: any = () => {};
  onTouch: any = () => {};

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
