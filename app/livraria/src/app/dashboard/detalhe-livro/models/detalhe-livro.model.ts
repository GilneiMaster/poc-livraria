import { LivroModel } from '../../models/livro.model';
import { LocacaoModel } from '../../models/locacao.model';

export class DetalheLivroModel {
    constructor (
        public livro?: LivroModel,
        public locacao?: LocacaoModel
    ) { }
}