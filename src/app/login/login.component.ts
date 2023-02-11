import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  submitted:boolean=false;

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
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    console.log("Submit: ", data);

    this.authService
      .login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
      .subscribe(response => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      });

  }
}
