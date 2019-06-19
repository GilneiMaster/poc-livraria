import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UsuarioModel } from './models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    constructor(
        private httpClient: HttpClient
    ) {}

    public logar(usuario: UsuarioModel): Observable<UsuarioModel> {
        return this.httpClient.get<UsuarioModel>(`http://localhost:9001/login`,{params: {'email': usuario.email, 'senha': usuario.senha}});
    }
}