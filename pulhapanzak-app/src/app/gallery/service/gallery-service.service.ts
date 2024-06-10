import { Injectable } from '@angular/core';
import { collection, query, where, orderBy, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private galleriesCollection;

  constructor(private firestore: Firestore) {
    this.galleriesCollection = collection(this.firestore, 'galleries');
  }

  async getActiveGalleries(): Promise<any[]> {
    try {
      const activeGalleriesQuery = query(
        this.galleriesCollection,
        where('activo', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(activeGalleriesQuery);
      const galleries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return galleries;
    } catch (error) {
      console.error('Error getting active galleries:', error);
      throw error;
    }
  }
}
