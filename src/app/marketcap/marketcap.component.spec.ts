import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketcapComponent } from './marketcap.component';

describe('MarketcapComponent', () => {
  let component: MarketcapComponent;
  let fixture: ComponentFixture<MarketcapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketcapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
