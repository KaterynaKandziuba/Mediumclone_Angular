import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfileInterface } from 'src/app/auth/shared/types/profile.interface';

@Injectable()
export class FollowService {
  constructor(private http: HttpClient) {}

  getUrl(slug: string): string {
    return `${environment.apiUrl}/profiles/${slug}/follow`;
  }

  followUser(slug: string): Observable<ProfileInterface> {
    return this.http
      .post<{ profile: ProfileInterface }>(this.getUrl(slug), {})
      .pipe(map((r) => r.profile));
  }

  unfollowUser(slug: string): Observable<ProfileInterface> {
    return this.http
      .delete<{ profile: ProfileInterface }>(this.getUrl(slug))
      .pipe(map((r) => r.profile));
  }
}
