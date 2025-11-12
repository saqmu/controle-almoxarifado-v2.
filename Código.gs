const ss = SpreadsheetApp.getActiveSpreadsheet();

function doGet(e) {
  if (e.parameter.action === "BaseDeItens") {
    try {
      const ws = ss.getSheetByName("BaseDeItens");
      const items = ws.getRange(2, 1, ws.getLastRow() - 1, 2).getValues();
      const jsonOutput = JSON.stringify(items);
      
      return ContentService.createTextOutput(jsonOutput)
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader("Access-Control-Allow-Origin", "*");
        
    } catch (error) {
       const jsonError = JSON.stringify({ error: error.message });
       return ContentService.createTextOutput(jsonError)
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader("Access-Control-Allow-Origin", "*");
    }
  }
}

function doPost(e) {
  try {
    const ws = ss.getSheetByName("LogDeMovimentacoes"); // Verifique se o nome da sua página é este
    const data = JSON.parse(e.postData.contents);
    const items = data.items;
    
    const nomeColaborador = data.nome_colaborador;
    const tipoMovimentacao = data.tipo;
    const dataHora = new Date();

    items.forEach(item => {
      ws.appendRow([
        dataHora, item.codigo, item.nome, tipoMovimentacao,
        item.quantidade, nomeColaborador
      ]);
    });

    const successResponse = JSON.stringify({ status: "success", message: "Dados inseridos com sucesso!" });
    
    return ContentService.createTextOutput(successResponse)
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");

  } catch (error) {
    const errorResponse = JSON.stringify({ status: "error", message: error.message });
    
    return ContentService.createTextOutput(errorResponse)
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}
