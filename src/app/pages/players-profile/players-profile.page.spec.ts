import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayersProfilePage } from './players-profile.page';

describe('ProfilePage', () => {
  let component: PlayersProfilePage;
  let fixture: ComponentFixture<PlayersProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersProfilePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
