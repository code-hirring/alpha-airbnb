
const hospedagens = [];

class Hospedagem {
    constructor(foto, tipo_propriedade, nome, preco) {
        this.foto = foto;
        this.tipo_propriedade = tipo_propriedade;
        this.nome = nome;
        this.preco = preco;
    }
}

function atualizaElementos(foto, tipo_propriedade, nome, preco) {

    for (let i = 0; i < MAXIMO; i++) {


        var text_muted = document.createElement("small");
        text_muted.setAttribute("class", "text-muted");
        text_muted.innerHTML = tipo_propriedade;

        var card_text_small = document.createElement("p");
        card_text_small.setAttribute("class", "card-text");
        card_text_small.appendChild(text_muted);



        var btn_btn_primary = document.createElement("a");
        btn_btn_primary.setAttribute("class", "btn btn-primary");
        btn_btn_primary.setAttribute("href", "http://maps.google.com/?q=" + nome);
        btn_btn_primary.innerHTML = "Ver no mapa";


        var card_text = document.createElement("p");
        card_text.setAttribute("class", "card-text");
        card_text.innerHTML = "R$ " + preco;


        var card_title = document.createElement("h5");
        card_title.setAttribute("class", "card-title");
        card_title.innerHTML = nome;


        var card_body = document.createElement("div");
        card_body.setAttribute("class", "card-body");
        card_body.appendChild(card_title)
        card_body.appendChild(card_text)
        card_body.appendChild(card_text_small)
        card_body.appendChild(btn_btn_primary)


        var img = document.createElement("img");
        img.setAttribute("class", "card-body");
        img.setAttribute("src", foto);
        img.setAttribute("width", 350);
        img.setAttribute("height", 350);
        img.setAttribute("alt", nome);

        var card = document.createElement("div");
        card.setAttribute("class", "card");
        card.appendChild(img);
        card.appendChild(card_body);


        var col_sm_3 = document.createElement("div");
        col_sm_3.setAttribute("class", "col-sm-4");
        col_sm_3.appendChild(card);


        var row = document.getElementById("hospedagens");
        row.appendChild(col_sm_3);


        //hospedagem_atual = new Hospedagem(data[i].photo, data[i].property_type, data[i].name, data[i].price)
        //hospedagens.push(hospedagem_atual)
        //console.log(hospedagem_atual)

    }



}
const MAXIMO = 6;
var TOTAL = 0;
var PAGINA = 1
var OFFSET = 1

var IDS_HOSPEDAGEM = 1;

function updateInfoHospedagem(inicial, foto, tipo_propriedade, nome, preco) {

    document.getElementById("h-"+(inicial)).innerHTML = tipo_propriedade

    document.getElementById("h-"+(inicial + 1)).setAttribute("href", "http://maps.google.com/?q=" + nome);

    document.getElementById("h-"+(inicial + 2)).innerHTML = "R$ " + preco;

    document.getElementById("h-"+(inicial + 3)).innerHTML = nome;

    var five_element = document.getElementById("h-"+(inicial + 4));

    five_element.setAttribute("src", foto);
    five_element.setAttribute("alt", nome);


}

function mudaPagina(element) {

    var id = element.getAttribute("id");
    console.log(id)
    var diferenca = id - PAGINA;

    var pagina_anterior = PAGINA;
    console.log("pagina_escolhida = " + id)
    console.log("pagina_anterior = " + pagina_anterior)
    console.log("diferenca = " + diferenca)
    PAGINA = parseInt(id)

    if (diferenca == 0) {
        return
    } else {

        
        //var inicial = ((PAGINA -1) /4 * TOTAL)+1  ;
        var inicial = 1;
        for (let i = 0; i < MAXIMO; i++) {

            var item = hospedagens[(PAGINA - 1) * MAXIMO + i];
            updateInfoHospedagem(inicial, item.foto, item.tipo_propriedade, item.nome, item.preco);
            inicial = inicial + 5;

        }

        if (diferenca < 0) {
            var posterior_atual = document.getElementById(pagina_anterior)
            posterior_atual.setAttribute("class", "page-item")

            if (1 == PAGINA) {
                var anterior_inicio = document.getElementById("anterior")
                anterior_inicio.setAttribute("class", "page-item disabled")
            }
            var atual = document.getElementById(PAGINA)
            atual.setAttribute("class", "page-item active")

            var posterior = document.getElementById("posterior")
            posterior.setAttribute("class", "page-item")

        } else {
            var anterior = document.getElementById(pagina_anterior)
            anterior.setAttribute("class", "page-item")
            //habilita atual

            if (PAGINA == OFFSET) {
                var posterior = document.getElementById("posterior")
                posterior.setAttribute("class", "page-item disabled")
            }
            var atual = document.getElementById(PAGINA)
            atual.setAttribute("class", "page-item active")

            var anterior_inicio = document.getElementById("anterior")
            anterior_inicio.setAttribute("class", "page-item")

        }

    }


}

function irFrenteOuAtras(element) {

    console.log(element)
    var id = element.getAttribute("id")
    console.log("ID = " + id)

    console.log("PAGINA =" + PAGINA)

    console.log("OFFSET = " + OFFSET)
    if ( (id == "anterior") && (1 <= PAGINA-1)) {
        console.log("anterior")
        var pagina = document.getElementById(PAGINA-1)
        console.log(pagina)
        mudaPagina(pagina)
    } else if ( (id == "posterior") && ((PAGINA+1) <= OFFSET)) {
        console.log("posterior")
        var pagina = document.getElementById(PAGINA+1)
        console.log(pagina)
        mudaPagina(pagina)
    } else {
        return
    }

}


