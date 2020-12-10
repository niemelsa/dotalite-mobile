import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage',
})
export class DefaultImagePipe implements PipeTransform {
  // hard coded value for now
  defaultImage =
    'https://steamuserimages-a.akamaihd.net/ugc/885384897182110030/F095539864AC9E94AE5236E04C8CA7C2725BCEFF/';

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? value : this.defaultImage;
  }
}
