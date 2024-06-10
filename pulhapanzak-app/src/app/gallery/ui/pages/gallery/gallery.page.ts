import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GalleryPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.createGallery();
  }

  async createGallery() {
    const galleryData = {
      bool: true,
      createdBy: 'user123',
      description: 'Beautiful landscape',
      photo: 'https://example.com/photo.jpg',
      placeName: 'Nature Reserve',
      uid: 'gallery123',
    };
    try {
      await this.authService.createGallery(galleryData);
      console.log('Gallery created successfully');
    } catch (error) {
      console.error('Error creating gallery:', error);
    }
  }

}