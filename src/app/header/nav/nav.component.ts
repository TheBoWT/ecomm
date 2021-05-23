import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, map, mergeMap, retry, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';
import { CartService } from 'src/app/shared/cart.service';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
navToggle = false;
user:any;
cartItem: number;
userName:string;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router) {}

  ngOnInit(): void {    
    this.cartService.cartItems.subscribe(cartItem=>{
      this.cartItem = cartItem.length;        
    });

    this.authService.afAuth.authState.pipe(
      map(user=>{
        if(user){
          const id = user.uid;
          this.user = user;
          return id;
        }
        
      }),
      switchMap(id => this.authService.usersCollection.doc(id).valueChanges())
    ).subscribe((data)=>{
      if(data)this.userName = data.name;
    });
     
  }

logout(){
  this.authService.afAuth.signOut().then((res)=>{
    this.user = res;
    this.router.navigate(['']);
  })
}
}
