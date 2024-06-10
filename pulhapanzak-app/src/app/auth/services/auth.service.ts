import { Injectable, inject } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, query, setDoc, Timestamp, updateDoc, where } from '@angular/fire/firestore';
import { LoginDto } from '../models/login';
import { Auth, UserCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from '@angular/fire/auth';
import { UserDto } from 'src/app/shared/models/user-interface';

const PATH = 'users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);
  private galleriesCollection;

  constructor(private firestore: Firestore) {
    this.galleriesCollection = collection(this.firestore, 'galleries');
  }

  async createGallery(galleryData: any): Promise<void> {
    try {
      const now = Timestamp.now();
      await addDoc(this.galleriesCollection, {
        bool: galleryData.bool,
        createdAt: now,
        createdBy: galleryData.createdBy,
        description: galleryData.description,
        photo: galleryData.photo,
        placeName: galleryData.placeName,
        uid: galleryData.uid,
      });
    } catch (error) {
      console.error('Error creating gallery:', error);
      throw error;
    }
  }

  // Método para obtener el usuario actual de la sesión
  async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      this._auth.onAuthStateChanged((user) => {
        resolve(user);
      });
    });
  }

  async isUserLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }

  // Método para registrar un usuario con correo y contraseña
  async createUserWithEmailAndPassword(user: UserDto): Promise<void> {
    const isUserLoggedIn = await this.isUserLoggedIn();
    if (isUserLoggedIn) {
      return Promise.reject('User is already logged in');
    }

    const response: UserCredential = await createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
    user.uid = response.user?.uid || '';
    return this.createUserInFirestore(user);
  }

  // Método para iniciar sesión con correo y contraseña
  async signInWithEmailAndPassword(model: LoginDto): Promise<UserCredential> {
    const isUserLoggedIn = await this.isUserLoggedIn();
    if (isUserLoggedIn) {
      return Promise.reject('User is already logged in');
    }
    return await signInWithEmailAndPassword(
      this._auth,
      model.email,
      model.password
    );
  }

  // Método para crear un usuario en firestore
  async createUserInFirestore(user: UserDto): Promise<void> {
    const userRef = doc(this._collection, user.uid);
    return setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      phoneNumber: user.phoneNumber,
      name: user.name,
      role: 'user',
      photoUrl: user.imageProfile,
    });
  }

  // Método para actualizar un usuario en firestore
  updateUser(user: UserDto): Promise<void> {
    if (!user.uid) throw new Error('User must have a uid');

    const userDocument = doc(this._firestore, PATH, user.uid);
    return updateDoc(userDocument, { ...user });
  }

  // Método para eliminar un usuario en firestore
  async deleteUserInFirestore(uid: string): Promise<void> {
    if (!uid) {
      return Promise.reject('User id is required');
    }

    const userRef = doc(this._collection, uid);
    await deleteDoc(userRef);
  }

  async getUserByQueryId(uid: string): Promise<UserDto | null> {
    const userQuery = query(
      this._collection,
      where('uid', '==', uid),
      where('age', '>=', 18),
      where('role', '==', 'user')
    );
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      return null;
    }

    const user = userSnapshot.docs[0].data() as UserDto;
    return user;
  }

  async getUserByDocId(uid: string): Promise<UserDto | null> {
    const userRef = doc(this._collection, uid);
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      return null;
    }

    const user = userSnapshot.data() as UserDto;
    return user;
  }

  async getUserLoggued() {
    try {
      const user = await this.getCurrentUser();
      const userDocument = doc(this._firestore, PATH, user?.uid ?? '');
      const userSnapshot = await getDoc(userDocument);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data() as UserDto;
        return userData;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async signOut() {
    const user = await this.getCurrentUser();
    if (user) {
      return this._auth.signOut();
    }
    return Promise.reject('User not found');
  }
}