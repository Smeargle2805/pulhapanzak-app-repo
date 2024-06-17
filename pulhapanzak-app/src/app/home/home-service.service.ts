import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterDTO } from '../shared/models/character-dto-interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<CharacterDTO[]> {
    return this.http.get<CharacterDTO[]>(this.apiUrl);
  }
}
