// TODO: see how we can refactor and abstract this
const graphicsSettings = { best: 1, medium: 0.75, low: 0.5 };
const DPR = window.devicePixelRatio * graphicsSettings.best;
const { width, height } = window.screen;
const WIDTH = Math.round(Math.min(width, height) * DPR);
const HEIGHT = Math.round(Math.max(width, height) * DPR);

const codeTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'Inconsolata',
  fontSize: '50px',
  fontStyle: 'normal',
  color: '#00c200',
};
const taskProgressTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  ...codeTextStyle,
  fontSize: '32px',
};

export const GAME_WIDTH = WIDTH;
export const GAME_HEIGHT = HEIGHT;
export const GRID_ROWS = 15;
export const GRID_COLS = 15;
export const BACKGROUND_COLOR = '#1A1A1D';
export const SCENE_TRANSITION_DURATION = 1; //1000 * 0.25;
export const DEBUG = true;
export const PHASER_RESIZE_SCALE_MODE = false;
export const MONITOR_PHASER_TEXT_STYLE = codeTextStyle;
export const MONITOR_TASK_PROGRESS_PHASER_TEXT_STYLE = taskProgressTextStyle;
