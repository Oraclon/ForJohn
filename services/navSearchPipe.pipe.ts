import { Pipe, PipeTransform } from '@angular/core';
import { LandmarkModel } from './landmarksService.service';

@Pipe({ name: 'navSearchPipe' })
export class NavSearchPipe implements PipeTransform {
  
  transform(items: LandmarkModel[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    
    searchText = searchText.toLocaleLowerCase();

    return items.filter(item => {
      return item.title.toLocaleLowerCase().includes(searchText);
    });
  }
}

