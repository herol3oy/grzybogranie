import { Injectable } from '@angular/core';
import { Mushroom } from '../model/mushroom';
import { Observable, of } from 'rxjs';
import { MushroomQuestion } from '../model/mushroom-question';
import { MUSHROOMS } from '../db/mushrooms';
import { MUSHROOM_QUESTIONS } from '../db/mushroom-questions';

@Injectable({
  providedIn: 'root',
})
export class MushroomService {
  getAllMushrooms: () => Observable<Mushroom[]> = (): Observable<Mushroom[]> =>
    of(MUSHROOMS);

  getListOfMushroomChallenge: () => Observable<MushroomQuestion[]> =
    (): Observable<MushroomQuestion[]> => of(MUSHROOM_QUESTIONS);
}
