import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ListaLivrosComponent } from './lista-livros/lista-livros.component';
import { ListaAluguelComponent } from './lista-aluguel/lista-aluguel.component';
import { CadastroLivrosComponent } from './cadastro-livros/cadastro-livros.component';
import { DetalheLivroComponent } from './detalhe-livro/detalhe-livro.component';
import { AluguelLivroComponent } from './aluguel-livro/aluguel-livro.component';
import { GuardaRotaService } from './services/guarda-rota.service';

const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
		component: DashboardComponent,
		canActivate: [GuardaRotaService],
        children: [
			{ path: '', component: ListaLivrosComponent },
			{ path: 'livros-alugados', component: ListaAluguelComponent, canActivate: [GuardaRotaService] },
			{ path: 'cadastro-livros/:id', component: CadastroLivrosComponent, canActivate: [GuardaRotaService] },
			{ path: 'cadastro-livros', component: CadastroLivrosComponent, canActivate: [GuardaRotaService] },
			{ path: 'detalhe-livro/:id', component: DetalheLivroComponent, canActivate: [GuardaRotaService] },
			{ path: 'detalhe-livro', redirectTo: '', pathMatch: 'full', canActivate: [GuardaRotaService] },
			{ path: 'aluguel-livros', component: AluguelLivroComponent, canActivate: [GuardaRotaService] }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(dashboardRoutes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }