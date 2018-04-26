import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../../core/song.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'wpw-song',
  templateUrl: './songs-show.component.html',
  styleUrls: ['./songs-show.component.scss']
})
export class SongsShowComponent implements OnInit {

  public song = new Song();

  constructor(private activatedRoute: ActivatedRoute,
    private songService: SongService) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      switchMap((params) => this.songService.getById(params.id))
    ).subscribe((song) => {
        this.song = song;
    });
  }

}
