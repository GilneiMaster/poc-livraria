import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { DetalheLivroService } from './detalhe-livro.service';
import { LivroModel } from '../models/livro.model';
import { LocacaoModel } from '../models/locacao.model';

@Component({
	selector: 'app-detalhe-livro',
	templateUrl: './detalhe-livro.component.html',
	styleUrls: ['./detalhe-livro.component.css']
})
export class DetalheLivroComponent implements OnInit {

	public livro: LivroModel = new LivroModel();
	public locacao: LocacaoModel = new LocacaoModel();

	constructor(
		private route: ActivatedRoute,
		private detalheLivroService: DetalheLivroService
	) { }

	ngOnInit() {
		this.buscarLivros();
	}

	private buscarLivros() {
		this.route.paramMap.pipe(
			switchMap((params: ParamMap) => params.getAll('id')),
			switchMap(res => this.detalheLivroService.buscarLivro(res))
		)
			.subscribe(res => {
				this.livro = res.livro;
				this.locacao = res.locacao;
			});
	}

}
