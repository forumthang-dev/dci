/**
 * Sổ Gieo Hạt K365 — Google Sheets Sync Backend
 *
 * CÁCH DÙNG:
 * 1. Mở một Google Sheets mới (trống, chỉ dùng riêng cho app này).
 * 2. Vào Extensions (Tiện ích) → Apps Script.
 * 3. Xoá hết nội dung mặc định, dán toàn bộ nội dung file này vào.
 * 4. Bấm Deploy → New deployment.
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Bấm Deploy, cho phép quyền truy cập nếu được hỏi.
 * 6. Copy URL dạng https://script.google.com/macros/s/xxxxx/exec
 * 7. Dán URL đó vào app, mục "Google Sheets URL" ở tab Hồ sơ.
 *
 * App sẽ lưu toàn bộ dữ liệu (JSON) vào ô A1 của sheet "Data".
 * Mỗi lần bạn bấm Lưu trong app, dữ liệu mới nhất sẽ ghi đè lên bản cũ —
 * an toàn để bấm nhiều lần, không lo trùng lặp dữ liệu.
 */

function getDataSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Data');
  if (!sheet) {
    sheet = ss.insertSheet('Data');
    sheet.getRange('A1').setValue('{}');
    sheet.getRange('B1').setValue('Cập nhật lần cuối');
  }
  return sheet;
}

function doGet(e) {
  var sheet = getDataSheet_();
  var json = sheet.getRange('A1').getValue();
  if (!json) json = '{}';
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = getDataSheet_();
  var body = e.postData && e.postData.contents ? e.postData.contents : '{}';

  // basic validation: must be parseable JSON
  try {
    JSON.parse(body);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid JSON' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  sheet.getRange('A1').setValue(body);
  sheet.getRange('B2').setValue(new Date());

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
