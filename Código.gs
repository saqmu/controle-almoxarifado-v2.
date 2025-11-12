const ss = SpreadsheetApp.getActiveSpreadsheet();

 // FUNÇÃO DE TESTE SIMPLIFICADA
 function doGet() {
   return HtmlService.createHtmlOutput('<h1>App Funcionando!</h1><p>O teste foi um sucesso.</p>');
 }

 /**
  * Esta função é acionada quando o App envia dados (faz uma requisição POST).
  * Ela recebe os dados do formulário e os registra na página 'LogDeMovimentações'.
  */
 function doPost(e) {
   try {
     const ws = ss.getSheetByName("LogDeMovimentações");
     const data = JSON.parse(e.postData.contents);
     const items = data.items;
     const nomeColaborador = data.nome_colaborador;
     const tipoMovimentacao = data.tipo;
     const dataHora = new Date(); // Cria um registro de data e hora atual.

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

     return ContentService.createTextOutput("Dados inseridos com sucesso!");

   } catch (error) {
     return ContentService.createTextOutput("Erro: " + error.toString());
   }
 }
