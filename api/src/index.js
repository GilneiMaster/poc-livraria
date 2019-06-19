const express = require('express');
var bodyParser = require('body-parser');

// const mongodb = require('mongodb');

const app = express();

var db = retornarDB();


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/login', (req, res) => {
    var login = req.query;
    var usuario = db.usuarios.find(usuario => usuario.email == login.email && usuario.senha == login.senha);
    if (usuario) {
        res.status(202).send(usuario);
    } else {
        res.status(400).send({
            message: 'Usuário ou senha inválidos'
        });
    }
});

app.get('/livros', (req, res) => {
    res.send(db.livros);
});

app.get('/livros/:id', (req, res) => {
    var id = req.params.id;
    var retorno = buscarLivro(id);
    if (retorno) {
        res.send(retorno);
    } else {
        res.status(400).send({
            message: 'Livro não encontrado'
        });
    }
});

app.post('/livros', (req, res) => {
    var livro = req.body;
    livro.locado = false;
    livro.id = ++db.ultimo_id_livro;
    try {
        db.livros.push(livro);
        res.status(202).send();
    } catch (err) {
        res.status(400).send(err);
    }
});

app.put('/livros', (req, res) => {
    var livro = req.body;
    var index = null;

    index = db.livros.findIndex(livroDB => livroDB.id == livro.id);

    if (!isNaN(index) && index >= 0 && index <= db.ultimo_id_livro) {
        db.livros[index] = livro;
        res.status(202).send();
    } else {
        res.status(400).send({
            message: "Erro ao realizar a atualização do cadastro do livro"
        });
    }
});

app.delete('/livros/:id', (req, res) => {
    var id = req.params.id;
    if (db.livros.some(livro => livro.id == id && !livro.locado)) {
        db.livros = db.livros.filter(livro => livro.id != id);
        res.status(202).send();
    } else {
        res.status(400).send({
            message: 'Livro não encontrado'
        });
    }
});

app.get('/detalhe-livro/:id', (req, res) => {
    var id = req.params.id;
    res.send({ livro: buscarLivro(id), locacao: buscarLocacaoLivro(id) });
});

app.get('/livros-alugados', (req, res) => {
    res.send(db.locacao);
});

app.get('/dados-locacao', (req, res) => {
    res.send({
        livros: listarLivrosDisponiveis(),
        clientes: db.clientes
    });
});

app.post('/cadastrar-locacao', (req, res) => {
    var locacao = req.body;
    if (locacao) {
        db.locacao.push(locacao);
        db.livros.forEach(livro => {
            if (locacao.livros.some(livroLocado => livroLocado.id == livro.id)) {
                atualizarStatusLivro(livro.id, true);
            }
        });
        res.status(202).send();
    } else {
        res.status(400).send({
            message: 'Erro ao cadastrar a Locação'
        });
    }

});

app.post('/devolucao-livro', (req, res) => {
    var id = req.body.id;
    atualizarListaAluguel(id);
    atualizarStatusLivro(id, false);
    res.send(db.locacao);
});

app.get('/clientes', (req, res) => {
    res.send(db.clientes);
});

app.get('/clientes/:id', (req, res) => {
    var id = req.params.id;
    var retorno = db.clientes.find(cliente => cliente.id == id);
    if (retorno) {
        res.send(retorno);
    } else {
        res.status(400).send({
            message: 'Cliente não encontrado'
        });
    }
});

app.listen(9001, '0.0.0.0', () => {
    console.log('Listening on port 9001');
});

function atualizarStatusLivro(id, status) {
    db.livros = db.livros.map(livro => {
        if (livro.id == id) {
            livro.locado = status;
        }
        return livro;
    });
}

function atualizarListaAluguel(id) {
    db.locacao = db.locacao.filter(loc => {
        loc.livros = loc.livros.filter(livro => livro.id !== id);
        return loc.livros.length > 0;
    });
}

function buscarLivro(id) {
    return db.livros.find(livro => livro.id == id) || null;
}

function buscarLocacaoLivro(id) {
    return db.locacao.find(loc => loc.livros.some(livro => livro.id == id)) || null;
}

function listarLivrosDisponiveis() {
    return db.livros.filter(livro => !livro.locado);
}

