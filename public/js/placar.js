function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var Usuario = "Heitor";
    var numPalavras = $("#contador-palavras").text(); 
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>"
    
    var linha = novaLinha(Usuario, numPalavras);
        linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha);
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
        console.log("Fui clicado");
        $(this).parent().parent().remove();
    });
}