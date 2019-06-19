import { Component, OnInit } from '@angular/core';
import { LivroModel } from '../models/livro.model';
import { ListaLivrosService } from './lista-livros.service';

@Component({
	selector: 'app-lista-livros',
	templateUrl: './lista-livros.component.html',
	styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnInit {

	public cabecalho: string[] = ['#', 'Título', 'Autor', 'Ano', 'Status', ''];

	public livros: LivroModel[];
	public livroSelecionado: LivroModel = new LivroModel();

	constructor(
		private listaLivrosService: ListaLivrosService
	) { }

	ngOnInit() {
		this.buscarLivros();
	}

	public selecionarLivroExclusao(livro: LivroModel) {
		this.livroSelecionado = livro;
	}

	public excluirLivro() {
		this.listaLivrosService.excluirLivro(this.livroSelecionado)
			.subscribe(
				() => this.buscarLivros(),
				err => alert(err.message)
			);
	}

	private buscarLivros() {
		this.listaLivrosService.buscarLivros()
			.subscribe(res => this.livros = res);
	}

}
