import { Component, inject } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import { HeaderActions } from "../header-actions/header-actions";
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../store';
import { MatIconButton } from '@angular/material/button';
 
@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions, RouterLink, MatIcon,MatIconButton],
  template: `
  <mat-toolbar class="w-full shadow-md py-2"> 
    <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between"> 
      <div class="flex items-center gap-4" style="cursor: pointer;">
        <button matIconButton class="iconButton" (click)="store.toggleMenuSidebar()">
          <mat-icon>menu</mat-icon>
        </button>
        <span routerLink="/products/all">UrbanKart</span> 
      </div>
      <div class="w-150 flex items-center bg-white border-gray-200 rounded-lg px-4 py-1 shadow-sm ">
        <mat-icon class="mr-2">search</mat-icon>
        <input #searchInput type="text" placeholder="Search products..." (change)="store.setSearchQuery($event.target.value)" class="flex-1 bg-transparent outline-none text-gray-700 text-sm placeholder-gray-400"  >
        <button matIconButton class="iconButton" (click)="store.setSearchQuery('') ; searchInput.value = ''">
        @if (searchInput.value!='') {
            <mat-icon>close</mat-icon>
          }
        </button>
      </div>
       <app-header-actions></app-header-actions>
    </div> 
  </mat-toolbar>
  
  `,
  styles: `
  
  `,
})
export class Header {

  store = inject(EcommerceStore);
}
