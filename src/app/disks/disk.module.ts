import { AngularMaterialModule } from '../angular-material.module';
import { NgModule } from '@angular/core';
import { DiskCreateComponent } from './disk-create/disk-create.component';
import { DiskListComponent } from './disk-list/disk-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DiskCreateComponent,
        DiskListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        AngularMaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        DiskCreateComponent,
        DiskListComponent
    ]
})
export class DiskModule {}
