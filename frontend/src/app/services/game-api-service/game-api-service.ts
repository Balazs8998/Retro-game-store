import { inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameModel} from '../../models/game-model';
import {GameDetailsModel} from '../../models/game-details-model';

const BASE_URL = 'http://localhost:8080/api/games'


@Service()
export class GameApiService {

  private http = inject(HttpClient);


  fetchGames() : Observable<GameModel[]>{
      return this.http.get<GameModel[]>(BASE_URL)
    }

  fetchGameDetails(id: number) : Observable<GameDetailsModel>{
    return this.http.get<GameDetailsModel>(`${BASE_URL}/${id}`)
}


}
