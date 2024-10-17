import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private storageProvider: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storageProvider.create();
    this.storage = storage;
  }

  private async ensureStorageInitialized() {
    if (!this.storage) {
      await this.init();
    }
  }

  async set(key: string, value: any): Promise<void> {
    await this.ensureStorageInitialized();
    try {
      await this.storage!.set(key, value);
    } catch (error) {
      console.error('Error setting item', error);
      throw error;
    }
  }

  async get(key: string): Promise<any> {
    await this.ensureStorageInitialized();
    try {
      return await this.storage!.get(key);
    } catch (error) {
      console.error('Error getting item', error);
      throw error;
    }
  }

  async remove(key: string): Promise<void> {
    await this.ensureStorageInitialized();
    try {
      await this.storage!.remove(key);
    } catch (error) {
      console.error('Error removing item', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    await this.ensureStorageInitialized();
    try {
      await this.storage!.clear();
    } catch (error) {
      console.error('Error clearing storage', error);
      throw error;
    }
  }

  async keys(): Promise<string[]> {
    await this.ensureStorageInitialized();
    try {
      return await this.storage!.keys();
    } catch (error) {
      console.error('Error getting keys', error);
      throw error;
    }
  }

  async length(): Promise<number> {
    await this.ensureStorageInitialized();
    try {
      return await this.storage!.length();
    } catch (error) {
      console.error('Error getting storage length', error);
      throw error;
    }
  }

  async forEach(callback: (value: any, key: string, iterationNumber: Number) => void): Promise<void> {
    await this.ensureStorageInitialized();
    try {
      await this.storage!.forEach(callback);
    } catch (error) {
      console.error('Error iterating items', error);
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    await this.ensureStorageInitialized();
    try {
      const value = await this.storage!.get(key);
      return value !== null;
    } catch (error) {
      console.error('Error checking existence', error);
      throw error;
    }
  }
}