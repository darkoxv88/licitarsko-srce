export class RandomGenerator {

  public static idString(len: number): string {
    let possible: string = '123456789abcdefghijklmnopqrstuvwxyz'
    let out: string = '';
  
    for (let i = 0; i < len; i++) {
      out += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  
    return out;
  }

}
