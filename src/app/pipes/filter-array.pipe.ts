import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray',
})
export class FilterArrayPipe implements PipeTransform {
  transform(value: any[], amount: number = 50, type?: string): any[] {
    if (this.isEmpty(value)) {
      return null;
    }

    let filtered = this.filterAmount(value, amount);

    switch (type) {
      case 'pro':
        filtered = this.filterProPlayers(filtered);
        break;
      case 'tournament':
        filtered = this.filterTournaments(filtered);
        break;
    }

    return filtered;
  }

  protected filterProPlayers(arr: any[]) {
    return arr.filter((item) => item.proSteamAccount);
  }

  protected filterAmount(arr, amount) {
    return arr.filter((item, index) => index < amount);
  }

  protected isEmpty(arr: any[]): boolean {
    return arr.length === 0;
  }

  protected filterTournaments(arr: any[]) {
    return arr;
  }
}
