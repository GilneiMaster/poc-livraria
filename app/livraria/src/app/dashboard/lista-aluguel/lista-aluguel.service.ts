import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { LivroModel } from '../models/livro.model';
import { LocacaoModel } from '../models/locacao.model';

@Injectable({
    providedIn: 'root'
})
export class ListaAluguelService {
    
    constructor(
        private httpClient: HttpClient
    ) {}

    public buscarAlugados(): Observable<LocacaoModel[]> {
        return this.httpClient.get<LocacaoModel[]>('http://localhost:9001/livros-alugados');
    }

    public devolverLivro(livro: LivroModel): Observable<LocacaoModel[]> {
        return this.httpClient.post<LocacaoModel[]>(`http://localhost:9001/devolucao-livro`, livro);
    }
}