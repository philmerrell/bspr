import * as moment from 'moment';

export class Track {
    audioUrl: string;
    image: string;
    title: string;
    dateString: string;
    date: Date;
    dateFromNow: string;
    text: any;
    index: number;

    constructor(url, image, title, dateString, text, index) {
        this.audioUrl = url;
        this.image = image;
        this.title = title;
        this.date = new Date(dateString);
        this.dateFromNow = moment(this.date).fromNow();
        this.text = text;
        this.index = index;
    }
}