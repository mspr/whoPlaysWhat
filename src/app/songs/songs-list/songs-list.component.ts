import { Router, ActivatedRoute } from '@angular/router';
import { SongService } from './../../core/song.service';
import { Song } from './../song';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'wpw-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit {

  public songs : Song[];
  private bandId : number;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private songService: SongService) { }

  ngOnInit() {

    let bandId = this.activatedRoute.snapshot.params['id'];

    this.songService.getAll(bandId).subscribe((songs) => {
        this.songs = songs;
    });

    this.songService.removed.subscribe(() => {
      this.songService.getAll(bandId).subscribe((bands) => {
        this.songs = bands;
      });
    });

    this.songService.added.subscribe(() => {
      this.songService.getAll(bandId).subscribe((bands) => {
        this.songs = bands;
      });
    });
  }

  onRemove(id) {
    this.songService.remove(id).subscribe(() => {
      this.songService.removed.emit();
      this.router.navigate(['songs']);
    });
  }

}
