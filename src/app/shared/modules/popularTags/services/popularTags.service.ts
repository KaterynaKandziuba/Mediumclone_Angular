import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { GetPopularTagsResponseInterface } from "../types/getPopularTagsResponse.interface";

@Injectable()
export class PopularTagsService{
    constructor(private http: HttpClient){}

    getPopularTags(url: string): Observable<GetPopularTagsResponseInterface> {
        const fullUrl = environment.apiUrl + url;
        return this.http.get<GetPopularTagsResponseInterface>(fullUrl)
    }
}