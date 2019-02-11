import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DisksService } from '../disks.service';
import { Disk } from '../disk.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';

declare let $;

@Component({
  selector: 'app-disk-create',
  templateUrl: './disk-create.component.html',
  styleUrls: ['./disk-create.component.css']
})
export class DiskCreateComponent implements OnInit, OnDestroy {
  private mode = 'create';
  private diskId: string;
  public disk: Disk;
  public isLoading = false;
  public form: FormGroup;
  public imagePreview: any;
  private authStatusSub: Subscription;

  constructor(public disksService: DisksService, public route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    $('body').css('background-color', '#ffffff');
    $('body').css('background-image', 'none');
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [
        Validators.required,
        Validators.minLength(3)
      ]}),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('diskId')) {
        this.mode = 'edit';
        this.diskId = paramMap.get('diskId');
        this.isLoading = true;
        this.disksService.getDisk(this.diskId).subscribe(diskData => {
          this.isLoading = false;
          // this.disk = {
          //   id: diskData._id, title: diskData.title, content: diskData.content, imagePath: diskData.imagePath, author: diskData.author
          // };
          // this.form.setValue({
          //   title: this.disk.title,
          //   content: this.disk.content,
          //   image: this.disk.imagePath
          // });
        }, () => {
          this.isLoading = false;
        });
      } else {
        this.mode = 'create';
        this.diskId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  // onSaveDisk() {
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   this.isLoading = true;
  //   if (this.mode === 'create') {
  //     this.disksService.addDisk(this.form.value.title, this.form.value.content, this.form.value.image);
  //   } else {
  //     this.disksService.updateDisk(
  //       this.diskId,
  //       this.form.value.title,
  //       this.form.value.content,
  //       this.form.value.image
  //     );
  //   }
  //   this.form.reset();
  // }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
