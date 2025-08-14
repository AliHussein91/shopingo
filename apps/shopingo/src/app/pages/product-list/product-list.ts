import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api'; // Adjust the import path as necessary
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProgressSpinnerModule, DataViewModule, ButtonModule, RatingModule, CommonModule, AsyncPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent {
  private apiService = inject(ApiService);
  products$!: Observable<any[]>;

  ngOnInit(): void {
    this.products$ = this.apiService.getProducts();
  }
}
