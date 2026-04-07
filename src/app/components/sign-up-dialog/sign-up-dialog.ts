import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule, MatIconButton } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../store';
import { SignUpParams } from '../../layout/models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatIcon,
    MatFormField,
    MatInput,
    MatSuffix,
    MatPrefix,
    MatDialogClose,
    MatIconButton,
    MatButton,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-8 min-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign Up</h2>
          <p>Join us and start shopping today</p>
        </div>
        <button
          tabindex="-1"
          matIconButton
          class="-mt-2 -mr-2"
          mat-dialog-close
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form [formGroup]="signUpForm" class="mt-6 flex flex-col" (ngSubmit)="signUp()">
        <mat-form-field class="w-full mb-4">
          <input
            matInput
            formControlName="name"
            type="text"
            placeholder="Enter your name"
          />
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
        <mat-form-field class="w-full mb-4">
          <input
            matInput
            formControlName="email"
            type="email"
            placeholder="Enter your email"
          />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="w-full mb-4">
          <input
            matInput
            formControlName="password"
            placeholder="Enter your password"
            type="password"
          />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <mat-form-field class="w-full mb-4">
          <input
            matInput
            formControlName="confirmPassword"
            placeholder="Enter your password"
            type="password"
          />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <button
          type="submit"
          matButton="filled"
          class="w-full"
          style="border-radius: 6px;"
          >
          <!-- [disabled]="store.loading()" -->
           Create Account
          <!-- {{store.loading() ? 'Creating Account...' : 'Create Account'}} -->
        </button>
      </form>
      <p class="text-sm text-gray-500 mt-2 text-center">
        Already have an account? 
        <a class="text-blue-600 cursor-pointer" (click)="openSignInDialog()">Sign Up</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  store=inject(EcommerceStore);
  fb = inject(NonNullableFormBuilder);

  dialogRef =inject(MatDialogRef);
  data= inject<{checkout:boolean}>(MAT_DIALOG_DATA);
  matDialog= inject(MatDialog);

  signUpForm = this.fb.group({
    name: ['John Doe', Validators.required],
    email: ['john@test.com', Validators.required],
    password: ['john@123', Validators.required],
    confirmPassword: ['john@123', Validators.required],
  });

  signUp(){
    if(!this.signUpForm.valid){
      this.signUpForm.markAllAsTouched();
      return
    }
    const{email,password,name} = this.signUpForm.value
    this.store.signUp({email,password,name,dialogId:this.dialogRef.id,checkout: this.data?.checkout}as SignUpParams)
  }

  openSignInDialog(){
    this.dialogRef.close();
    this.matDialog.open(SignInDialog,{
      disableClose:true,
      data:{
        checkout:this.data?.checkout
      }
    })
  }
}
