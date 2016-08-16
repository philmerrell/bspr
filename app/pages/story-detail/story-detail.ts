import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { EpisodeService } from '../../services/episode.service';
// import { PlaylistService } from '../../components/audio-player/services/playlist.service';
import { AudioService } from '../../components/audio-player/services/audio.service';
import { Track } from '../../components/audio-player/services/track.model';
import { Observable } from 'rxjs/Rx';
// import { orderBy } from 'lodash';


@Component({
  template: `<ion-header>
                <ion-navbar>
                    <ion-title>{{track.dateFromNow}}</ion-title>
                </ion-navbar>
              </ion-header>

                <ion-content>
                    <img [src]="track.image" width="100%">
                    <button (click)="startPlaylist()" fab fab-right style="margin-top: -35px;">
                        <ion-icon *ngIf="track !== currentTrack" name="play"></ion-icon>
                        <ion-icon *ngIf="track === currentTrack" name="radio"></ion-icon>
                    </button>
                    <div padding>
                        <h2>{{track.title}}</h2>
                        <p>by Jack Handy</p>
                        <p *ngFor="let paragraph of track.text">{{paragraph.$text}}</p>
                    </div>
                </ion-content>`
})
export class StoryDetailPage implements OnInit {

    public track: Track;
    public currentTrack: Track;
    constructor(private nav: NavController, private navParams: NavParams, private audioService: AudioService) {

    }

    ngOnInit() {
        this.track = this.navParams.get('story');
        this.getCurrentTrack();
    }

    public startPlaylist() {
        // TODO: Refactor into one call...
        this.audioService.setCurrentTrack(this.track);
        //this.playlistService.setPlaylist(this.playlist);
    }

    public getCurrentTrack() {
        this.audioService.getCurrentTrack().subscribe(track => this.currentTrack = track);
    }
}