import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NavController } from 'ionic-angular';
import { Episode } from '../../shared/episode.model';
import { OnNowService } from '../../services/on-now.service';
import { AudioService } from '../../components/audio-player/services/audio.service';
import { PlaylistService } from '../../components/audio-player/services/playlist.service';
import { Track } from '../../components/audio-player/services/track.model';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ OnNowService ]
})
export class HomePage implements OnInit {
  public station: any;
  
  constructor(private navController: NavController, private nowService: OnNowService, private audioService: AudioService, private playlistService: PlaylistService) {}

  ngOnInit() {
    this.getOnNow();
  }

  getOnNow() {
    this.nowService.getOnNow().subscribe(data => {
      this.station = data;
    });
  }

  public listenLive() {
    var track = new Track('http://pubint.ic.llnwd.net/stream/pubint_kbsx', this.station.onNow.program.name, '', '', '', 1);
    this.audioService.setCurrentTrack(track);
    //this.playlistService.setPlaylist([]);
  }

}
