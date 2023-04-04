import * as pdfjsLib from "pdfjs-dist";

async function parseTextFromResume(resumePath) {
  const loadingTask = pdfjsLib.getDocument(resumePath);
  // Wait for the PDF to load
  loadingTask.promise.then(function (pdf) {
    // Get the first page of the PDF
    pdf.getPage(1).then(function (page) {
      // Get the text content of the page
      page.getTextContent().then(function (textContent) {
        // Extract the text from the content
        const textItems = textContent.items;
        let extractedText = "";
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < textItems.length; i++) {
          extractedText += `${textItems[i].str} `;
        }
        console.log(extractedText);
      });
    });
  });
}

export default parseTextFromResume;
