export class SafeUri {
  public static encode(data: string): string {
    try {
      return encodeURIComponent(data);
    } catch (err) {
      return data;
    }
  }

  public static decode(data: string): string {
    try {
      return decodeURIComponent(data);
    } catch (err) {
      return data;
    }
  }
}
