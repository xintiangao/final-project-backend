import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { readFile } from 'fs/promises';
const client = new DocumentProcessorServiceClient();

async function main() {
  // [START documentai_process_form_document]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  const projectId = 'teak-catalyst-391812';
  const location = 'us'; // Format is 'us' or 'eu'
  const processorId = '83c007cf5288d57c'; // Create processor in Cloud Console
  const filePath = '/home/yongcheeho/next-final-project/files/receipt 2.jpg';
  
  async function processDocument() {
    // The full resource name of the processor, e.g.:
    // projects/project-id/locations/location/processor/processor-id
    // You must create new processors in the Cloud Console first
    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

    // Read the file into memory.

    const imageFile = await readFile(filePath);

    // Convert the image data to a Buffer and base64 encode it.
    const encodedImage = Buffer.from(imageFile).toString('base64');

    const request = {
      name,
      rawDocument: {
        content: encodedImage,
        mimeType: 'image/jpeg',
      },
    };

    // Recognizes text entities in the PDF document
    const [result] = await client.processDocument(request);

    console.log('Document processing complete.');

    // Read the table and form fields output from the processor
    // The form processor also contains OCR data. For more information
    // on how to parse OCR data please see the OCR sample.
    // For a full list of Document object attributes,
    // please reference this page: https://googleapis.dev/nodejs/documentai/latest/index.html
    const {document} = result;
    const {text} = document;
    console.log(`Full document text: ${JSON.stringify(text)}`);
    console.log(`There are ${document.pages.length} page(s) in this document.`);

    for (const page of document.pages) {
      console.log(`\n\n**** Page ${page.pageNumber} ****`);

      console.log(`Found ${page.tables.length} table(s):`);
      for (const table of page.tables) {
        const numCollumns = table.headerRows[0].cells.length;
        const numRows = table.bodyRows.length;
        console.log(`Table with ${numCollumns} columns and ${numRows} rows:`);
        printTableInfo(table, text);
      }
      console.log(`Found ${page.formFields.length} form field(s):`);
      for (const field of page.formFields) {
        const fieldName = getText(field.fieldName.textAnchor, text);
        const fieldValue = getText(field.fieldValue.textAnchor, text);
        console.log(
          `\t* ${JSON.stringify(fieldName)}: ${JSON.stringify(fieldValue)}`
        );
      }
    }
  }

  const printTableInfo = (table, text) => {
    // Print header row
    let headerRowText = '';
    for (const headerCell of table.headerRows[0].cells) {
      const headerCellText = getText(headerCell.layout.textAnchor, text);
      headerRowText += `${JSON.stringify(headerCellText.trim())} | `;
    }
    console.log(
      `Collumns: ${headerRowText.substring(0, headerRowText.length - 3)}`
    );
    // Print first body row
    let bodyRowText = '';
    for (const bodyCell of table.bodyRows[0].cells) {
      const bodyCellText = getText(bodyCell.layout.textAnchor, text);
      bodyRowText += `${JSON.stringify(bodyCellText.trim())} | `;
    }
    console.log(
      `First row data: ${bodyRowText.substring(0, bodyRowText.length - 3)}`
    );
  };

  // Extract shards from the text field
  const getText = (textAnchor, text) => {
    if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
      return '';
    }

    // First shard in document doesn't have startIndex property
    const startIndex = textAnchor.textSegments[0].startIndex || 0;
    const endIndex = textAnchor.textSegments[0].endIndex;

    return text.substring(startIndex, endIndex);
  };

  // [END documentai_process_form_document]
  await processDocument();
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});