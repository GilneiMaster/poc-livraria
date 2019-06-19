import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { TabelaComponent } from '../shared/tabela/tabela.component';
import { ListaLivrosComponent } from './lista-livros/lista-livros.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListaAluguelComponent } from './lista-aluguel/lista-aluguel.component';
import { CadastroLivrosComponent } from './cadastro-livros/cadastro-livros.component';
import { DetalheLivroComponent } from './detalhe-livro/detalhe-livro.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { AluguelLivroComponent } from './aluguel-livro/aluguel-livro.component';
import { GuardaRotaService } from './services/guarda-rota.service';

@NgModule({
	declarations: [
		DashboardComponent,
		MenuComponent,
		TabelaComponent,
		ModalComponent,
		ListaLivrosComponent,
		ListaAluguelComponent,
		CadastroLivrosComponent,
		DetalheLivroComponent,
		AluguelLivroComponent
	],
	imports: [
		BrowserModule,
		DashboardRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [
		GuardaRotaService
	],
})
export class DashboardModule { }
