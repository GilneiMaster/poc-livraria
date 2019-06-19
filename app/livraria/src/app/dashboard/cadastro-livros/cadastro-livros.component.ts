import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { LivroModel } from './../models/livro.model';
import { CadastroLivrosService } from './cadastro-livros.service';
import { CadastroLivrosEnum } from './enum/cadastro-livros.enum';
import { of } from 'rxjs';

@Component({
	selector: 'app-cadastro-livros',
	templateUrl: './cadastro-livros.component.html',
	styleUrls: ['./cadastro-livros.component.css']
})
export class CadastroLivrosComponent implements OnInit {

	public livro = new LivroModel();
	public controleTela: number;
	public cadastroLivrosEnum = CadastroLivrosEnum;
	public msgErro: any = null;

	constructor(
		private cadastroLivroService: CadastroLivrosService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.controleTela = CadastroLivrosEnum.FORMULARIO_CADASTRO;
		this.buscarLivros();
	}

	private buscarLivros() {
		this.route.paramMap.pipe(
			switchMap((params: ParamMap) => params.getAll('id')),
			switchMap(res => this.cadastroLivroService.buscarLivro(res))
		)
			.subscribe(res => {
				this.livro = res;
			});
	}

	public cadastrarLivro(): void {
		this.cadastroLivroService.cadastrarLivros(this.livro)
			.subscribe(
				() => this.mostrarRetornoCadastro(CadastroLivrosEnum.MENSAGEM_SUCESSO),
				err => this.mostrarRetornoCadastro(CadastroLivrosEnum.MENSAGEM_ERRO, err)
			);
	}

	private mostrarRetornoCadastro(status: CadastroLivrosEnum, erro?: any): void {
		if (erro) {
			this.msgErro = erro;
		}
		this.controleTela = status;
	}

	public tentarNovamente(): void {
		this.controleTela = CadastroLivrosEnum.FORMULARIO_CADASTRO;
	}

}
