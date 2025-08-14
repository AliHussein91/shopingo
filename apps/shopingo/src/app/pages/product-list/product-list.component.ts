import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service'; // Adjust the import path as necessary
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ProgressSpinnerModule, DataViewModule, ButtonModule, RatingModule, CommonModule, AsyncPipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private apiService = inject(ApiService);
  products$!: Observable<any[]>;

  ngOnInit(): void {
    this.products$ = this.apiService.getProducts();
  }
}
