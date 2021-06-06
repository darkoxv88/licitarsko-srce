import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgIfExtensionsService {

  constructor() { }

  public ifIn(item: string, obj: any): boolean {
    if (typeof(item) !== 'string' || !obj) return false;
  
    try {
      if (item in obj) return true;
    } catch(err) {
      return false;
    }
  
    return false;
  }

  public ifInCheck(item: string, obj: any): boolean {
    if (typeof(item) !== 'string' || !obj) return false;
  
    try {
      if (item in obj) { 
        return !!obj[item]; 
      }

      return false;
    } catch(err) {
      return false;
    }
  
    return false;
  }

}
