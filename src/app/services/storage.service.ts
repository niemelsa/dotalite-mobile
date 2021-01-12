import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async set(key: string, value: string): Promise<void> {
    await Storage.set({
      key,
      value,
    });
  }

  async get(key: string): Promise<any> {
    const item = await Storage.get({ key });
    return item;
  }

  async remove(key: string): Promise<void> {
    await Storage.remove({ key });
  }
}
