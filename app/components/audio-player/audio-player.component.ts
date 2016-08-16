import { Component, ElementRef, OnInit } from '@angular/core';
import { AudioService } from './services/audio.service';
import { Gesture, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { WindowService } from './services/window.service';
import { TabbarService } from './services/tabbar.service';
import { Track } from './services/track.model';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'audio-player',
    templateUrl: 'build/components/audio-player/audio-player.template.html',
    providers: [ WindowService, TabbarService ]
})

export class AudioPlayer implements OnInit {
    public currentTrack: Track;
    public timeElapsed: string;
    public timeRemaining: string;
    public percentElapsed: number;
    public percentLoaded: number;
    public playerStatus: string;
    public deltaY: number;
    private viewHeight: number;
    private el: HTMLElement;
    // private dragGesture;
    private playerOpen: boolean = false;
    private platform: Platform;

    // public pos: Object;

    constructor(public audioService: AudioService, platform: Platform, private tabbarService: TabbarService, el: ElementRef, private windowService: WindowService) {
        this.el = el.nativeElement;
        this.viewHeight = this.windowService.getInnerHeight();
        this.platform = platform;
        this.tabbarService = tabbarService;
    }

    ngOnInit() {
        this.initPlayerPositions();
        // this.dragGesture = new Gesture(this.el, { direction: 'y' });
        this.getTimeElapsed();
        this.getTimeRemaining();
        this.getPercentLoaded();
        this.getPercentElapsed();
        this.getPlayerStatus();
        this.getCurrentTrack();
    }

    public dragPlayer(event) {

        var currentPos = event.center.y;
        
        if(event.isFirst) {
            console.log(event);
        }
        
        this.deltaY = event.deltaY;

        console.log(this.deltaY + currentPos);
        this.el.style['transform'] = 'translate3d(0, -'+(this.deltaY + currentPos)+'px, 0)';

        
        // open player past a certain threshold...
        if(!this.playerOpen && event.isFinal && this.deltaY < -50) {
            this.openPlayer(this.deltaY);
        } 
        // else if(this.playerOpen && event.isFinal && this.deltaY > -50) {
        //     console.log('snap play back');
        //     this.closePlayer(-this.deltaY + 50);
        // }

        return false;
    }

    public togglePlayerVisibility() {
        if(this.playerOpen) {
            this.closePlayer(0);
            // StatusBar.show();
        } else {
            this.openPlayer(0);
            // StatusBar.hide();
        }
    }

    private initPlayerPositions() {
        let hasTabBar = true;
        // Todo: if ios theme tabbar position?
        if(this.platform.is('ios')) {
            this.el.style.top = (this.viewHeight - 108)+'px';
        } else {
            this.el.style.top = (this.viewHeight - 58)+'px';
        }
        
    
    }

    private openPlayer(deltaY) {
        let style = this.el.style;
        let hasTabBar = true;
        style['transition'] = '300ms cubic-bezier(0.855, 0.005, 0.175, 1.2)';

        if(this.platform.is('ios') && hasTabBar) {
            this.tabbarService.hideTabbar();
            style['transform'] = 'translate3d(0, -'+(this.el.offsetHeight - 108 + deltaY)+'px, 0)';
        } else {
            style['transform'] = 'translate3d(0, -'+(this.el.offsetHeight - 56)+'px, 0)';
        }

        this.playerOpen = true;
    }

    private closePlayer(deltaY) {
        console.log('close', deltaY);
        let style = this.el.style;
        style['transition'] = '300ms cubic-bezier(0.855, 0.005, 0.175, 1.2)';
        style['transform'] = 'translate3d(0,'+(deltaY)+'px ,0)';
        this.playerOpen = false;
        this.deltaY = 0;
        this.tabbarService.showTabbar();

    }

    public seekAudio(event) {
        let position = event.value / (100 / this.audioService.getAudio().duration);
        this.audioService.seekAudio(position);
    }

    public toggleAudio(event) {
        event.stopPropagation();
        this.audioService.toggleAudio();
    }

    public getTimeElapsed() {
        this.audioService.getTimeElapsed()
            .subscribe(time => this.timeElapsed = time);
    }

    public getTimeRemaining() {
        this.audioService.getTimeRemaining()
            .subscribe(time => this.timeRemaining = time);
    }

    public getPercentElapsed() {
        this.audioService.getPercentElapsed()
            .subscribe(percent => this.percentElapsed = percent);
    }

    public getPercentLoaded() {
        this.audioService.getPercentLoaded()
            .subscribe(percent => this.percentLoaded = percent);
    }

    public getPlayerStatus() {
        this.audioService.getPlayerStatus()
            .debounceTime(100)
            .subscribe(status => this.playerStatus = status);
    }

    public getCurrentTrack() {
        this.audioService.getCurrentTrack()
            .subscribe(track => this.currentTrack = track);
    }
}