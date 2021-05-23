import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:any = [];
  constructor(private productService: ProductService) {
    
   }

  ngOnInit(): void {
    
    this.productService.getMenProduct().subscribe(prod=>{
      this.products = prod;
    })
    
  }
  

}
