export class LivroModel {
    constructor (
        public id?: number,
        public author?: string,
        public country?: string,
        public link?: string,
        public pages?: number,
        public title?: string,
        public year?: number,
        public locado?: boolean
    ) { }
}