import { Injectable } from "@angular/core";

@Injectable()
export class WindowService {
    
    constructor() {    }

    public getInnerHeight() {
        return window.innerHeight;
    }
}