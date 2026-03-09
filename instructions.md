# Instrucciones para configurar Google Apps Script

Sigue estos pasos para configurar la hoja de Google Sheets y la carpeta de Google Drive donde se guardarán los datos y archivos del formulario de inscripción.

## 1. Crear la carpeta en Google Drive
1. Ve a [Google Drive](https://drive.google.com).
2. Crea una nueva carpeta (por ejemplo, llamada "Inscripciones Club Montaña").
3. Haz doble clic para entrar en la carpeta.
4. Copia el **ID de la carpeta** de la URL. 
   *(Si la URL es `https://drive.google.com/drive/folders/1aBcD...`, el ID es `1aBcD...`)*.

## 2. Crear la hoja de cálculo
1. Dentro de esa misma carpeta, haz clic en **Nuevo > Hoja de cálculo de Google**.
2. Nombra la hoja de cálculo como prefieras (por ejemplo, "Datos Inscripciones").
3. En la primera fila de la hoja, añade los siguientes encabezados (las columnas):
   - Fecha
   - Nombre
   - Apellidos
   - DNI
   - Genero
   - Fecha de Nacimiento
   - Domicilio
   - Codigo Postal
   - Poblacion
   - Provincia
   - Email
   - Telefono
   - Situacion
   - Nombre Club
   - Licencia Elegida
   - Formato Licencia
   - Total a Pagar
   - WhatsApp
   - Licencia (Adjunto)
   - DNI Menor (Adjunto)
   - Parentesco (Adjunto)
4. Deja la hoja abierta.

## 3. Crear el Google Apps Script
1. En el menú superior de la hoja de cálculo, ve a **Extensiones > Apps Script**.
2. Se abrirá una nueva pestaña con el editor de código. Borra todo el código que haya y pega el siguiente:

```javascript
const FOLDER_ID = 'AQUI_PON_EL_ID_DE_TU_CARPETA'; // <-- Reemplaza con el ID de tu carpeta
const SHEET_NAME = 'Hoja 1'; // <-- Asegúrate de que coincida con el nombre de tu pestaña en Sheets (suele ser Hoja 1)

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const mainFolder = DriveApp.getFolderById(FOLDER_ID);
    
    const fileUrls = {
      imagenLicencia: '',
      dniMenor: '',
      acreditacionPadre: ''
    };

    // Solo crear carpetas si hay archivos para subir
    const hasFiles = data.archivos && Object.keys(data.archivos).length > 0;
    
    if (hasFiles) {
      // 1. Obtener o crear la carpeta común "Archivos"
      let baseFilesFolder;
      const folders = mainFolder.getFoldersByName('Archivos');
      if (folders.hasNext()) {
        baseFilesFolder = folders.next();
      } else {
        baseFilesFolder = mainFolder.createFolder('Archivos');
      }

      // 2. Crear carpeta individual para esta inscripción dentro de "Archivos"
      const folderName = `${data.personal.apellidos}, ${data.personal.nombre} - ${data.personal.dni}`;
      const personFolder = baseFilesFolder.createFolder(folderName);
      
      // Función auxiliar para subir un archivo
      const uploadFile = (fileData) => {
        if (fileData && fileData.data && fileData.mimeType && fileData.name) {
          const blob = Utilities.newBlob(Utilities.base64Decode(fileData.data), fileData.mimeType, fileData.name);
          const file = personFolder.createFile(blob);
          return file.getUrl();
        }
        return '';
      };

      // Procesar archivos individuales si existen
      if (data.archivos.imagenLicencia) fileUrls.imagenLicencia = uploadFile(data.archivos.imagenLicencia);
      if (data.archivos.dniMenor) fileUrls.dniMenor = uploadFile(data.archivos.dniMenor);
      if (data.archivos.acreditacionPadre) fileUrls.acreditacionPadre = uploadFile(data.archivos.acreditacionPadre);
    }



    // Guardar datos en la hoja
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    const newRow = [
      new Date(), // Fecha actual
      data.personal.nombre,
      data.personal.apellidos,
      data.personal.dni,
      data.personal.genero,
      data.personal.fechaNacimiento,
      data.personal.domicilio,
      data.personal.cp,
      data.personal.poblacion,
      data.personal.provincia,
      data.personal.email,
      data.personal.telefono,
      data.licencia.situacion,
      data.licencia.nombreClub || '',
      data.licencia.licenciaElegidaNombre || '',
      data.licencia.formatoLicencia,
      data.total + ' €',
      data.privacidad.unirseWhatsapp ? 'Sí' : 'No',
      fileUrls.imagenLicencia,
      fileUrls.dniMenor,
      fileUrls.acreditacionPadre
    ];
    
    sheet.appendRow(newRow);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'message': error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. **IMPORTANTE:** Reemplaza `AQUI_PON_EL_ID_DE_TU_CARPETA` por el ID de la carpeta que copiaste en el paso 1.
4. Guarda el proyecto (icono de disquete o Ctrl+S) y ponle un nombre como "Script Inscripciones".

## 4. Desplegar el Script
1. En la parte superior derecha, haz clic en el botón azul **Desplegar > Nueva implementación**.
2. Haz clic en el engranaje "Seleccionar tipo" y elige **Aplicación web**.
3. Rellena los datos así:
   - **Descripción:** (Opcional, e.g., "Versión 1")
   - **Ejecutar como:** Déjalo en "Yo" (tu cuenta de Google).
   - **Quién tiene acceso:** Cámbialo a **"Cualquier persona"** (Any). Esto es muy importante para que tu web (Angular) pueda enviar datos.
4. Haz clic en **Desplegar**.
5. Probablemente Google te pida autorizar el acceso ("Se requiere autorización"). 
   - Haz clic en "Autorizar acceso".
   - Elige tu cuenta de Google.
   - Si sale la advertencia de "Google no ha verificado esta aplicación", haz clic en "Configuración avanzada" en letra pequeña y luego en "Ir a [Nombre de tu script] (no seguro)".
   - Da los permisos necesarios (para que el script pueda crear archivos y modificar la hoja).
6. Una vez desplegado, te mostrará una **URL de la aplicación web** (que empieza por `https://script.google.com/macros/s/...`). 
7. **Copia esa URL.**

## 5. Integración con la aplicación Angular
1. Abre el archivo `src/app/environments/environment.ts` de tu proyecto.
2. Pega la URL que copiaste en la variable `scriptUrl` que hemos preparado en el entorno. Debe quedar algo así:

```typescript
export const environment = {
  production: false,
  bloggerUrl: '...',
  scriptUrl: 'LA_URL_QUE_COPIASTE_AQUI'
};
```
3. ¡Listo! Al enviar una nueva inscripción en la aplicación, se enviará directamente a Google Sheets y los documentos adjuntos se subirán a la carpeta de Google Drive.
