import SceneKeys from './scene-keys';
import BaseScene from './base-scene';
import AssetKey from '../assets/asset-key';
import * as Align from '../../lib/align';
import * as Config from '../config';
import IdleGame from '../core';
import Button from '../../lib/components/button';
import Player from '../core/player';

export default class UpgradeMenuScene extends BaseScene {
  private backgroundMenu!: Phaser.GameObjects.Image;
  private iconsContainer!: Phaser.GameObjects.Container;
  private coreSkillText!: Phaser.GameObjects.Text;
  private coreDpsSkillText!: Phaser.GameObjects.Text;
  private currentExperienceText!: Phaser.GameObjects.Text;
  private player!: Player;

  constructor() {
    super({
      key: SceneKeys.UPGRADE_MENU_SCENE,
      active: false,
    });
  }

  public create(): void {
    this.sceneSetup();

    this.player = IdleGame.getInstance().player;

    // create a transparent background for closing the menu
    const bg = this.add
      .rectangle(0, 0, this.scale.gameSize.width * 2, this.scale.gameSize.height * 2, 0x000000)
      .setAlpha(0.1)
      .setInteractive();

    bg.on(
      Phaser.Input.Events.POINTER_DOWN as string,
      () => {
        this.scene.setVisible(false);
        this.scene.setActive(false);
      },
      this,
    );

    this.backgroundMenu = this.add.image(0, 0, AssetKey.MONITOR_ALT).setOrigin(0.5).setInteractive();
    this.backgroundMenu.setAlpha(1);

    this.iconsContainer = this.add.container();

    // add icon for core developer skill
    const coreSkillContainer = this.add.container();
    const coreSkillIcon = this.add.image(0, 0, AssetKey.SINGLE_PLAYER).setOrigin(0.5, 0);
    this.coreSkillText = this.add
      .text(coreSkillIcon.displayWidth, 0, `Lvl: ${this.player.upgrades[1].level}`, Config.UI_PHASER_TEXT_STYLE)
      .setOrigin(0, 0.5);
    const coreSkillDescriptionText = this.add
      .text(coreSkillIcon.displayWidth, 0, 'Dev Skills', Config.UI_PHASER_TEXT_STYLE)
      .setOrigin(0, -1);
    const coreSkillCostText = this.add
      .text(
        coreSkillDescriptionText.displayWidth * 1.5 + coreSkillDescriptionText.x,
        coreSkillDescriptionText.y * 2 + 25,
        `Cost: ${this.player.upgrades[1].currentCost}exp`,
        {
          ...Config.UI_PHASER_TEXT_STYLE,
          fontSize: '42px',
        },
      )
      .setOrigin(0, -1);
    const coreSkillBuyButton = this.createPlayButton(this.player, () => {
      // TODO: add logic to prevent click and disable button if not enough money
      const bought = this.player.buyUpgrade(1);
      if (bought) {
        this.coreSkillText.setText(`Lvl: ${this.player.upgrades[1].level}`);
        coreSkillCostText.setText(`Cost: ${this.player.upgrades[1].currentCost}exp`);
      }
    });
    coreSkillBuyButton.setPosition(
      coreSkillDescriptionText.displayWidth * 1.5 + coreSkillDescriptionText.x + 105,
      coreSkillDescriptionText.y * 2,
    );
    coreSkillBuyButton.setScale(2, 2);

    // add to container
    coreSkillContainer.add(coreSkillIcon);
    coreSkillContainer.add(this.coreSkillText);
    coreSkillContainer.add(coreSkillDescriptionText);
    coreSkillContainer.add(coreSkillBuyButton);
    coreSkillContainer.add(coreSkillCostText);
    this.iconsContainer.add(coreSkillContainer);

    // add icon for dps upgrade skill
    const coreDpsSkillContainer = this.add.container(0, 250);
    const coreDpsSkillIcon = this.add.image(0, 0, AssetKey.MULTIPLAYER).setOrigin(0.5, 0);
    this.coreDpsSkillText = this.add
      .text(coreDpsSkillIcon.displayWidth, 0, `Lvl: ${this.player.upgrades[2].level}`, Config.UI_PHASER_TEXT_STYLE)
      .setOrigin(0, 0.5);
    const coreDpsSkillDescriptionText = this.add
      .text(coreDpsSkillIcon.displayWidth, 0, 'Pair Program', Config.UI_PHASER_TEXT_STYLE)
      .setOrigin(0, -1);
    const coreDpsSkillCostText = this.add
      .text(
        coreDpsSkillDescriptionText.displayWidth + coreDpsSkillDescriptionText.x + 50,
        coreDpsSkillDescriptionText.y * 2 + 25,
        `Cost: ${this.player.upgrades[2].currentCost}exp`,
        {
          ...Config.UI_PHASER_TEXT_STYLE,
          fontSize: '42px',
        },
      )
      .setOrigin(0, -1);
    const coreDpsSkillBuyButton = this.createPlayButton(this.player, () => {
      // TODO: add logic to prevent click and disable button if not enough money
      const bought = this.player.buyUpgrade(2);
      if (bought) {
        this.coreDpsSkillText.setText(`Lvl: ${this.player.upgrades[2].level}`);
        coreDpsSkillCostText.setText(`Cost: ${this.player.upgrades[2].currentCost}exp`);
      }
    });
    coreDpsSkillBuyButton.setPosition(
      coreDpsSkillDescriptionText.displayWidth * 1 + coreDpsSkillDescriptionText.x + 160,
      coreDpsSkillDescriptionText.y * 2,
    );
    coreDpsSkillBuyButton.setScale(2, 2);

    // add to container
    coreDpsSkillContainer.add(coreDpsSkillIcon);
    coreDpsSkillContainer.add(this.coreDpsSkillText);
    coreDpsSkillContainer.add(coreDpsSkillDescriptionText);
    coreDpsSkillContainer.add(coreDpsSkillBuyButton);
    coreDpsSkillContainer.add(coreDpsSkillCostText);
    this.iconsContainer.add(coreDpsSkillContainer);

    // place experience in ui
    this.currentExperienceText = this.add.text(
      0,
      0,
      `Current EXP: ${this.player.experience}`,
      Config.MONITOR_TASK_PROGRESS_PHASER_TEXT_STYLE,
    );

    this.addAiIcon();

    this.resize(this.scale.gameSize);
  }

