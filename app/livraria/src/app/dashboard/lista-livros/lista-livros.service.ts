import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LivroModel } from '../models/livro.model';

@Injectable({
    providedIn: 'root'
})
export class ListaLivrosService {
    
    constructor(
        private httpClient: HttpClient
    ) {}

    public buscarLivros(): Observable<LivroModel[]> {
        return this.httpClient.get<LivroModel[]>('http://localhost:9001/livros');
    }

    public excluirLivro(livro: LivroModel) {
        return this.httpClient.delete(`http://localhost:9001/livros/${livro.id.toString()}`);
    }
}