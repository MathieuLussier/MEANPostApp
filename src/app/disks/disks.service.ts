import { environment } from '../../environments/environment';
import { Disk } from './disk.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class DisksService {
  public backendUrl = environment.apiUrl + '/dashboard';
  private disks: Disk[] = [];
  private disksUpdated = new Subject<{disks: Disk[], diskCount: number}>();
  constructor(private http: HttpClient, private router: Router) {}

  getDisks(disksPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${disksPerPage}&page=${currentPage}`;
    this.http.get<{message: string, disks: any, maxDisks: number }>(
        this.backendUrl + '/getalldisks' + queryParams
      )
      .pipe(map((diskData) => {
        return { disks: diskData.disks.map(disk => {
          return disk;
        }), maxDisks: diskData. maxDisks};
      }))
      .subscribe((transformedDiskData) => {
        this.disks = transformedDiskData.disks;
        this.disksUpdated.next({ disks: [...this.disks], diskCount: transformedDiskData.maxDisks});
      });
  }

  getDiskUpdateListener() {
    return this.disksUpdated.asObservable();
  }

  getDisk(id: string) {
    return this.http.get<{
      _id: string; title: string, content: string, imagePath: string, author: string
    }>(this.backendUrl + '/' + id);
  }

  addDisk(title: string, content: string, image: File) {
    const diskData = new FormData();
    diskData.append('title', title);
    diskData.append('content', content);
    diskData.append('image', image, title);
    this.http.post<{ message: string, disk: Disk }>(this.backendUrl, diskData)
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  // updateDisk(id: string, title: string, content: string, image: File | string) {
  //   let diskData: Disk | FormData;
  //   if (typeof(image) === 'object') {
  //     diskData = new FormData();
  //     diskData.append('id', id);
  //     diskData.append('title', title);
  //     diskData.append('content', content);
  //     diskData.append('image', image, title);
  //   } else {
  //     diskData = {
  //       id: id,
  //       title: title,
  //       content: content,
  //       imagePath: image,
  //       author: null
  //     };
  //   }
  //   this.http.put(this.backendUrl + '/' + id, diskData)
  //     .subscribe(response => {
  //       this.router.navigate(['/']);
  //     });
  // }

  deleteDisk(diskId: string) {
    return this.http.delete(this.backendUrl + '/deletedisk/' + diskId);
  }
}
