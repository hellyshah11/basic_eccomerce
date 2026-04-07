import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from "../../directives/view-panel";
import { EcommerceStore } from '../../store';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel],
  template: `
   <div appViewPanel>
    <h2 class="text-2xl font-bold mb-4">Order summary</h2>

    <div class="spcae-y-2  pb-4">
      <ng-content select="[checkoutItems]"></ng-content>
    </div>
    <div class="space-y-3 text-lg pt-4 border-t">
      <div class="flex justify-between">
        <span>Subtotal</span>
        <span>\${{subtotal()}}</span>
      </div>
      <div class="flex justify-between">
        <span>Tax</span>
        <span>\${{tax()}}</span>
      </div>
      <div class="flex justify-between font-bold border-t pt-3 font-bold text-lg">
        <span>Total</span>
        <span>\${{total()}}</span>
      </div>
    </div>

    <ng-content select="[actionButtons]"></ng-content>
   </div>
  `,
  styles: ``,
})
export class SummarizeOrder {
store = inject(EcommerceStore);
subtotal = computed(() => 
  Math.round(this.store.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0))
);
tax= computed(()=> 
  Math.round(this.subtotal() * 0.05)
);
total = computed(()=> (this.subtotal() - this.tax()));
}
