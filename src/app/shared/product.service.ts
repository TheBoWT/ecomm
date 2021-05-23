import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Product{
  name:string
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private productsCollection: AngularFirestoreCollection<any>;
private cartsCollection: AngularFirestoreCollection<any>;
products:Observable<Product[]>;

  constructor(private afs: AngularFirestore) { 
    this.productsCollection = afs.collection<Product>('products');
    this.cartsCollection = afs.collection('cart');
    
    
  }

  getMenProduct(){
    return this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getProduct(id:number){
    return this.productsCollection.snapshotChanges();
  }


}
