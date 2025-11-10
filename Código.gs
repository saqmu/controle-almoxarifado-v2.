```javascript
// Define a planilha ativa como uma variável global para ser usada em todas as funções
const ss = SpreadsheetApp.getActiveSpreadsheet();

/**
 * Esta função é acionada quando o App (página web) faz uma requisição do tipo GET.
 * Ela tem duas funções:
 * 1. Se o App pedir a lista de produtos, ela lê a página 'BaseDeItens' e retorna a lista.
 * 2. Se for aberta diretamente, ela carrega o arquivo 'index.html'.
 */
function doGet(e) {
  // Verifica se o App está pedindo a lista de itens.
  if (e.parameter.action === "getItems") {
    const ws = ss.getSheetByName("BaseDeItens");
    // Pega todos os dados da página, ignorando o cabeçalho.
    const items = ws.getRange(2, 1, ws.getLastRow() - 1, 2).getValues();
    // Converte os dados para um formato JSON e retorna como texto para o App.
    return ContentService.createTextOutput(JSON.stringify(items)).setMimeType(ContentService.MimeType.JSON);
  }
  // Se não for para pegar itens, carrega a página HTML principal do App.
  return HtmlService.createHtmlOutputFromFile('index');
}

/**
 * Esta função é acionada quando o App envia dados (faz uma requisição POST).
 * Ela recebe os dados do formulário e os registra na página 'LogDeMovimentações'.
 */
function doPost(e) {
  try {
    const ws = ss.getSheetByName("LogDeMovimentações");
    
    // Os dados vêm em um formato de texto (JSON), então precisamos 'traduzi-los'.
    const data = JSON.parse(e.postData.contents);
    const items = data.items;
    
    // Pega o nome do colaborador e o tipo de movimentação, que são os mesmos para todos os itens.
    const nomeColaborador = data.nome_colaborador;
    const tipoMovimentacao = data.tipo;
    const dataHora = new Date(); // Cria um registro de data e hora atual.

    // Usa um loop 'forEach' para processar cada item que o trabalhador selecionou.
    items.forEach(item => {
      ws.appendRow([
        dataHora,
        item.codigo,
        item.nome,
        tipoMovimentacao,
        item.quantidade,
        nomeColaborador
      ]);
    });

    // Retorna uma mensagem de sucesso para o App.
    return ContentService.createTextOutput("Dados inseridos com sucesso!");

  } catch (error) {
    // Se algo der errado, retorna uma mensagem de erro detalhada.
    return ContentService.createTextOutput("Erro: " + error.toString());
  }
}
```
