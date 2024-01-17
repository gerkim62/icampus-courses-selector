"use client";

import React from "react";
import { jsPDF } from "jspdf"; // will automatically load the node version
import generatePDF from "@/libs/generate-pdf";

type Props = {};

const page = (props: Props) => {
  return (
    <button
      onClick={() =>
        generatePDF(`<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>`)
      }
    >
      Get PDF
    </button>
  );
};

export default page;
