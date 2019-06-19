
export class ListaAlugadosModel {
    constructor (
        public idLivro?: number,
        public tituloLivro?: string,
        public idCliente?: number,
        public nomeCliente?: string,
        public dataEntrega?: string
    ) { }
}