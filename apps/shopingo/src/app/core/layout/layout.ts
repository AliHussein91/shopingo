import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule, ToolbarModule, ButtonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {

}
