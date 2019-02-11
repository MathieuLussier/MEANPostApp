import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from './../angular-material.module';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent,
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}
