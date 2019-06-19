import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LivroModel } from '../models/livro.model';
import { LocacaoModel } from '../models/locacao.model';

@Injectable({
    providedIn: 'root'
})
export class AluguelLivroService {
    
    constructor(
        private httpClient: HttpClient
    ) {}

    public cadastrarLocacao(locacao: LocacaoModel): Observable<string> {
        return this.httpClient.post<string>('http://localhost:9001/cadastrar-locacao', locacao);
    }

    public buscarDadosParaLocacao(): Observable<any> {
        return this.httpClient.get<any>('http://localhost:9001/dados-locacao');
    }
}