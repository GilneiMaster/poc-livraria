import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LivroModel } from '../models/livro.model';
import { DetalheLivroModel } from './models/detalhe-livro.model';

@Injectable({
    providedIn: 'root'
})
export class DetalheLivroService {
    
    constructor(
        private httpClient: HttpClient
    ) {}

    public buscarLivro(id: string): Observable<DetalheLivroModel> {
        return this.httpClient.get<DetalheLivroModel>(`http://localhost:9001/detalhe-livro/${id}`);
    }
}