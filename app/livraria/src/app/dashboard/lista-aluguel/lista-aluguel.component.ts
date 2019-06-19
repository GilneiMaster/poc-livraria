import { Component, OnInit } from '@angular/core';
import { LocacaoModel } from '../models/locacao.model';
import { ListaAluguelService } from './lista-aluguel.service';
import { LivroModel } from '../models/livro.model';

@Component({
	selector: 'app-lista-aluguel',
	templateUrl: './lista-aluguel.component.html',
	styleUrls: ['./lista-aluguel.component.css']
})
export class ListaAluguelComponent implements OnInit {

	public cabecalho: string[] = ['#', 'Cliente', 'Título'];
	public listaLivrosAlugados: LocacaoModel[];
	public livroSelecionado: LivroModel = new LivroModel();

	constructor(
		private listaAluguelService: ListaAluguelService
	) { }

	ngOnInit() {
		this.buscarAlugados();
	}

	private buscarAlugados() {
		this.listaAluguelService.buscarAlugados()
			.subscribe(
				res => this.listaLivrosAlugados = res,
				err => console.error(err)
			);
	}

	public selecionarLivroDevolucao(livro: LivroModel) {
		this.livroSelecionado = livro;
	}

	public devolverLivro() {
		this.listaAluguelService.devolverLivro(this.livroSelecionado)
			.subscribe(
				res => this.listaLivrosAlugados = res,
				err => console.error(err)
			);
	}
}
