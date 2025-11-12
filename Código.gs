const ss = SpreadsheetApp.getActiveSpreadsheet();

/**
 * Esta função agora SÓ responde quando o App pede a lista de itens.
 * Ela não serve mais a página HTML.
 */
function doGet(e) {
  if (e.parameter.action === "getItems") {
    const ws = ss.getSheetByName("BaseDeItens");
    const items = ws.getRange(2, 1, ws.getLastRow() - 1, 2).getValues();
    return ContentService.createTextOutput(JSON.stringify(items)).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * A função doPost continua exatamente a mesma.
 * Ela recebe os dados do App e salva na planilha.
 */
function doPost(e) {
  try {
    const ws = ss.getSheetByName("LogDeMovimentações");
    const data = JSON.parse(e.postData.contents);
    const items = data.items;
    const nomeColaborador = data.nome_colaborador;
    const tipoMovimentacao = data.tipo;
    const dataHora = new Date();

    items.forEach(item => {
      ws.appendRow([ dataHora, item.codigo, item.nome, tipoMovimentacao, item.quantidade, nomeColaborador ]);
    });

    return ContentService.createTextOutput("Dados inseridos com sucesso!");
  } catch (error) {
    return ContentService.createTextOutput("Erro: " + error.toString());
  }
}
