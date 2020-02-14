$("#botao-placar").click(mostrarPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var Usuario = "Heitor";
    var numPalavras = $("#contador-palavras").text(); 
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>"
    
    var linha = novaLinha(Usuario, numPalavras);
        linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha);

    $(".placar").slideDown(500);
    scrollPlacar();
}
function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    console.log(posicaoPlacar+"px")
    $("html").animate({ scrollTop: posicaoPlacar+"px"}, 1000); //ainda falta corrigir

    sincronizaPlacar();
}

function novaLinha(Usuario, numPalavras){

    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(Usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;    
}

function removeLinha(){
    $(".botao-remover").click(function(event){
        
        event.preventDefault();
        
        var linha = $(this).parent().parent();
        linha.fadeOut(1000);
        
        setTimeout(function(){
            linha.remove();
        },(1000));
    });   
}

//$("#botao-placar").click(mostrarPlacar);

function mostrarPlacar(){
    $(".placar").stop().slideToggle(600);
}

function sincronizaPlacar(){
  
    var placar = [];
    var linhas = $("tbody>tr");
    
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras            
        };

        placar.push(score);

    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados, function(){
        console.log("placar salvo no servidor!!");
    });
 }

 function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        
        $(data).each(function(){
            console.log("jsdfjhsjfdfh");
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha); //adiciona o evento de click no botão remover ao criar uma nova linha
                $("tbody").append(linha);
        })
    });

 }








