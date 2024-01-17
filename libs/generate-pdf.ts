import { jsPDF } from "jspdf";
import "jspdf-autotable";

function generatePDF(html: string) {
  const doc = new jsPDF();
  const styledHtml = `
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
    }
    th, td {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
  ${html}
`;

  console.log(styledHtml);
  doc.html(styledHtml, {
    callback: function (doc) {
      doc.save();
    },
  });
}

export default generatePDF;
