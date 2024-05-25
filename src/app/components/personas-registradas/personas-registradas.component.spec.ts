import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasRegistradasComponent } from './personas-registradas.component';

describe('PersonasRegistradasComponent', () => {
  let component: PersonasRegistradasComponent;
  let fixture: ComponentFixture<PersonasRegistradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonasRegistradasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonasRegistradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
