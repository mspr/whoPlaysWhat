import { Router } from '@angular/router';
import { SongService } from './../../core/song.service';
import { Song } from './../song';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wpw-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit {

  public songs : Song[];

  constructor(private router: Router,
    private songService: SongService) { }

  ngOnInit() {
    this.songService.getAll().subscribe((songs) => {
      this.songs = songs;
    });
  }

  onRemove(id) {
    this.songService.remove(id).subscribe(() => {
      this.songService.removed.emit();
      this.router.navigate(['songs']);
    });
  }

}
