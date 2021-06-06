import { SafeUri } from './safe-uri';

declare var p5jsUtility: any;

export class FileHandlers {

  public static downloadFile(data: any, filename: string): void {
    p5jsUtility?.save([SafeUri.encode(data.trim())], filename + 'txt');
  }

  public static loadFile(file: File, type?: '' | 'text' | undefined): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!FileReader) {
        console.error('There was an unknown error. Check if FileReader is supported!');
        reject(null);
        return;
      }
  
      if (file instanceof File !== true) {
        console.error('There is no instance of File class to read from.');
        reject(null);
        return;
      }
  
      var reader: FileReader = new FileReader();
  
      reader.onload = function(ev: ProgressEvent<FileReader>) {
        if (typeof reader.result == 'string') resolve(reader.result);
        else reject(ev);
      };
  
      reader.onerror = reject;
  
      switch(type) {
        case 'text': {
          reader.readAsText(file);
          break;
        }
        default: {
          reader.readAsDataURL(file);
          break;
        }
      }
    });
  }

  public static loadImage(source: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      var image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = source;
    });
  }

  public static loadImageFromObject = function(source: File | Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      var reader: FileReader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (typeof reader.result == 'string') resolve(this.loadImage(reader.result));
        else reject(ev);
      };
      reader.onerror = reject;
      reader.readAsDataURL(source);
    });
  }

}
