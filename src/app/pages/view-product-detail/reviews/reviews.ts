import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../layout/models/product';
import { ViewPanel } from "../../../directives/view-panel";
import { RatingSummary } from "../rating-summary/rating-summary";
import { ViewReviewItem } from "../view-review-item/view-review-item";
import { MatAnchor, MatButton } from "@angular/material/button";
import { EcommerceStore } from '../../../store';
import { WriteReview } from "../write-review/write-review";

@Component({
  selector: 'app-reviews',
  imports: [ViewPanel, RatingSummary, ViewReviewItem, MatAnchor, MatButton, WriteReview],
  template: `
    <div appViewPanel>
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-semibold text-xl">Customer Reviews</h2>
        @if (store.user()) {
          <button matButton="filled" style="border-radius: 6px;" (click)="store.showWriteReview()">Write a Review</button>
        }
      </div>
      @if (store.writeReview()) {
        <app-write-review class="mb-6"></app-write-review>
      }
      <app-rating-summary [product]="product()"></app-rating-summary>
      <div class="flex flex-col gap-6">
        @for (review of sortedReviews(); track review.id ) {
          <app-view-review-item [review]="review"></app-view-review-item>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class Reviews {
  store= inject(EcommerceStore);
product=input.required<Product>();

sortedReviews = computed(()=>{
  return [...this.product().reviews].sort((a,b)=> new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime())    
});      
}
