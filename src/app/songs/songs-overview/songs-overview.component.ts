import { Band } from './../../bands/band';
import { BandService } from './../../core/band.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../../core/song.service';
import { NavigationService } from '../../core/navigation.service';

@Component({
  selector: 'wpw-songs-overview',
  templateUrl: './songs-overview.component.html',
  styleUrls: ['./songs-overview.component.scss']
})
export class SongsOverviewComponent implements OnInit {

  public songs : Song[];
  public band : Band;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private bandService: BandService,
    private songService: SongService,
    private navigationService: NavigationService) { }

  ngOnInit() {
    let bandId = this.activatedRoute.snapshot.params['id'];

    this.bandService.getById(bandId).switchMap((band) => {
      this.band = band;
      return this.songService.getAllByBand(this.band)
    })
    .subscribe((songs) => {
      this.songs = songs;
    });
 }

  navigateToSong(song: Song) {
    this.navigationService.storeParentRoute(this.activatedRoute, this.band.name);
    this.router.navigate(['/bands', this.band.id, 'songs', song.id]);
  }
}
