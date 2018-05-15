import { BandService } from './../../core/band.service';
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

  public songs : Song[] = new Array<Song>();
  public bandId : number;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private bandService: BandService,
    private songService: SongService) { }

  ngOnInit() {

    this.bandId = this.activatedRoute.snapshot.params['id'];

    this.retrieveSongs();

    this.songService.removed.subscribe(() => {
      this.retrieveSongs();
    });

    this.songService.added.subscribe(() => {
      this.retrieveSongs();
    });
  }

  onRemove(id) {
    this.songService.remove(id).subscribe(() => {
      this.songService.removed.emit();
      this.router.navigate(['songs']);
    });
  }

  private retrieveSongs() {
    this.bandService.getById(this.bandId).subscribe((band) => {
      band.songIds.forEach(songId => {
        this.songService.getById(songId).subscribe((song) => {
          this.songs.push(song);
        });
      });
    });
  }
}
