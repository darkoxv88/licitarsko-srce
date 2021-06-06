export class P5Utility {
  public static checkIfClickIn(x: number, y: number, size: number): boolean {
    if (x < 0 || y < 0) return false;
  
    if (x > size || y > size) return false;
  
    return true;
  }
}
