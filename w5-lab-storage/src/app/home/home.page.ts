import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class HomePage {
  key: string = 'myKey';
  value: string = '';  // Initialize value
  output: string = ''; // Initialize output

  constructor(private storage: Storage) {}

  async setItem() {
    try {
      await this.storage.set(this.key, this.value);
      this.output = 'Item set successfully';
    } catch (error) {
      console.error('Error setting item', error);
      this.output = 'Error setting item';
    }
  }

  async getItem() {
    try {
      const value = await this.storage.get(this.key);
      this.output = value ? `Item: ${value}` : 'Item not found';
    } catch (error) {
      console.error('Error getting item', error);
      this.output = 'Error getting item';
    }
  }

  async removeItem() {
    try {
      await this.storage.remove(this.key);
      this.output = 'Item removed successfully';
    } catch (error) {
      console.error('Error removing item', error);
      this.output = 'Error removing item';
    }
  }

  async clearStorage() {
    try {
      await this.storage.clear();
      this.output = 'Storage cleared successfully';
    } catch (error) {
      console.error('Error clearing storage', error);
      this.output = 'Error clearing storage';
    }
  }

  async getKeys() {
    try {
      const keys = await this.storage.keys();
      this.output = `Keys: ${keys.join(', ')}`;
    } catch (error) {
      console.error('Error getting keys', error);
      this.output = 'Error getting keys';
    }
  }

  async getLength() {
    try {
      const length = await this.storage.length();
      this.output = `Storage length: ${length}`;
    } catch (error) {
      console.error('Error getting storage length', error);
      this.output = 'Error getting storage length';
    }
  }

  async iterateItems() {
    try {
      let items = '';
      await this.storage.forEach((value, key, index) => {
        items += `${Number(index) + 1}. ${key}: ${value}\n`;
      });
      this.output = `Items:\n${items}`;
    } catch (error) {
      console.error('Error iterating items', error);
      this.output = 'Error iterating items';
    }
  }
}