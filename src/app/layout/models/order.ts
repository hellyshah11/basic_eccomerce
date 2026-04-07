import { Cart } from "./cart";

export type Order={
    id:string;
    userId:string;
    total:Number;
    items: Cart[];
    paymentStatus:'Success' | 'Failure'
}