import { Component, computed, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../store';
import { Product } from '../../layout/models/product';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toggle-wislist-button',
  imports: [MatIcon,MatIconButton],
  template: `
    <button class="w-10 h-10 rounded-full border-0 flex items-center justify-center  " 
      [class]="isInWishlist() ? '!text-red-500' : '!text-gray-400'"
      matIconButton (click)="toggleWishlist(product())">
        <mat-icon>{{isInWishlist() ? 'favorite' : 'favorite_border'}}</mat-icon>
      </button>
  `,
  styles: ``,
})
export class ToggleWislistButton {

  product=input.required<Product>()

  store=inject(EcommerceStore);

  isInWishlist= computed(()=>this.store.wishlistItems().find(p=>p.id=== this.product().id))
  toggleWishlist(product:Product){
    if(this.isInWishlist()){
      this.store.removeFromWishlist(product);
    }else{
      this.store.addToWishlist(product)
    }
  }
}
