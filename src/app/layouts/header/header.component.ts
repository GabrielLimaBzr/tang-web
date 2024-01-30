import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AppService } from 'src/app/app.service';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {
  isLoading: boolean = false;

  @ViewChild('loginModal') loginModal?: LoginComponent;

  items: MenuItem[] | undefined;

  loginModalVisible = false;

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private messageService: MessageService, private appService: AppService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAutenticado();
    this.authService.getLoginStatus().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      this.configurarItensMenu();
    });

    this.configurarItensMenu();
  }


  showLogin(): void {
    this.loginModalVisible = true;
    if (this.loginModal) {
      this.loginModal.visible = true;
    }
  }

  hideLoginModal(): void {
    this.loginModalVisible = false;
    if (this.loginModal) {
      this.loginModal.visible = false;
    }
  }

  logout() {
    this.isLoading = true
    setTimeout(() => {
      this.authService.logout();
      this.messageService.add({ severity: 'success', summary: 'Usuário Desconectado', detail: 'Vou sentir sua falta 😭' });
      this.isLoading = false
    }, 1000);
  }

  darkMode(id: string){
    this.appService.switchTheme(id);

  }

  lightMode(id: string){
    this.appService.switchTheme(id);
  }


  private configurarItensMenu(): void {
    this.items = [
      {
        label: 'Temas',
        items: [
          {
            label: 'Do Batman',
            command: () => {
              this.darkMode('arya-orange')
            }
          },
          {
            label: 'Puro Roxo',
            command: () => {
              this.lightMode('lara-light-purple')
            }
          }
        ]
      },
      {
        label: 'Usuário',
        items: [
          {
            label: 'Sair',
            icon: 'pi pi-power-off',
            visible: this.isLoggedIn,
            disabled: this.isLoading,
            command: () => {
              this.logout();
            }
          },
        ]
      }
    ];
  }
}

