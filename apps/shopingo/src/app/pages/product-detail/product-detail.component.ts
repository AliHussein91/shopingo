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
  product$!: Observable<any>;

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.apiService.getProductById(id);
      })
    );
  }
}