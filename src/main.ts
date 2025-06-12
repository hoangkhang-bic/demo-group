import { Capacitor } from '@capacitor/core';

document.addEventListener('DOMContentLoaded', () => {
  console.log('App running on:', Capacitor.getPlatform());
}); 