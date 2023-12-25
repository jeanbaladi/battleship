import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  public showNotification(
    value: string, 
    action: string = 'close',
    duration: number = 4 * 1000,
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    horizontalPosition: MatSnackBarHorizontalPosition  = 'start',
  ){
    this._snackBar.open(`${value}`, action, {
      duration,
      verticalPosition,
      horizontalPosition
    });
  }
}
