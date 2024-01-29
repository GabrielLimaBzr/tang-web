import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  cred: Credenciais = {
    login: "",
    passphrase: "",
  };

  @Input() visible = false;
  @Output() okClicked = new EventEmitter<void>();

  onDialogShow(): void {
  }

  onDialogHide(): void {
  }

  onOkClick(): void {
    this.okClicked.emit();
    this.visible = false;
  }

  username = new FormControl(null, Validators.maxLength(100));
  password = new FormControl(null, Validators.minLength(3));

  login() {
    this.authService.autenticar(this.cred).subscribe(
      (response) => {
        console.log(response);
        
        this.authService.successfulLogin(response.substring(7));
        console.log('logou');

        /* setTimeout(() => {
          this.router.navigate(["/home"]);
        }, 3000); */
      },
      () => {
        console.log('n logou');

      }
    );

  }

}
