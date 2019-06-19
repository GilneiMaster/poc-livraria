import { ClienteModel } from './cliente.model';
import { LivroModel } from './livro.model';

export class LocacaoModel {
    constructor (
        public id?: number,
        public cliente?: ClienteModel,
        public livros?: LivroModel[],
        public dataEntrega?: string
    ) { }
}