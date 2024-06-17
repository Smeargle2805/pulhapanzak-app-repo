import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonAvatar, IonLabel, IonList } from '@ionic/angular/standalone';
import { CharacterDTO } from '../shared/models/character-dto-interface';
import { HomeService } from './home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonList, IonLabel, IonAvatar, IonItem, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  characters: CharacterDTO[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getCharacters().subscribe(
      (data: any) => {
        this.characters = data.results;
      },
      (error) => {
        console.error('Error fetching characters:', error);
      }
    );
  }
}
