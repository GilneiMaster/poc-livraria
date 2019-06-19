import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLivrosComponent } from './cadastro-livros.component';

describe('CadastroLivrosComponent', () => {
  let component: CadastroLivrosComponent;
  let fixture: ComponentFixture<CadastroLivrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroLivrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
