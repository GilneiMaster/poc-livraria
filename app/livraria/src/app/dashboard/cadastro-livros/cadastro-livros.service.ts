import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LivroModel } from '../models/livro.model';

@Injectable({
    providedIn: 'root'
})
export class CadastroLivrosService {
    
    constructor(
        private httpClient: HttpClient
    ) {}

    public cadastrarLivros(livro: LivroModel): Observable<string> {
        if (!livro.id) {
            return this.httpClient.post<string>('http://localhost:9001/livros', livro);
        } else {
            return this.httpClient.put<string>('http://localhost:9001/livros', livro);
        }
    }

    public buscarLivro(id: string): Observable<LivroModel> {
        return this.httpClient.get<LivroModel>(`http://localhost:9001/livros/${id}`);
    }
}