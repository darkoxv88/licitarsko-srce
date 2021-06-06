import { environment } from "src/environments/environment";

import { RgbaColorEntity } from "../core/entities/other/rgba-color-entity";

export class ColorHandlers {
  public static byte(value: number): number {
    try {
      value = Math.round(value);

      if (value < 0) return 0;
      if (value > 255) return 255;

      return value;
    } catch(err) {
      return 0;
    }
  }

  public static rgbaToHex(color: RgbaColorEntity): string {
    let out: string = '#';

    try {
      let r = color.r.toString(16);
      let g = color.g.toString(16);
      let b = color.b.toString(16);

      if (r.length == 1) r = '0' + r;
      if (g.length == 1) g = '0' + g;
      if (b.length == 1) b = '0' + b;

      out = out + r + g + b;
    } catch (err) {
      if (environment.production == false) {
        console.log(err);
      }

      out = '#000000'
    }

    return out;
  }
}
