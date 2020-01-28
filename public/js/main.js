
// Variáveis Globais
var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

// MAIN --------------------------------------------------------------------------------------------
$(document).ready(function(){ 
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    inserePlacar();
    $("#botao-reiniciar").click(reiniciaJogo);
});
//---------------------------------------------------------------------------------------------------
function atualizaTamanhoFrase(){ // determina os números principais da partida
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanhoFrase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
    campo.on("input", function(){ //Evento input
        
        conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length -1; //expressão regular que busca por qualquer espaço vazio;
        
        $("#contador-palavras").text(qtdPalavras); //conta qtd de palavras
    
         var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres) // conta qtd de caracteres
    });
}

function inicializaCronometro(){
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){ // funcao one só executa o evento uma única vez
       var cronometroID = setInterval(function(){ //set Interval recebe dois paramaetros, a function e o tempo;
            tempoRestante --;                     // todo set interval retorna o próprio Id;      
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                clearInterval(cronometroID); // função que para o contador de tempo
                finalizaJogo();
            }}, 1000) //1000 = tempo
            
    });
}
function inicializaMarcadores(){
var frase = $(".frase").text();
campo.on("input", function(){
   
    var digitado = campo.val(); // valor
    var comparavel = frase.substr(0, digitado.length); // variável que guarda o conteúdo da frase principal de acordo com o que foi digitado até o momento

    //alterna a cor do campo de digitação
    if(digitado == comparavel){
        campo.addClass("borda-verde"); 
        campo.removeClass("borda-vermelha");
    }else{
        campo.addClass("borda-vermelha");
        campo.removeClass("borda-verde");
    }
});
}

function reiniciaJogo(){
    campo.attr("disabled", false); // tira o disabled
    campo.val("");
    $("#contador-palavras").text("0"); //seta contadores
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro(); //inicializa o cronômetro
    campo.toggleClass("campo-desativado");//alterna classes css
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
}






function finalizaJogo(){
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");   // toggleClass alterna a classe discriminada
    inserePlacar();
}