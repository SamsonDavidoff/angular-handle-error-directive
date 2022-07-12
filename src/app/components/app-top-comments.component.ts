import { Component } from '@angular/core';

@Component({
  selector: 'app-top-comments',
  template: `
    <h3>فرم ورود به حساب کاربری</h3>
    <p>در این فرم جهت تست:</p>
    <ul>
      <li>
        <h4>اگه هر سه فیلد خالی بمونن خطا می‌گیرید</h4>
      </li>
      <li>
        <h4>اگه در فیلد نام کاربری فاصله و خط تیره باشه خطا می‌گیرید</h4>
      </li>
      <li>
        <h4>اگه فیلد کلمه عبور کمتر از ۵ کاراکتر باشه خطا می‌گیرید</h4>
      </li>
    </ul>
    <hr />
  `,
})
export class AppTopComments {}
