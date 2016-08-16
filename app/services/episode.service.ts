import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Track } from '../components/audio-player/services/track.model';
import { PlaylistService } from '../components/audio-player/services/playlist.service';
import { Observable, Subject, BehaviorSubject } from "rxjs/Rx";
// import "rxjs/add/operator/topromise";
import "rxjs/add/operator/map";


@Injectable()
export class EpisodeService {

    private localUrl = 'http://api.npr.org/query?numresults=7&requiredAssets=image,audio&output=JSON&orgId=26&startDate=2016-06-29&apiKey=MDA1MTkyNjA1MDEyNzM1MTQ0ODk3NTA1NA004';
    private nationalUrl = 'http://player.nprstations.org/scripts/ajax.php?url=http%3A%2F%2Fapi.npr.org%2Fquery%3Fid%3D1002%26numResults%3D10%26requiredAssets%3Daudio%26output%3DJSON%26apiKey%3DMDA1MTkyNjA1MDEyNzM1MTQ0ODk3NTA1NA004';
    // private tracks: BehaviorSubject<Track[]> = new BehaviorSubject([]);
    private dataStore: {
        tracks: Track[]
    };

    constructor(private http: Http, private playlistService: PlaylistService) {}

    // getStories(): Observable<Track[]> {

            
    // }

    getLocalStories () {
        return this.http.get(this.localUrl)
            .map(this.handleResponse);
    }

    getNationalStories () {
        return this.http.get(this.nationalUrl)
            .map(this.handleResponse);
    }

    private handleError(error) {
        return Observable.throw(error);
    }

    private createTrack(story, index) {
        let audio = story.audio[0].format.mp3[0].$text;
        let image = (typeof story.image !== 'undefined') ? story.image[0].src : null;
        let title = story.title.$text;
        let text = story.text.paragraph;
        let dateString = story.storyDate.$text;
        var track = new Track(audio, image, title, dateString, text, index);
        return track;
    }

    private handleResponse = (res) => {
        var data = res.json();
        var stories = data.list.story;
        var trackList = [];
        stories.forEach((story, index) => {
            trackList.push(this.createTrack(story, index));
        });

        return trackList;

    }
}