const limite_inferior = 1;

const limite_superior = 1;




//const url = "../api/hospedagem.json"
const url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72"

fetch(url)
    .then(res => res.json())
    .then(data => {
        //console.log(data.length)
        TOTAL = data.length
        OFFSET = data.length / MAXIMO;



        for (let i = 0; i < TOTAL; i++) {

            if( i< MAXIMO){
            var text_muted = document.createElement("small");
            text_muted.setAttribute("class", "text-muted");
            //1
            text_muted.setAttribute("id", "h-"+(IDS_HOSPEDAGEM))
            IDS_HOSPEDAGEM++;
            text_muted.innerHTML = data[i].property_type;

            var card_text_small = document.createElement("p");
            card_text_small.setAttribute("class", "card-text");
            card_text_small.appendChild(text_muted);


            var btn_btn_primary = document.createElement("a");
            
            btn_btn_primary.setAttribute("class", "btn btn-primary");
            
            btn_btn_primary.setAttribute("href", "http://maps.google.com/?q=" + data[i].name);
            btn_btn_primary.innerHTML = "Ver no mapa";
            //2
            btn_btn_primary.setAttribute("id", "h-"+(IDS_HOSPEDAGEM))
            IDS_HOSPEDAGEM++;



            var card_text = document.createElement("p");
            card_text.setAttribute("class", "card-text");
            //3
            card_text.innerHTML = "R$ " + data[i].price;
            card_text.setAttribute("id", "h-"+(IDS_HOSPEDAGEM))
            IDS_HOSPEDAGEM++;


            var card_title = document.createElement("h5");
            card_title.setAttribute("class", "card-title");
            //4
            card_title.innerHTML = data[i].name;
            card_title.setAttribute("id", "h-"+(IDS_HOSPEDAGEM))
            IDS_HOSPEDAGEM++;

            var card_body = document.createElement("div");
            card_body.setAttribute("class", "card-body");
            card_body.appendChild(card_title)
            card_body.appendChild(card_text)
            card_body.appendChild(card_text_small)
            card_body.appendChild(btn_btn_primary)


            var img = document.createElement("img");
            img.setAttribute("class", "card-body");
            //5
            img.setAttribute("src", data[i].photo);
            img.setAttribute("width", 350);
            img.setAttribute("height", 350);
            img.setAttribute("alt", data[i].name);
            img.setAttribute("id", "h-"+(IDS_HOSPEDAGEM))
            IDS_HOSPEDAGEM++;


            var card = document.createElement("div");
            card.setAttribute("class", "card");
            card.appendChild(img);
            card.appendChild(card_body);


            var col_sm_3 = document.createElement("div");
            col_sm_3.setAttribute("class", "col-sm-4");
            col_sm_3.appendChild(card);


            var row = document.getElementById("hospedagens");
            row.appendChild(col_sm_3);

            }
            hospedagem_atual = new Hospedagem(data[i].photo, data[i].property_type, data[i].name, data[i].price);
            hospedagens.push(hospedagem_atual);
            //console.log(hospedagem_atual)




        }

        var paginations = document.getElementsByClassName("pagination");
        var pagination = paginations[0]
        console.log(pagination)
        var atras_li = document.createElement("li");
        atras_li.setAttribute("class", "page-item disabled")
        atras_li.setAttribute("id", "anterior")
        var atras_a = document.createElement("a");
        atras_a.setAttribute("class", "page-link")
        atras_a.setAttribute("href", "#")
        atras_a.setAttribute("tabindex", "-1")
        atras_a.setAttribute("aria-disabled", "true")

        atras_a.innerHTML = "Anterior";
        atras_li.appendChild(atras_a)
        atras_li.onclick = function () { irFrenteOuAtras(atras_li) };
        pagination.appendChild(atras_li);

        //console.log(OFFSET)


        for (let index = 0; index < OFFSET; index++) {
            var posicao_li = document.createElement("li");
            if (index == 0) {
                posicao_li.setAttribute("class", "page-item active")
            } else {
                posicao_li.setAttribute("class", "page-item")
            }
            posicao_li.setAttribute("id", index + 1)


            var posicao_a = document.createElement("a");
            posicao_a.setAttribute("class", "page-link")
            posicao_a.setAttribute("href", "#")
            posicao_a.innerHTML = index + 1;
            posicao_li.appendChild(posicao_a)
            posicao_li.onclick = function () { mudaPagina(document.getElementById(index + 1)) };
            pagination.appendChild(posicao_li);

        }

        var frente_li = document.createElement("li");
        frente_li.setAttribute("class", "page-item")
        frente_li.setAttribute("id", "posterior")
        var frente_a = document.createElement("a");
        frente_a.setAttribute("class", "page-link")
        frente_a.setAttribute("href", "#")
        frente_a.innerHTML = "Posterior";
        frente_li.appendChild(frente_a)
        frente_li.onclick = function () { irFrenteOuAtras(frente_li) };
        pagination.appendChild(frente_li);


    })//.catch(err => console.log(err))


//console.log(hospedagens)
