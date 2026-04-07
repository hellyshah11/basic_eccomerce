import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../layout/models/product';
import { ProductCard } from "../../components/product-card/product-card";
import{ MatSidenav , MatSidenavContainer , MatSidenavContent} from "@angular/material/sidenav"
import { MatNavList, MatListItem, MatListItemIcon, MatListItemTitle } from "@angular/material/list"
import { RouterLink } from "@angular/router";
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../store';
import { ToggleWislistButton } from "../../components/toggle-wislist-button/toggle-wislist-button";

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenav, MatSidenavContainer, MatSidenavContent, MatNavList, MatListItem, MatListItemTitle, RouterLink, TitleCasePipe, ToggleWislistButton],
  template: `

  <mat-sidenav-container>
    <mat-sidenav mode="side" opened="true">
      <div class="p-6">
        <h2 class="text-lg text-gray-900">Categories</h2>

        <mat-nav-list>
          @for (list of categories();track list){
            <mat-list-item class="my-2" [activated]="list === category() " [routerLink]="['/products',list]">
              <span matListItemTitle class="font-medium"  >{{list | titlecase}}</span>
            </mat-list-item>
          }
        </mat-nav-list>
      </div>
  </mat-sidenav>
    <mat-sidenav-content class="bg-gray-100 p-6 h-full">
      
      <h1 class="text-2xl font-bold text-gray-900 mb-2">{{category() | titlecase}}</h1>

      <p class="text-base textgray-600 mb-6">{{ store.filteredProducts().length}} products found</p>
      <div class="responsive-grid">
       @for (product of store.filteredProducts(); track product.id) {
        <app-product-card [product]="product" (addToCartClicked)="addToCart($event)">
          <app-toggle-wislist-button class="!absolute z-10 top-3 right-3 !bg-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
           [product] = "product" [style.view-transition-name]="'wishlist-button-' + product.id"></app-toggle-wislist-button> 
        </app-product-card>
       }</div>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: `
  
.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated {
  background-color: var(--mat-sys-primary);
  border-radius: 6px;
}
.mat-mdc-list-item.mdc-list-item--activated .mdc-list-item__primary-text{
  color: white;
}
  `,
})
export default class ProductsGrid {

  category = input<string>('all');
  
  store = inject(EcommerceStore);

  categories = signal<string[]>(["All","Electronics","Clothing","Accessories","Home"])

  addToCart(event:any){
    console.log(event,'event');
    
  }

  constructor(){
    this.store.setCategory(this.category)
  }
}
