import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfileInterface } from '../auth/shared/types/profile.interface';
import { GetUserProfileResponseInterface } from './types/getUserProfileResponse.interface';

@Injectable()
export class UserProfileService {
  // fetch user profile
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<ProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${slug}`;

    return this.http
      .get<GetUserProfileResponseInterface>(url)
      .pipe(map((r: GetUserProfileResponseInterface) => r.profile));
  }
}
