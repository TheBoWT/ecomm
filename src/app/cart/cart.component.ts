import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems:number;
  items = [];
  total:number;
  user:any;

  constructor(
    private cartService: CartService, 
    private router: Router,
    private authService: AuthService) {   
    }




  ngOnInit(): void {
    this.items = this.cartService.getCartData();
    if(this.items) this.getTotal(this.items); 
    this.cartService.cartItems.subscribe(data=>{
      this.items = data;  
    });
     
  }



  validateInput(event:any, i:number){
    const qty = +event.target.value;
    if(qty < 1) {  
    event.target.value = this.items[i].qty;
    return;
    }
    
    this.QtyUpdated(qty, i)
    
  }
  
  private QtyUpdated(qty:number, i:number){
    this.items[i].qty = qty;

    this.cartService.setCartData(this.items);
    
    this.getTotal(this.items);
  }
  

   getTotal(data:any){     
    let subs = 0 ;
       
    for (const item of data) 
      subs += item.price * item.qty;
   
      this.total = subs;
  } 

 
  onDelete(i:number){
    this.items.splice(i, 1);
    this.cartService.setCartData(this.items); 
    this.getTotal(this.items);
  }

  onCheckout(){
    this.authService.afAuth.user.subscribe(user=>{
      if(!user)
        this.router.navigate(['/signin']);
      else
      this.router.navigate(['/checkout']);
    }) 
    
  }


}
