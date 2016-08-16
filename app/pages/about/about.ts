import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EpisodeService } from '../../services/episode.service';
import { PlaylistService } from '../../components/audio-player/services/playlist.service';
import { AudioService } from '../../components/audio-player/services/audio.service';
import { Track } from '../../components/audio-player/services/track.model';
import { StoryDetailPage } from '../story-detail/story-detail';
import { Observable } from 'rxjs/Rx';
import { orderBy } from 'lodash';

@Component({
  templateUrl: 'build/pages/about/about.html',
  providers: [ EpisodeService ]
})
export class AboutPage implements OnInit{
  public playlist;
  constructor(private nav: NavController, private episodeService: EpisodeService, private playlistService: PlaylistService, private audioService: AudioService) {
  }

  ngOnInit() {
    this.getStories();
  }

  getStories() {
    // forkJoin is a way for rxjs to make two calls for data in parallel.
    Observable.forkJoin(this.episodeService.getLocalStories(), this.episodeService.getNationalStories())
      .subscribe(res => {
          var results = res[0].concat(res[1]);
          this.playlist = orderBy(results, ['date'], ['desc']);
          this.playlist.forEach((story, index) => {
            story.index = index
          });
          console.log(this.playlist);
          return this.playlist;
      });
  }

  public startPlaylist(track: Track) {
    // TODO: Refactor into one call...
    this.audioService.setCurrentTrack(track);
    this.playlistService.setPlaylist(this.playlist);
  }

  public viewStory(story) {
    // console.log(story);
    var s = story
    this.nav.push(StoryDetailPage, {
      story: s
    });
  }

}
