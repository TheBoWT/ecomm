import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  imgUrls:string;
  currentImg: number;
  constructor(public dialogRef: MatDialogRef<OverlayComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.imgUrls = this.data.imgUrl;
    this.currentImg = this.data.index;
  }

  onClose(arg){
    if(arg == null){
      this.dialogRef.close();
      return;
    }

    const windowSize = arg.target.innerWidth;
    if(windowSize < 520 )
      this.dialogRef.close();
  }

  prevImg(){ 
    if(this.currentImg == 0) return;

    this.currentImg--;
  }
  nextImg(){
    if(this.imgUrls.length == this.currentImg + 1) return;
      
    this.currentImg++;
  }

}