  public resize(gameSize: Phaser.Structs.Size): void {
    super.resize(gameSize);

    const { width, height } = gameSize;

    // resize the background menu to fit the game size
    if (this.backgroundMenu) {
      Align.scaleGameObjectToGameSize(this.backgroundMenu, gameSize, 0.8);
      this.grid.placeGameObjectAtIndex(97, this.backgroundMenu);
    }

    if (this.iconsContainer) {
      this.iconsContainer.setScale(1.3 * (width / height));
      this.grid.placeGameObjectAtIndex(17.5, this.iconsContainer);
    }

    // resize experience text
    if (this.currentExperienceText) {
      Align.scaleGameObjectToGameWidth(this.currentExperienceText, this.sceneWidth, 0.3);
      this.grid.placeGameObjectAtIndex(167, this.currentExperienceText);
    }
  }

  public update(): void {
    if (this.coreSkillText) {
      this.coreSkillText.setText(`Lvl: ${IdleGame.getInstance().player.upgrades[1].level}`);
    }
    if (this.coreDpsSkillText) {
      this.coreDpsSkillText.setText(`Lvl: ${IdleGame.getInstance().player.upgrades[2].level}`);
    }
    if (this.currentExperienceText) {
      this.currentExperienceText.setText(`Current EXP: ${this.player.experience}`);
    }
  }

  private createPlayButton(player: Player, callback: () => void): Phaser.GameObjects.Container {
    const container = this.add.container();
    const button = new Button({
      scene: this,
      defaultImageKey: AssetKey.UI,
      hoverButtonImageKey: AssetKey.UI,
      clickCallBack: callback,
      defaultImageFrame: 'blue_button01.png',
      hoverButtonImageFrame: 'blue_button00.png',
    });
    container.add(button.image);

    const playAgainText = this.add
      .text(0, 0, 'Buy', {
        color: 'white',
        fontSize: '32px',
      })
      .setOrigin(0.5);
    container.add(playAgainText);
    return container;
  }

  private addAiIcon(): void {
    // add icon for dps upgrade skill
    const coreDpsSkillContainer = this.add.container(0, 500);
    const coreDpsSkillIcon = this.add.image(0, 0, AssetKey.GAMEPAD).setOrigin(0.5, 0);
    this.coreDpsSkillText = this.add
      .text(coreDpsSkillIcon.displayWidth, 0, `Lvl: ${this.player.upgrades[3].level}`, Config.UI_PHASER_TEXT_STYLE)
      .setOrigin(0, 0.5);
    const coreDpsSkillDescriptionText = this.add
      .text(coreDpsSkillIcon.displayWidth, 0, 'Automation', Config.UI_PHASER_TEXT_STYLE)
      .setOrigin(0, -1);
    const coreDpsSkillCostText = this.add
      .text(
        coreDpsSkillDescriptionText.displayWidth + coreDpsSkillDescriptionText.x + 100,
        coreDpsSkillDescriptionText.y * 2 + 25,
        `Cost: ${this.player.upgrades[3].currentCost}exp`,
        {
          ...Config.UI_PHASER_TEXT_STYLE,
          fontSize: '42px',
        },
      )
      .setOrigin(0, -1);
    const coreDpsSkillBuyButton = this.createPlayButton(this.player, () => {
      // TODO: add logic to prevent click and disable button if not enough money
      const bought = this.player.buyUpgrade(2);
      if (bought) {
        this.coreDpsSkillText.setText(`Lvl: ${this.player.upgrades[3].level}`);
        coreDpsSkillCostText.setText(`Cost: ${this.player.upgrades[3].currentCost}exp`);
      }
    });
    coreDpsSkillBuyButton.setPosition(
      coreDpsSkillDescriptionText.displayWidth * 1.5 + coreDpsSkillDescriptionText.x + 30,
      coreDpsSkillDescriptionText.y * 2,
    );
    coreDpsSkillBuyButton.setScale(2, 2);

    // add to container
    coreDpsSkillContainer.add(coreDpsSkillIcon);
    coreDpsSkillContainer.add(this.coreDpsSkillText);
    coreDpsSkillContainer.add(coreDpsSkillDescriptionText);
    coreDpsSkillContainer.add(coreDpsSkillBuyButton);
    coreDpsSkillContainer.add(coreDpsSkillCostText);
    this.iconsContainer.add(coreDpsSkillContainer);
  }
}
