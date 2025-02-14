import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToNormal',
  standalone: false
})
export class CamelCaseToNormalPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    
    return value
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Inserta espacios antes de mayúsculas
      .toLowerCase() // Convierte todo a minúsculas
      .replace(/^./, str => str.toUpperCase()); // Capitaliza la primera letra
  }

}
