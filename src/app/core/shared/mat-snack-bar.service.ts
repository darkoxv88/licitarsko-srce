import { Injectable } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
  SimpleSnackBar
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MatSnackBarService {

  public horizontalPosition: MatSnackBarHorizontalPosition;
  public verticalPosition: MatSnackBarVerticalPosition;
  private snackBarAutoHide: number;
  private snackBarRef: MatSnackBarRef<SimpleSnackBar> | null;

  constructor(public snackBar: MatSnackBar) {
    this.horizontalPosition = 'right';
    this.verticalPosition = 'bottom';
    this.snackBarAutoHide = 5000;
    this.snackBarRef = null;
  }

  public openSnackBar(message: string, type: 'error' | 'neutral' | 'primary' | null | undefined, action: string = 'Zatvori'): void {
    let snackBarConfig: MatSnackBarConfig;

    if (!type) type = 'neutral';

    snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.horizontalPosition = this.horizontalPosition;
    snackBarConfig.verticalPosition = this.verticalPosition;
    snackBarConfig.duration = this.snackBarAutoHide;
    snackBarConfig.panelClass = [ 'mat-toolbar', 'app-mat-snackbar-' + type ];

    this.snackBarRef = this.snackBar.open(message, action, snackBarConfig);
  }

  public dismiss(): void {
    try {
      if (this.snackBarRef) this.snackBarRef.dismiss();
    } catch(err) { }

    this.snackBarRef = null;
  }

}
