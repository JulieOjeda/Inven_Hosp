import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fallbacksrc',
  standalone: false
})
export class FallbacksrcPipe implements PipeTransform {
  transform(value: string | null | undefined, fallback: string): string {
    return value && value.trim() ? value : fallback;
  }
}
