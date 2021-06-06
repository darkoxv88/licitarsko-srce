export class SafeJson {
  public static encode<T>(data: T): string {
    try {
      return JSON.stringify(data);
    } catch(err) { }

    return 'null';
  }

  public static decode<T>(data: string): T {
    try {
      return (JSON.parse(data) as T);
    } catch(err) { }
    
    return null;
  }
}
