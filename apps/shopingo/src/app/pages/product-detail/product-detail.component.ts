import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { CartService } from '../../core/cart.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ButtonModule, CardModule, GalleriaModule, TagModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private cartService = inject(CartService)
  private messageService = inject(MessageService);
  product$!: Observable<any>;

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.apiService.getProductById(id);
      })
    );
  }

  addToCart(product: any) {
    this.cartService.addItem(product);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `${product.name_en} added to cart`,
    });
  }
}