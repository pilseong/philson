import { InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Stroage', {
  providedIn: 'root',
  factory: ()=> localStorage
})
