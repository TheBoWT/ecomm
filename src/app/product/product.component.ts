import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  map } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { CartService } from '../shared/cart.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
product;
user;
currentImg = 0;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService) { }

  ngOnInit(): void {
  /*    this.authService.afAuth.user.subscribe(user=>{
      user = user;   
    });  */

    const id = this.route.snapshot.params['id'];
    this.productService.getProduct(id);
    

    this.productService.getMenProduct().pipe(
      map(prods => prods.find(p=> p.id === id))
    )
    .subscribe(product=>{
      this.product = product
    })
  }
  
  addToCart(product){    
    this.cartService.addItem(product);
  }


}
