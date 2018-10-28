import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SudokuModel } from './sudoku.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  arr = []
  arr1 = [];
  numberOfRows: number;
  numberOfColumns: number;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
    let randomData =  new SudokuModel().arr;
    let index = randomData.findIndex(x => x.id === 0);
    if (index !== -1) {
      this.arr = randomData[index].data;
      this.numberOfRows = this.arr.length;
      this.numberOfColumns = this.arr.length;
      console.log(this.numberOfColumns);
      this.arr1 = this.getDeepCloneArrData(this.arr);
    }
    
    // let index= Math.floor(Math.random() * (10 - 0) + 0);
  }

  initToDefaultArr() {
    this.arr = this.getDeepCloneArrData(this.arr1);
  }

  totalArray() {
    let isFilled = true;
    let dummyArr = this.getDeepCloneArrData(this.arr);
    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        let eachValue = (<HTMLInputElement>document.getElementById(i.toString() + j.toString())).value;
        if (eachValue !== '') {
          dummyArr[i][j] = eachValue;
        } else {
          this.showErrorMessage('Error', 'Please fill all the boxes', false);
          isFilled = false;
          break;
        }
      }
      if (!isFilled) {
        break;
      }
    }
    if (isFilled) {
      this.arr = this.getDeepCloneArrData(dummyArr);
      this.finalResult();
    }
  }

  finalResult() {
    let isValidSudoko = this.validateMatrix(this.getDeepCloneArrData(this.arr));
    if (isValidSudoko === true) {
      let transposeArr = this.transposeMatrix(this.getDeepCloneArrData(this.arr));
      isValidSudoko = this.validateMatrix(this.getDeepCloneArrData(transposeArr));
      if (isValidSudoko === true) {
        this.showErrorMessage('Success', 'You won the Game', true);
        
      } else {
        this.showErrorMessage('Error', 'You lost the game. Please try again', true);
      }
    } else {
      this.showErrorMessage('Error', 'You lost the game. Please try again', true);
    }
  }


  getDeepCloneArrData(originalData) {
    return JSON.parse(JSON.stringify(originalData));
  }

  validateMatrix(validateArr) {
    let isValidSudok = false;
    for (let i = 0; i < validateArr.length; i++) {
      if (this.getIsDuplicate(validateArr[i])) {
        isValidSudok = false;
        break;
      } else {
        isValidSudok = true;
      }
    }
    return isValidSudok;
  }

  transposeMatrix(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < i; j++) {
        //swap element[i,j] and element[j,i]
        var temp = arr[i][j];
        arr[i][j] = arr[j][i];
        arr[j][i] = temp;
      }
    }
    return arr;
  }

  showErrorMessage(title: string, message: string, reassign: boolean) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,      
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            if (reassign) {
              this.arr = this.getDeepCloneArrData(this.arr1);
            }
          }
        }
      ]
    });
    alert.present();
  }

  getIsDuplicate(arr) {
    for (var i = 0; i <= arr.length; i++) {
      for (var j = i; j <= arr.length; j++) {
        if (i != j && arr[i] == arr[j]) {
          return true;
        }
      }
    }
    return false;
  }
}
