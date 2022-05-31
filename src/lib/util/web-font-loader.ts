import Phaser from 'phaser';
import * as WebFontLoader from 'webfontloader';

/*
Original Code from: https://blog.ourcade.co/posts/2020/phaser-3-google-fonts-webfontloader/
*/

enum SupportedServices {
  GOOGLE = 'google',
}

export default class WebFontFile extends Phaser.Loader.File {
  private readonly fontNames: string[];
  private readonly service: SupportedServices;

  constructor(loader: Phaser.Loader.LoaderPlugin, fontNames: string | string[], service = SupportedServices.GOOGLE) {
    super(loader, {
      type: 'webfont',
      key: fontNames.toString(),
    });

    this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames];
    this.service = service;
  }

  load(): void {
    const config = {
      active: () => {
        this.loader.nextFile(this, true);
      },
    };

    switch (this.service) {
      case SupportedServices.GOOGLE:
        config[SupportedServices.GOOGLE] = {
          families: this.fontNames,
        };
        break;

      default:
        throw new Error('Unsupported font service');
    }

    WebFontLoader.load(config);
  }
}
