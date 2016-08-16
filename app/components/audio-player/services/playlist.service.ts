import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from "rxjs/Rx";
import { Track } from "./track.model";
// import { AudioService } from "./audio.service";
import "rxjs/add/operator/map";


@Injectable()
export class PlaylistService {
    public playlist: BehaviorSubject<Track[]> = new BehaviorSubject(null);

    constructor() {}

    public getPlaylist(): Observable<Track[]> {
        return this.playlist.asObservable();
    }

    public setPlaylist(playlist: Track[]): void {
        this.playlist.next(playlist);
    }

}