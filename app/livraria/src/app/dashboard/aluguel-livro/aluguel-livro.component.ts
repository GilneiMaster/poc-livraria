import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AluguelLivrosEnum } from './enum/aluguel-livros.enum';
import { ClienteModel } from '../models/cliente.model';
import { LivroModel } from '../models/livro.model';
import { LocacaoModel } from '../models/locacao.model';
import { AluguelLivroService } from './aluguel-livro.service';

@Component({
	selector: 'app-aluguel-livro',
	templateUrl: './aluguel-livro.component.html',
	styleUrls: ['./aluguel-livro.component.css']
})
export class AluguelLivroComponent implements OnInit {

	public controleTela: number;
	public aluguelLivrosEnum = AluguelLivrosEnum;
	public msgErro: any = null;

	public clientes: ClienteModel[];
	public livros: LivroModel[];
	public locacao: LocacaoModel = new LocacaoModel();
	public livroSelecionado: number;
	public clienteSelecionado: number;
	public desabilitaCliente: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private aluguelLivroService: AluguelLivroService
	) {
		this.locacao.livros = new Array<LivroModel>();
	}

	ngOnInit() {
		this.controleTela = AluguelLivrosEnum.FORMULARIO_CADASTRO;
		this.buscarDadosParaAluguel();
	}

	private buscarDadosParaAluguel() {
		this.aluguelLivroService.buscarDadosParaLocacao()
			.subscribe(res => {
				console.log(res);
				this.livros = res.livros;
				this.clientes = res.clientes;
			});
	}


	public adicionarLivro() {
		this.locacao.livros.push(
			this.livros.find(livro => livro.id == this.livroSelecionado)
		);
		this.livros = this.livros.filter(livro => livro.id != this.livroSelecionado);
		this.livroSelecionado = null;
	}

	public adicionarCliente() {
		this.locacao.cliente = this.clientes.find(cliente => cliente.id == this.clienteSelecionado);
		this.clienteSelecionado = null;
		this.desabilitaCliente = true;
	}

	public removerCliente() {
		this.locacao.cliente = null;
		this.clienteSelecionado = null;
		this.desabilitaCliente = false;
	}

	public removerLivro(livro: LivroModel): void {
		this.livros.unshift(livro);
		this.locacao.livros = this.locacao.livros.filter(livroLocacao => livroLocacao.id != livro.id);
	}

	public desabilitarBotaoCadastro(): boolean {
		return !this.locacao.cliente || !this.locacao.dataEntrega || !(this.locacao.livros.length > 0);
	}

	public cadastrarAluguel() {
		this.aluguelLivroService.cadastrarLocacao(this.locacao)
			.subscribe(
				() => this.mostrarRetornoCadastro(AluguelLivrosEnum.MENSAGEM_SUCESSO),
				err => this.mostrarRetornoCadastro(AluguelLivrosEnum.MENSAGEM_ERRO, err)
			);
	}

	private mostrarRetornoCadastro(status: AluguelLivrosEnum, erro?: any): void {
		if (erro) {
			this.msgErro = erro;
		}
		this.controleTela = status;
	}

	public tentarNovamente(): void {
		this.controleTela = AluguelLivrosEnum.FORMULARIO_CADASTRO;
	}

}
