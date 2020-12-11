import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validateImage',
})
export class ValidateImagePipe implements PipeTransform {
  defaultImage =
    'https://steamuserimages-a.akamaihd.net/ugc/885384897182110030/F095539864AC9E94AE5236E04C8CA7C2725BCEFF/';

  transform(value: string, type?: string): string {
    if (!value) {
      return this.defaultImage;
    }

    if (type === 'avatar') {
      return this.validateAvatar(value);
    }

    return value;
  }

  protected validateAvatar(value: string) {
    const prefix =
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/';
    const split = value.split('https://');
    return split.length === 2 ? value : prefix + value;
  }
}
