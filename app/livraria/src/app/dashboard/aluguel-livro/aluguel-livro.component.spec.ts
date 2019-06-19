import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AluguelLivroComponent } from './aluguel-livro.component';

describe('AluguelLivroComponent', () => {
  let component: AluguelLivroComponent;
  let fixture: ComponentFixture<AluguelLivroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AluguelLivroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AluguelLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
