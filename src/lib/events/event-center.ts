import Phaser from 'phaser';

export enum SupportedEvents {
  GAINED_EXPERIENCE = 'GAINED_EXPERIENCE',
}

export const emitter = new Phaser.Events.EventEmitter();
