import * as GameUtils from '@devshareacademy/common-game-utils';

export default class PhaserGrid extends GameUtils.grid.BasicGrid {
  private readonly scene: Phaser.Scene;
  private graphics: Phaser.GameObjects.Graphics | undefined;
  private textGroup: Phaser.GameObjects.Group;
  private showIndexes: boolean;

  constructor(scene: Phaser.Scene, numberOfRows: number, numberOfCols: number) {
    super({
      width: scene.scale.width,
      height: scene.scale.height,
      numberOfRows,
      numberOfCols,
    });
    this.scene = scene;
    this.textGroup = this.scene.add.group([]);
    this.showIndexes = false;
  }

  protected drawGridWithIndexes(): void {
    this.showIndexes = true;
    this.drawGrid();
    this.textGroup.getChildren().forEach((text) => {
      this.textGroup.killAndHide(text);
    });
    let count = 0;
    for (let i = 0; i < this.numberOfRows; i += 1) {
      for (let j = 0; j < this.numberOfCols; j += 1) {
        let numText = this.textGroup.getFirstDead() as Phaser.GameObjects.Text | undefined;
        if (!numText) {
          numText = this.scene.add.text(0, 0, count.toString(), {
            color: '#ff0000',
            fontSize: '32px',
            fontFamily: 'Arial',
          });
          numText.setOrigin(0.5, 0.5);
          numText.setDepth(-1);
          this.textGroup.add(numText);
        }
        numText.setVisible(true);
        numText.setActive(true);
        this.placeGameObjectAtIndex(count, numText);

        count += 1;
      }
    }
  }

  protected drawGrid(): void {
    if (!this.graphics) {
      this.graphics = this.scene.add.graphics();
      this.graphics.setDepth(-1);
    }

    this.graphics.clear();
    this.graphics.lineStyle(2, 0xff0000);

    for (let i = 0; i < this.width; i += this.cellWidth) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.height);
    }

    for (let i = 0; i < this.height; i += this.cellHeight) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.width, i);
    }

    this.graphics.strokePath();
  }

  public resize(width: number, height: number): void {
    super.resize(width, height);
    if (this.showIndexes) {
      this.drawGridWithIndexes();
    } else {
      this.drawGrid();
    }
  }

  public placeGameObjectAtIndex(
    index: number,
    obj: {
      x: number;
      y: number;
    },
  ): void {
    const coordinates = this.placeAtIndex(index);
    obj.x = coordinates.x;
    obj.y = coordinates.y;
  }
}
