import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAluguelComponent } from './lista-aluguel.component';

describe('ListaAluguelComponent', () => {
  let component: ListaAluguelComponent;
  let fixture: ComponentFixture<ListaAluguelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAluguelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAluguelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
