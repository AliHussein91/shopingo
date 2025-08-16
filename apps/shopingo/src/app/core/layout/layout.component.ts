import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../auth.service';
import { ToastModule } from 'primeng/toast';
import { CartService } from '../cart.service';
import { BadgeModule, BadgeDirective } from 'primeng/badge';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule, ToolbarModule, ButtonModule, ToastModule, BadgeDirective],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);
  logout() {
    this.authService.logout();
  }
}
