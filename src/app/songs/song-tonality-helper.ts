import { SongTonality } from './song-tonality.enum';

export class SongTonalityHelper
{
  private static songTonalities = Object.keys(SongTonality);
  private static songTonalityNames = SongTonalityHelper.initializeSongTonalityNames();

  static initializeSongTonalityNames()
  {
    let songTonalityNames = new Map<SongTonality, string>();
    songTonalityNames.set(SongTonality.A, "A");
    songTonalityNames.set(SongTonality.Bb, "Bb");
    songTonalityNames.set(SongTonality.B, "B");
    songTonalityNames.set(SongTonality.C, "C");
    songTonalityNames.set(SongTonality.Cs, "C#");
    songTonalityNames.set(SongTonality.D, "D");
    songTonalityNames.set(SongTonality.Eb, "Eb");
    songTonalityNames.set(SongTonality.E, "E");
    songTonalityNames.set(SongTonality.F, "F");
    songTonalityNames.set(SongTonality.Fs, "F#");
    songTonalityNames.set(SongTonality.G, "G");
    songTonalityNames.set(SongTonality.Gs, "G#");
    return songTonalityNames;
  }

  static getSongTonalityNames()
  {
    return Array.from(this.songTonalityNames.values());
  }

  static getSongTonalityName(i : number)
  {
    return this.songTonalityNames[i];
  }
}
