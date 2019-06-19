import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioModel } from './models/usuario.model';
import { LoginService } from './login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public usuario: UsuarioModel;

	constructor(
		private loginService: LoginService,
		private router: Router
	) {
		this.usuario = new UsuarioModel();
	}

	ngOnInit() { }

	public logar() {
		this.loginService.logar(this.usuario)
			.subscribe(
				res => {
					localStorage['token'] = 'xptoh26410x5=50';
					this.router.navigate(['dashboard']);

				},
				() => alert('Usuário e/ou senha incorretos')
			);
	}

}
