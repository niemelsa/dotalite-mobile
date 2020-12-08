import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayerInfoComponent } from './player-info.component';

describe('ProfileInfoComponent', () => {
  let component: PlayerInfoComponent;
  let fixture: ComponentFixture<PlayerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerInfoComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
