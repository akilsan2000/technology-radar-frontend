import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../_models';
import { AuthService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  loginInValid: boolean = false;
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(data: any){
    this.loginInValid = false;
    if(this.loginForm.invalid){
      return;
    }
    console.log("Submit: ", data);

    this.authService
      .login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
      .subscribe({
        next : response => {
          this.loginInValid = false;
          const returnUrl = this.authService.userValue?.role==Role.CTO ? '/administration' : '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: e => {
          this.loginInValid = true;
        }
      });

  }
}
