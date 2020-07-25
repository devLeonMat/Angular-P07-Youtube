import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from "@angular/common/http";
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = '<key>';
  private playlist = 'UUYzfO8qNwU6vBw4h6M5vVYg';
  private nextPageToken = '';

  constructor(private http: HttpClient) {
  }

  getVideos() {
    let url = `${this.youtubeUrl}/playlistItems`;

    let params = new HttpParams();
    params = params.append('part', 'snippet');
    params = params.append('maxResults', '10');
    params = params.append('playlistId', this.playlist );
    params = params.append('key', this.apiKey);

    return this.http.get(url, {params}).pipe(map(resp => {

      this.nextPageToken = resp['nextPageToken'];

      let videos: any[] = [];

      for (let val of resp['items']) {
        let snipet = val['snippet'];
        videos.push(snipet);
      }
      return videos;
    }, error => {
      console.log(error);
    }))

  }
}
