import { SongLevel } from './song-level.enum';

export class SongLevelHelper
{
  private static songLevels = Object.keys(SongLevel);
  private static songLevelNames = SongLevelHelper.initializeSongLevelNames();

  static initializeSongLevelNames()
  {
    let songLevelNames = new Map<SongLevel, string>();
    songLevelNames.set(SongLevel.FingerInTheNose, "Finger in the nose");
    songLevelNames.set(SongLevel.Easy, "Easy");
    songLevelNames.set(SongLevel.NotSoSimple, "Not so simple");
    songLevelNames.set(SongLevel.HardOne, "Hard one");
    songLevelNames.set(SongLevel.GoodLuck, "Good luck!");
    return songLevelNames;
  }

  static getSongLevelNames() {
    return Array.from(this.songLevelNames.values());
  }

  static getSongLevelName(i : number) {
    return this.songLevelNames[i];
  }
}
