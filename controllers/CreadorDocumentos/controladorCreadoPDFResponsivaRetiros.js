const PdfPrinter = require('../../node_modules/pdfmake/src/Printer.js')
const path = require('path');

const fonts = {
  Roboto: {
    normal: path.join(process.cwd(), 'fonts/Roboto-Regular.ttf'),
    bold: path.join(process.cwd(), 'fonts/Roboto-Medium.ttf'),
    italics: path.join(process.cwd(), 'fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(process.cwd(), 'fonts/Roboto-MediumItalic.ttf')
  }
};
const printer = new PdfPrinter(fonts);
const Responsiva = require('./Responsiva.json')

const generarResponsivaController = async (req, res) => {

  console.log(req.body);
  const { Encuentrista, Expectativa, firmaDataURL,Escuela } = req.body;


  
  
  let Encabezado =null
  if (Escuela=='ESCUELA PARA NUEVOS MIEMBROS')
{
Encabezado='EncabezadoNV'
}
else{
Encabezado='EncabezadoLCP'
}
if(Encuentrista.Edad<18){
  Encabezado='EncabezadoMENOR'
}






  try {
   
  

    const fechaActual = new Date();
    const nombreMes = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fechaActual);

    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [60, 40, 60, 40],
      styles: {
        header: { fontSize: 13, bold: true, margin: [0, 0, 0, 2] },
        sectionTitle: { fontSize: 10, bold: false, margin: [0, 10, 0, 5] },
        bodyText: { fontSize: 10, alignment: 'justify', margin: [0, 0, 0, 8], lineHeight: 1.2 },
        signatureLabel: { fontSize: 10, bold: true, alignment: 'center' },
        infoLabel: { fontSize: 9, bold: true },
        infoValue: { fontSize: 9 },
      },
      content: [
        { text: Responsiva[Encabezado], style: 'header' },
        { text: Responsiva.DIRECCION, style: 'sectionTitle' },
        {
          table: {
            widths: ['*'],
            body: [
              [{
                stack: [
                  { text: `NOMBRE: ${Encuentrista.Nombre} ${Encuentrista.ApellidoPaterno} ${Encuentrista.ApellidoMaterno}`, style: 'infoLabel' },
                  { text: `DIRECCIÓN: ${Encuentrista.Direccion}`, style: 'infoValue' },
                  {
                    columns: [
                      { text: `OCUPACIÓN: ${Encuentrista.Ocupacion}`, style: 'infoValue' },
                      { text: `EDAD: ${Encuentrista.Edad} años`, style: 'infoValue' },
                      { text: `SEXO: ${Encuentrista.Sexo}`, style: 'infoValue' },
                    ],
                  },
                  {
                    columns: [
                      { text: `TELEFONO: ${Encuentrista.Telefono}`, style: 'infoValue' },
                      { text: `CORREO: ${Encuentrista.Correo}`, style: 'infoValue' },
                    ],
                  },
                ],
                padding: [10, 10, 10, 10],
              }],
            ],
          },
          layout: 'lightHorizontalLines',
        },
        { text: '\n' },
        { text: '¿QUÉ EXPECTATIVA TIENE DEL RETIRO?', style: 'sectionTitle' },
        { text: Expectativa, style: 'bodyText', italic: true },
        { text: 'DECLARACIONES:', style: 'infoLabel' },
        {
          ol: [
            Responsiva.declaracion_uno,
            Responsiva.declaracion_dos,
            Responsiva.declaracion_tres,
            Responsiva.declaracion_cuatro,
          ],
          style: 'bodyText',
        },
        { text: Responsiva.responsiva, style: 'bodyText', margin: [0, 15, 0, 20] },
        {
          text: `Ciudad de México, a ${fechaActual.getDate()} de ${nombreMes} del ${fechaActual.getFullYear()}.`,
          style: 'bodyText',
          margin: [0, 0, 0, 30],
        },
        {
          columns: [
            { width: '*', text: '' },
            {
              width: 150,
              stack: [
             
                { image: firmaDataURL, width: 80, alignment: 'center' },
                { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 150, y2: 5, lineWidth: 1 }] },
                { text: `${Encuentrista.Nombre} ${Encuentrista.ApellidoPaterno}`, style: 'signatureLabel', margin: [0, 5, 0, 0] },
                { text: 'FIRMA ', fontSize: 8, alignment: 'center' },
              ],
            },
            { width: '*', text: '' },
          ],
        },
      ],
    };

    // Crear el PDF
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    // Configurar cabeceras para que el navegador lo reciba como archivo
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Responsiva_${Encuentrista.Nombre}.pdf`);

    // Enviar el stream al cliente
    pdfDoc.pipe(res);
    pdfDoc.end();

  } catch (error) {
    console.error("Error generando PDF:", error);
    res.status(500).send("Error al generar el documento");
  }
};

module.exports = { generarResponsivaController };