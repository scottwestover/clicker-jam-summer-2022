import Phaser from 'phaser';

export enum SupportedEvents {
  GAINED_EXPERIENCE = 'GAINED_EXPERIENCE',
  LEVEL_CHANGED = 'LEVEL_CHANGED',
  GAME_SAVED = 'GAME_SAVED',
  STORAGE_NOT_AVAILABLE = 'STORAGE_NOT_AVAILABLE',
}

export const emitter = new Phaser.Events.EventEmitter();
