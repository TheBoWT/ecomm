import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {  map } from 'rxjs/operators';
import { OverlayComponent } from '../overlay/overlay.component';
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
    public dialog: MatDialog) { }

  ngOnInit(): void {
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


  onOverlay(data, i){
    if(window.innerWidth < 600) return;
      this.dialog.open(OverlayComponent, { 
        width: '100%',
        height:'100%',
        
        data: { imgUrl: data, index: i }
    });

   }


}
