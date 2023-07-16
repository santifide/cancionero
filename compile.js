const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Ruta del directorio "canciones"
const directorioCanciones = './canciones';

// Leer archivos del directorio "canciones"
fs.readdir(directorioCanciones, (err, files) => {
  if (err) {
    console.error('Error al leer el directorio:', err);
    return;
  }

  // Filtrar archivos .txt
  const archivosTxt = files.filter(file => path.extname(file).toLowerCase() === '.txt');

  // Generar contenido del index.html
  const indexContent = generarIndexContent(archivosTxt);

  // Leer el archivo index.html
  const indexPath = path.join(__dirname, 'index.html');
  fs.readFile(indexPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo index.html:', err);
      return;
    }

    // Utilizar Cheerio para manipular el contenido HTML
    const $ = cheerio.load(data);

    // Insertar el contenido generado dentro del elemento <div id="wrapper-canciones">
    $('#wrapper-canciones').html(indexContent);

    // Escribir el archivo index.html modificado
    fs.writeFile(indexPath, $.html(), (err) => {
      if (err) {
        console.error('Error al escribir el archivo index.html:', err);
        return;
      }
      console.log('El archivo index.html ha sido modificado correctamente.');
    });
  });
});

function generarIndexContent(archivos) {
  let content = '';

  archivos.forEach((archivo, index) => {
    const nombreArchivo = archivo.split('.')[0];
    const contenidoArchivo = fs.readFileSync(path.join(directorioCanciones, archivo), 'utf-8');
    const buttonId = `button-${index + 1}`;
    const contenidoId = `contenido-${index + 1}`;

    content += `<button id="${buttonId}">${nombreArchivo}</button>\n`;
    content += `<p id="${contenidoId}">${contenidoArchivo}</p>\n`;
  });

  return content;
}
