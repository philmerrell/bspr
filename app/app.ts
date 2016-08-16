import { Component, provide } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';
import { AudioService } from './components/audio-player/services/audio.service';
import { PlaylistService } from './components/audio-player/services/playlist.service';
import { enableProdMode } from '@angular/core';
enableProdMode();

declare const nprOneSDK; 

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [ PlaylistService, AudioService ]
})
export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [provide(Window, { useValue: window })])