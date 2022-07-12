import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        this.customValidator,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  customValidator(control: FormControl): { [name: string]: boolean } | null {
    const value: string = control.value;

    if (value.includes(' ')) {
      return { spaceIsNotAllowed: true };
    }
    if (value.includes('-')) {
      return { dashIsNotAllowed: true };
    }

    return null;
  }

  submit() {
    console.log(this.form.value);
  }
}
