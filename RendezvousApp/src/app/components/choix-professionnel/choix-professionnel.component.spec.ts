import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixProfessionnelComponent } from './choix-professionnel.component';

describe('ChoixProfessionnelComponent', () => {
  let component: ChoixProfessionnelComponent;
  let fixture: ComponentFixture<ChoixProfessionnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoixProfessionnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoixProfessionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
