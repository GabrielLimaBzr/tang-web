import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Credenciais } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  cred: Credenciais = {
    login: "",
    passphrase: "",
  };

  @Input() visible = false;
  @Output() okClicked = new EventEmitter<void>();

  isLoading: boolean = false;

  onOkClick(): void {
    this.okClicked.emit();
    this.visible = false;
  }

  login() {
    this.isLoading = true
    this.authService.autenticar(this.cred).subscribe(
      (response) => {
        this.authService.successfulLogin(response);
        setTimeout(() => {
          this.visible = false
          this.isLoading = false
          this.messageService.add({ severity: 'success', summary: 'Logado', detail: 'Usuário logado com sucesso!' });
        }, 1000);
      },
      () => {
        setTimeout(() =>{
          this.isLoading = false
          this.messageService.add({ severity: 'error', summary: 'Error ao fazer login', detail: 'Usuário e/ou senha inválidos!' });
        }, 1000)
        this.cred.login = ""
        this.cred.passphrase = ""
      }
    );

  }

}
