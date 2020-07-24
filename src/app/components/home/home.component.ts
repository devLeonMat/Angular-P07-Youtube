import {Component, OnInit} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  videos: any[] = [];
  videoSel: any;

  constructor(private youtube: YoutubeService) {
  }

  ngOnInit() {
    this.youtube.getVideos().subscribe(videos => {
      this.videos = videos;
    }, error => {
      console.log(error);
    })
  }

  verVideo(video: any) {
    this.videoSel = video;
    $('#myModal').modal();
  }
}
