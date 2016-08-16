import { Component, OnInit } from '@angular/core'
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { AudioPlayer } from '../../components/audio-player/audio-player.component';
import { AudioService } from '../../components/audio-player/services/audio.service';
import { Track } from '../../components/audio-player/services/track.model';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
  directives: [ AudioPlayer ],
  providers: [ AudioService ]
})
export class TabsPage implements OnInit{

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  public currentTrack: Track;

  constructor(private audioService: AudioService) {
    this.tab1Root = HomePage;
    this.tab2Root = AboutPage;
    this.tab3Root = ContactPage;
  }

  ngOnInit() {
    this.getCurrentTrack();
  }

  getCurrentTrack() {
    this.audioService.getCurrentTrack()
      .subscribe(track => {
        console.log(track);
        this.currentTrack = track
      });
  }
}
