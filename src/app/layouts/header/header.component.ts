import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from 'src/app/components/auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  loginModalVisible = false;

  @ViewChild('loginModal') loginModal?: LoginComponent;

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
}
