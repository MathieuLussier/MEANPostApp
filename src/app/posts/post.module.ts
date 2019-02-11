import { AngularMaterialModule } from './../angular-material.module';
import { NgModule } from '@angular/core';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        PostCreateComponent,
        PostListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        AngularMaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        PostCreateComponent,
        PostListComponent
    ]
})
export class PostModule {}
