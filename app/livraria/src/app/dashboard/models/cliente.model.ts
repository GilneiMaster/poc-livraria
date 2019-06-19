export class ClienteModel {
    constructor (
        public id?: number,
        public nome?: string,
        public idade?: number,
        public cpf?: string,
        public rg?: string,
        public data_nasc?: string,
        public signo?: string,
        public mae?: string,
        public pai?: string,
        public email?: string,
        public senha?: string,
        public cep?: string,
        public endereco?: string,
        public numero?: string,
        public bairro?: string,
        public cidade?: string,
        public estado?: string,
        public telefone_fixo?: string,
        public celular?: string,
        public altura?: string,
        public peso?: number,
        public tipo_sanguineo?: string,
        public cor?: string
    ){ }
}