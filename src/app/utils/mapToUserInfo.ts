import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfo } from '../interfaces/user-info.interface';
import firebase from 'firebase';
import User = firebase.User;

export function mapToUserInfo(
  observable: Observable<User>
): Observable<UserInfo> {
  return observable.pipe(
    map((user) => {
      if (user) {
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
