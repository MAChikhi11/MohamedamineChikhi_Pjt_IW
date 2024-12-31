import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousProfessionelComponent } from './rendezvous-professionel.component';

describe('RendezvousProfessionelComponent', () => {
  let component: RendezvousProfessionelComponent;
  let fixture: ComponentFixture<RendezvousProfessionelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezvousProfessionelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendezvousProfessionelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
