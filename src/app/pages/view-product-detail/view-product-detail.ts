import { Component, computed, inject, input, signal } from '@angular/core';
import { EcommerceState, EcommerceStore } from '../../store';
import { BackButton } from "../../components/back-button/back-button";
import { ProductInfo } from "./product-info/product-info";
import { Reviews } from "./reviews/reviews";

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton, ProductInfo, Reviews],
  template: `
    <div class="mx-auto max-w-[1200px] py-6">
      <app-back-button class="mb-6" [navigateTo]="backRoute()">Continue Shopping</app-back-button>
      @if (store.selectedProdct(); as product) {
        <div class="flex gap-8 mb-8">
          <img [src]="product.imageUrl" class="w-[500px] h-[550px] object-cover rounded-lg" 
          [style.view-transition-name]="'product-image-'+product.id" />
          <div class="flex-1">
            <app-product-info [product]="product"></app-product-info>
          </div>
        </div>

        <app-reviews [product]="product"></app-reviews>
      }
    </div>
  `,
  styles: ``,
})
export default class ViewProductDetail {
productId = input.required<string>();
store = inject(EcommerceStore);

constructor(){
  this.store.setProductId(this.productId);
}
backRoute =computed(()=>`/products/${this.store.category()}`)
}
