'use strict';

const Excel = require('exceljs');

class ImportService {
  static async ImportClassification(filelocation) {
    let workbook = new Excel.Workbook();

    workbook = await workbook.csv.readFile(filelocation);
    const dataArr = [];
    workbook.eachRow({ includeEmpty: true }, (row) => {
      dataArr.push(row.values);
    });
    return dataArr;
    // const explanation = workbook.getWorksheet('sheet1'); // get sheet name

    // const colComment = explanation.getColumn('C'); // column name

    // colComment.eachCell(async (cell, rowNumber) => {
    //   if (rowNumber >= 11) {
    //     const sekolah = explanation.getCell(`B${rowNumber}`).value; // get cell and the row
    //     const kode = explanation.getCell(`C${rowNumber}`).value;
    //     const nama = explanation.getCell(`D${rowNumber}`).value;
    //     const nip = explanation.getCell(`E${rowNumber}`).value;
    //   }
    // });
  }
}

module.exports = ImportService;
