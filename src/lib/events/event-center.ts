import Phaser from 'phaser';

export enum SupportedEvents {
  GAINED_EXPERIENCE = 'GAINED_EXPERIENCE',
  LEVEL_CHANGED = 'LEVEL_CHANGED',
}

export const emitter = new Phaser.Events.EventEmitter();
