import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

// export function jwtOptionsFactory(storage) {
//   return {
//     tokenGetter: async () => {
//       const token = await storage.get({ key: 'auth-token' });
//       console.log('GETTER token: ', token.value);
//       return token.value;
//     },
//     allowedDomains: ['localhost:3000'],
//   };
// }

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: async () => {
          const token = await Storage.get({ key: 'auth-token' });
          return token.value;
        },
        allowedDomains: ['localhost:3000'],
      },
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
