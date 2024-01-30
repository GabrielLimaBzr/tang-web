import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterUser } from 'src/app/models/registerUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent{

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  create: RegisterUser = {
    login: "",
    passphrase: "",
    email: "",
    name: ""
  };


  password: string;

  @Input() visible = false;
  @Output() okClicked = new EventEmitter<void>();

  isLoading: boolean = false;

  register() {
    this.isLoading = true
    if(this.create.passphrase != this.password){
      this.isLoading = false
      this.messageService.add({ severity: 'error', summary: 'Precisa repetir a mesma senhaaaaaaa', detail: "As senhas não confere",  life: 4000});
      return
    }
    this.authService.register(this.create).subscribe((response) => {
      setTimeout(() => {
        this.visible = false
        this.isLoading = false
        this.limparForm()
        this.messageService.add({ severity: 'success', summary: 'Logado', detail: 'Usuário registrado com sucesso!' });
      }, 1000);
    },
      (error) => {
        setTimeout(() => {
          this.isLoading = false
          let errorMsg = `Status: ${error.status} Message: ${error.error.message}` 

          this.messageService.add({ severity: 'error', summary: 'Error ao registrar usuário', detail: errorMsg,  life: 7000});

        }, 1000);

      }
    )
  }

  limparForm(){
    this.password =""
    this.create = {
      login: "",
      passphrase: "",
      email: "",
      name: ""
    };
  }
}
