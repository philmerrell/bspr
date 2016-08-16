import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class TabbarService {
    public tabbar: HTMLElement;
    constructor(@Inject(DOCUMENT) private document) {
        console.log();
        this.tabbar = this.document.querySelectorAll('ion-tabbar')[0];
    }

    public hideTabbar() {
        // this.tabbar.style.display = "none";
        this.tabbar.style['transition-duration'] = '200ms';
        this.tabbar.style['transform'] = 'translate3d(0, 50px, 0)';
    }

    public showTabbar() {
        // this.tabbar.style.display = "flex";
        this.tabbar.style['transition-duration'] = '200ms';
        this.tabbar.style['transform'] = 'translate3d(0, 0, 0)';
    }
}