function retornarDB() {
    return {
        "ultimo_id_livro": 10,
        "ultimo_id_cliente": 10,
        "ultimo_id_locacao": 1,
        "usuarios": [
            {
                "id": 1,
                "user": "Fulano de Tal",
                "email": "teste@teste.com",
                "senha": "teste123"
            }
        ],
        "locacao": [
            {
                "id": 1,
                "cliente": {
                    "id": 1,
                    "nome": "Luiz Marcelo Guilherme da Rocha",
                    "idade": 50,
                    "cpf": "44899265530",
                    "rg": "435296486",
                    "data_nasc": "12\/07\/1969",
                    "signo": "Câncer",
                    "mae": "Fátima Juliana Vanessa",
                    "pai": "Igor Sérgio da Rocha",
                    "email": "luizmarceloguilhermedarocha..luizmarceloguilhermedarocha@dddrin.com.br",
                    "senha": "34hs4e8l9d",
                    "cep": "68901710",
                    "endereco": "Avenida João Gualberto da Silva",
                    "numero": 519,
                    "bairro": "Nova Esperança",
                    "cidade": "Macapá",
                    "estado": "AP",
                    "telefone_fixo": "9628633617",
                    "celular": "96985779441",
                    "altura": "1,65",
                    "peso": 93,
                    "tipo_sanguineo": "B+",
                    "cor": "azul"
                },
                "livros": [
                    {
                        "id": 1,
                        "author": "Chinua Achebe",
                        "country": "Nigeria",
                        "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
                        "pages": 209,
                        "title": "Things Fall Apart",
                        "year": 1958,
                        "locado": true
                    },
                    {
                        "id": 2,
                        "author": "Hans Christian Andersen",
                        "country": "Denmark",
                        "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
                        "pages": 784,
                        "title": "Fairy tales",
                        "year": 1836,
                        "locado": true
                    }
                ],
                "dataEntrega": "11/06/2019"
            }
        ],
        "livros": [
            {
                "id": 1,
                "author": "Chinua Achebe",
                "country": "Nigeria",
                "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
                "pages": 209,
                "title": "Things Fall Apart",
                "year": 1958,
                "locado": true
            },
            {
                "id": 2,
                "author": "Hans Christian Andersen",
                "country": "Denmark",
                "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
                "pages": 784,
                "title": "Fairy tales",
                "year": 1836,
                "locado": true
            },
            {
                "id": 3,
                "author": "Dante Alighieri",
                "country": "Italy",
                "link": "https://en.wikipedia.org/wiki/Divine_Comedy\n",
                "pages": 928,
                "title": "The Divine Comedy",
                "year": 1315,
                "locado": false
            },
            {
                "id": 4,
                "author": "Unknown",
                "country": "Sumer and Akkadian Empire",
                "link": "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh\n",
                "pages": 160,
                "title": "The Epic Of Gilgamesh",
                "year": -1700,
                "locado": false
            },
            {
                "id": 5,
                "author": "Unknown",
                "country": "Achaemenid Empire",
                "link": "https://en.wikipedia.org/wiki/Book_of_Job\n",
                "pages": 176,
                "title": "The Book Of Job",
                "year": -600,
                "locado": false
            },
            {
                "id": 6,
                "author": "Unknown",
                "country": "India/Iran/Iraq/Egypt/Tajikistan",
                "link": "https://en.wikipedia.org/wiki/One_Thousand_and_One_Nights\n",
                "pages": 288,
                "title": "One Thousand and One Nights",
                "year": 1200,
                "locado": false
            },
            {
                "id": 7,
                "author": "Unknown",
                "country": "Iceland",
                "link": "https://en.wikipedia.org/wiki/Nj%C3%A1ls_saga\n",
                "pages": 384,
                "title": "Nj\u00e1l's Saga",
                "year": 1350,
                "locado": false
            },
            {
                "id": 8,
                "author": "Jane Austen",
                "country": "United Kingdom",
                "link": "https://en.wikipedia.org/wiki/Pride_and_Prejudice\n",
                "pages": 226,
                "title": "Pride and Prejudice",
                "year": 1813,
                "locado": false
            },
            {
                "id": 9,
                "author": "Honor\u00e9 de Balzac",
                "country": "France",
                "link": "https://en.wikipedia.org/wiki/Le_P%C3%A8re_Goriot\n",
                "pages": 443,
                "title": "Le P\u00e8re Goriot",
                "year": 1835,
                "locado": false
            },
            {
                "id": 10,
                "author": "Samuel Beckett",
                "country": "Republic of Ireland",
                "link": "https://en.wikipedia.org/wiki/Molloy_(novel)\n",
                "pages": 256,
                "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
                "year": 1952,
                "locado": false
            }
        ],
        "clientes": [
            {
                "id": 1,
                "nome": "Luiz Marcelo Guilherme da Rocha",
                "idade": 50,
                "cpf": "44899265530",
                "rg": "435296486",
                "data_nasc": "12\/07\/1969",
                "signo": "Câncer",
                "mae": "Fátima Juliana Vanessa",
                "pai": "Igor Sérgio da Rocha",
                "email": "luizmarceloguilhermedarocha@dddrin.com.br",
                "senha": "34hs4e8l9d",
                "cep": "68901710",
                "endereco": "Avenida João Gualberto da Silva",
                "numero": 519,
                "bairro": "Nova Esperança",
                "cidade": "Macapá",
                "estado": "AP",
                "telefone_fixo": "9628633617",
                "celular": "96985779441",
                "altura": "1,65",
                "peso": 93,
                "tipo_sanguineo": "B+",
                "cor": "azul"
            },
            {
                "id": 2,
                "nome": "Jéssica Rebeca Gabriela Carvalho",
                "idade": 60,
                "cpf": "06373218473",
                "rg": "137319381",
                "data_nasc": "05\/06\/1959",
                "signo": "Gêmeos",
                "mae": "Ana Carla",
                "pai": "Nicolas Murilo Cauê Carvalho",
                "email": "jjessicarebecagabrielacarvalho@esplanadaviagens.com.br",
                "senha": "JLjc46uFuJ",
                "cep": "76873171",
                "endereco": "Travessa Gaivota",
                "numero": 679,
                "bairro": "Setor 02",
                "cidade": "Ariquemes",
                "estado": "RO",
                "telefone_fixo": "6928242693",
                "celular": "69999686319",
                "altura": "1,62",
                "peso": 59,
                "tipo_sanguineo": "O-",
                "cor": "vermelho"
            },
            {
                "id": 3,
                "nome": "Milena Isabelly Analu da Rosa",
                "idade": 41,
                "cpf": "39808430414",
                "rg": "322199852",
                "data_nasc": "15\/10\/1978",
                "signo": "Libra",
                "mae": "Betina Luciana Flávia",
                "pai": "Rafael Manoel Emanuel da Rosa",
                "email": "mmilenaisabellyanaludarosa@hardquality.com.br",
                "senha": "XiqMlho9jE",
                "cep": "12244602",
                "endereco": "Rua Marcos Sattelmayer Aguiar",
                "numero": 220,
                "bairro": "Urbanova",
                "cidade": "São José dos Campos",
                "estado": "SP",
                "telefone_fixo": "1238269410",
                "celular": "12983516417",
                "altura": "1,51",
                "peso": 45,
                "tipo_sanguineo": "AB+",
                "cor": "vermelho"
            },
            {
                "id": 4,
                "nome": "Fernando Sebastião Matheus Sales",
                "idade": 27,
                "cpf": "29171822534",
                "rg": "348362122",
                "data_nasc": "23\/12\/1992",
                "signo": "Capricórnio",
                "mae": "Lorena Patrícia",
                "pai": "Samuel Bryan Raimundo Sales",
                "email": "ffernandosebastiaomatheussales@acaocontabilsjc.com.br",
                "senha": "EQqNAyBNFi",
                "cep": "76908668",
                "endereco": "Rua Governador Jorge Teixeira",
                "numero": 506,
                "bairro": "Nova Brasília",
                "cidade": "Ji-Paraná",
                "estado": "RO",
                "telefone_fixo": "6937435915",
                "celular": "69991581207",
                "altura": "1,83",
                "peso": 63,
                "tipo_sanguineo": "AB+",
                "cor": "preto"
            },
            {
                "id": 5,
                "nome": "Edson Gael Lucas Monteiro",
                "idade": 69,
                "cpf": "23981102819",
                "rg": "155015618",
                "data_nasc": "04\/08\/1950",
                "signo": "Leão",
                "mae": "Caroline Renata",
                "pai": "Otávio Hugo Renan Monteiro",
                "email": "eedsongaellucasmonteiro@santosdumonthospital.com",
                "senha": "8Gs553D8H5",
                "cep": "74910140",
                "endereco": "Rua Marquês de Tamandaré",
                "numero": 563,
                "bairro": "Parque Real de Goiânia",
                "cidade": "Aparecida de Goiânia",
                "estado": "GO",
                "telefone_fixo": "6226749536",
                "celular": "62987225083",
                "altura": "1,93",
                "peso": 88,
                "tipo_sanguineo": "B-",
                "cor": "roxo"
            },
            {
                "id": 6,
                "nome": "Adriana Carla Araújo",
                "idade": 73,
                "cpf": "64680774789",
                "rg": "461326395",
                "data_nasc": "13\/01\/1946",
                "signo": "Capricórnio",
                "mae": "Cecília Manuela",
                "pai": "Caio Cláudio Kaique Araújo",
                "email": "adrianacarlaaraujo-84@compuativa.com.br",
                "senha": "d3bJwc3i2k",
                "cep": "76824680",
                "endereco": "Rua Rugendas",
                "numero": 125,
                "bairro": "Pantanal",
                "cidade": "Porto Velho",
                "estado": "RO",
                "telefone_fixo": "6938168713",
                "celular": "69999282929",
                "altura": "1,66",
                "peso": 81,
                "tipo_sanguineo": "B+",
                "cor": "azul"
            },
            {
                "id": 7,
                "nome": "Calebe Marcos Vinicius Davi dos Santos",
                "idade": 29,
                "cpf": "86479499948",
                "rg": "176765992",
                "data_nasc": "04\/04\/1990",
                "signo": "Áries",
                "mae": "Eliane Isabelly Daiane",
                "pai": "Severino Bento Jorge dos Santos",
                "email": "calebemarcosviniciusdavidossantos-78@c-a-m.com",
                "senha": "GceDSzK6nK",
                "cep": "78050534",
                "endereco": "Rua Quatro",
                "numero": 712,
                "bairro": "Bela Vista",
                "cidade": "Cuiabá",
                "estado": "MT",
                "telefone_fixo": "6539779938",
                "celular": "65991176645",
                "altura": "1,99",
                "peso": 106,
                "tipo_sanguineo": "O+",
                "cor": "preto"
            },
            {
                "id": 8,
                "nome": "Nicole Rayssa Oliveira",
                "idade": 62,
                "cpf": "47523279376",
                "rg": "174394044",
                "data_nasc": "05\/09\/1957",
                "signo": "Virgem",
                "mae": "Mirella Jéssica Aline",
                "pai": "Augusto Levi Oliveira",
                "email": "nicolerayssaoliveira-83@ft.unicamp.br",
                "senha": "E96pOT48QP",
                "cep": "29114683",
                "endereco": "Rua Sebastião Cândido do Nascimento",
                "numero": 342,
                "bairro": "Argolas",
                "cidade": "Vila Velha",
                "estado": "ES",
                "telefone_fixo": "2737975253",
                "celular": "27982095652",
                "altura": "1,71",
                "peso": 72,
                "tipo_sanguineo": "AB-",
                "cor": "amarelo"
            },
            {
                "id": 9,
                "nome": "Samuel Kaique Pedro Henrique Sales",
                "idade": 73,
                "cpf": "93602167399",
                "rg": "397483284",
                "data_nasc": "24\/08\/1946",
                "signo": "Virgem",
                "mae": "Fabiana Rebeca Ester",
                "pai": "Heitor Renan Sales",
                "email": "samuelkaiquepedrohenriquesales@ativacofres.com.br",
                "senha": "7e4kfItJ3H",
                "cep": "58305270",
                "endereco": "Rua Alexandrino de Santana",
                "numero": 998,
                "bairro": "São Bento",
                "cidade": "Bayeux",
                "estado": "PB",
                "telefone_fixo": "8336995162",
                "celular": "83996484455",
                "altura": "1,64",
                "peso": 89,
                "tipo_sanguineo": "B+",
                "cor": "roxo"
            },
            {
                "id": 10,
                "nome": "Pietra Carla Figueiredo",
                "idade": 56,
                "cpf": "52837383295",
                "rg": "464116168",
                "data_nasc": "25\/01\/1963",
                "signo": "Aquário",
                "mae": "Bianca Sara",
                "pai": "Rafael Yago Figueiredo",
                "email": "pietracarlafigueiredo-82@trimempresas.com.br",
                "senha": "TxAnoX4Bnw",
                "cep": "35058260",
                "endereco": "Rua Quatorze de Maio",
                "numero": 367,
                "bairro": "Esperança",
                "cidade": "Governador Valadares",
                "estado": "MG",
                "telefone_fixo": "3339912538",
                "celular": "33983099442",
                "altura": "1,76",
                "peso": 53,
                "tipo_sanguineo": "O-",
                "cor": "roxo"
            }
        ]
    };
}