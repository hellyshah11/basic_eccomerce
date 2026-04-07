import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptionItem } from '../../../layout/models/optionItem';
import { ViewPanel } from "../../../directives/view-panel";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import { MatAnchor, MatButton } from "@angular/material/button";
import { EcommerceStore } from '../../../store';
import { MatInput } from '@angular/material/input';
import { addUserReview } from '../../../layout/models/user-review';
@Component({
  selector: 'app-write-review',
  imports: [ViewPanel, MatFormField, MatLabel, MatSelect, MatOption, MatAnchor,ReactiveFormsModule,MatButton,MatInput],
  template: `
    <div appViewPanel>
      <h2 class="text-xl font-semibold mb-6">Write a Review</h2>
      <form [formGroup]="reviewForm" (ngSubmit)="saveReview()">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <mat-form-field>
            <mat-label>Review Title</mat-label>
            <input matInput formControlName="title" placeholder="Summarize your review " type="text"/>
          </mat-form-field>
          <mat-form-field>
            <mat-select formControlName="rating">
              @for (option of ratingOptions(); track option.value) {
                <mat-option [value]="option.value">
                  {{ option.label }}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field class="col-span-2">
            <mat-label>Review</mat-label>
            <textarea matInput formControlName="comment" placeholder="Share your experience with this product" type="text" rows="4"></textarea>
          </mat-form-field>
        </div>

        <div class="flex gap-4">
          <button matButton="filled" type="submit" [disabled]="store.loading()" style="border-radius: 6px;">
            {{store.loading() ? 'Saving...' : 'Submit Review'}}
          </button>
          <button matButton="outlined" type="button" (click)="store.hideWriteReview()" style="border-radius: 6px;">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: `
  ::ng-deep .mdc-notched-outline__notch{
    border-right: 0 !important;
  }
`,
host:{
  class:'block'
}
})
export class WriteReview {

  fb= inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);

  ratingOptions = signal<OptionItem[]>([
    {label:'5 Stars - Excellent',value:5},
    {label:'4 Stars - Good',value:4},
    {label:'3 Stars - Average',value:3},
    {label:'2 Stars - Poor',value:2},
    {label:'1 Star - Very Poor',value:1},
  ]);
  
  reviewForm= this.fb.group({
    title: ['',Validators.required],
    comment: ['',Validators.required],
    rating: [5,Validators.required],
  });

  saveReview(){
    if(!this.reviewForm.valid){
      this.reviewForm.markAllAsTouched();
      return;
    }

    const{title,comment,rating} = this.reviewForm.value;
    this.store.addReview({title,comment,rating} as addUserReview);
  }
}
