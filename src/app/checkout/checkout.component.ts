import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
address: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.afAuth.authState.pipe(
      map(user=>{
        if(user) return user.uid
      }),
      switchMap(id => this.authService.usersCollection.doc(id).valueChanges())
    ).subscribe((userData)=>{
      this.address = userData.address;
    });
    
    
  }

}
