import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialImports } from '../../../../shared/material.imports';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-user-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MaterialImports,
  ],
  templateUrl: './dialog-user-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogUserCreateComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-user-create.component.html',
  imports: [...MaterialImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {}