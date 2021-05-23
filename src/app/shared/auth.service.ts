import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
usersCollection: AngularFirestoreCollection<any>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    this.usersCollection = afs.collection('users');
    
  }
 

  getUserName(id: string){
    return this.usersCollection.doc(id).valueChanges();
      
  
  }

  SignUp(userData){
    const { email, password, name } = userData;
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(res=>{  
      this.usersCollection.doc(res.user.uid).set({
        name: name,
        address:{
          street: '123 example Ave',
          city: 'Columbus',
          state: 'OH',
          zip: '43219'
        }
      });
    }) ;  
  }

  SignIn(userData){
    const { email, password } = userData;
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }
}


