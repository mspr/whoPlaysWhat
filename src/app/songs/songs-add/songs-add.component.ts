import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../../core/song.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wpw-songs-add',
  templateUrl: './songs-add.component.html',
  styleUrls: ['./songs-add.component.scss']
})
export class SongsAddComponent implements OnInit {

  public song = new Song();

  constructor(private router: Router,
    private songService: SongService) { }

  ngOnInit() {
  }

  add() {
    this.songService.add(this.song).subscribe((song) => {
      this.songService.added.emit(song);
      this.router.navigate(['songs', song.id]);
    });
  }

}
