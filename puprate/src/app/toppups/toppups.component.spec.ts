import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppupsComponent } from './toppups.component';

describe('ToppupsComponent', () => {
  let component: ToppupsComponent;
  let fixture: ComponentFixture<ToppupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToppupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToppupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
