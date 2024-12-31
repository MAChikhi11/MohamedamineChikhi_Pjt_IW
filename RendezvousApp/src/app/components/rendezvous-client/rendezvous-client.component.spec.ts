import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousClientComponent } from './rendezvous-client.component';

describe('RendezvousClientComponent', () => {
  let component: RendezvousClientComponent;
  let fixture: ComponentFixture<RendezvousClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezvousClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendezvousClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
