import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfo } from '../interfaces/user-info.interface';
import firebase from 'firebase';
import User = firebase.User;

export function mapToUserInfo(obs: Observable<User>): Observable<UserInfo> {
  return obs.pipe(
    map((user) => {
      if (user) {
        console.log('id token: ', user.getIdToken());

        const {
          uid,
          providerId,
          displayName,
          photoURL,
          phoneNumber,
          email,
        } = user;

        return {
          uid,
          providerId,
          displayName,
          photoURL,
          phoneNumber,
          email,
        };
      }

      return user;
    })
  );
}
