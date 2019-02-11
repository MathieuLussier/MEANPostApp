import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Disk } from '../disk.model';
import { DisksService } from '../disks.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

declare let $;

@Component({
  selector: 'app-disk-list',
  templateUrl: './disk-list.component.html',
  styleUrls: ['./disk-list.component.css']
})
export class DiskListComponent implements OnInit, OnDestroy {

  disks: Disk[] = [];
  private disksSub: Subscription;
  public isLoading = false;
  public totalDisks = 0;
  public diskPerPage = 5;
  public currentPage = 1;
  public userId: string;
  public pageSizeOptions = [1, 2, 5, 10];
  private authStatusSubs: Subscription;
  public userIsAuthenticated = false;

  constructor(public disksService: DisksService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    $('body').css('background-color', '#ffffff');
    $('body').css('background-image', 'none');
    this.disksService.getDisks(this.diskPerPage, 1);
    this.userId = this.authService.getUserId();
    this.disksSub = this.disksService.getDiskUpdateListener()
      .subscribe((diskData: {disks: Disk[], diskCount: number}) => {
        this.isLoading = false;
        this.totalDisks = diskData.diskCount;
        this.disks = diskData.disks;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onDelete(diskId: string) {
    if (this.disks.length === 1 && (this.totalDisks - (this.diskPerPage * this.currentPage)) < this.totalDisks) {
      this.currentPage -= 1;
    }
    this.isLoading = true;
    this.disksService.deleteDisk(diskId).subscribe(() => {
      this.disksService.getDisks(this.diskPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.disksSub.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.diskPerPage = pageData.pageSize;
    this.disksService.getDisks(this.diskPerPage, this.currentPage);
  }
}
