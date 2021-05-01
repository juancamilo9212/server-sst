const puppeteer = require('puppeteer');
const fs = require('fs');

function filterAccident(accidents,filter,value){
    let accidentsFiltered=[];
    accidents.filter(item => {
        let key = item[filter]
        if(key.includes(value)){
        accidentsFiltered.push(item)
        }
        });
        return accidentsFiltered;
}

function fileName(files){
    const fileNameSplit=files.name.split(".");
    const nameSplitSize=fileNameSplit.length;
    const fileExtension=fileNameSplit[nameSplitSize-1];
    if(fileExtension !== 'jpg' && fileExtension !== 'png' 
    && fileExtension !== 'pdf'){
        throw new Error('Archivo inválido');
    }else{
        const filePath=files.path;
        const fileSplit=filePath.split("/");
        const fileName=fileSplit[2];
        return fileName;
}
}

function getFilesName(fileArray){ 
    
    if(fileArray.length === undefined){
        let result=[]
        const file = fileName(fileArray);
        result.push(file);
        return result;
    }else{    
        let result=[]
        fileArray.forEach(files=> {
        let file = fileName(files);
        result.push(file);
    });
    return result;
    }
}

function accidentTemplate(accident){
    const 
    {
        name,
        lastName,
        idNumber,
        company,
        eventDate,
        arrivalDate,
        area,
        bodyPartAffected,
        description,
        witness,
        witnessName,
        witnessIdNumber,
        additionalComments,
        reporterName,
        brigadeMember,
        accidentType,
        researched,
        researcherName,
        researchDate,
        actionPlan,
        actionExecutionDate,
        state
    } = accident;
    const mappedArea = area ? area:"No aplica";
    const mappedAccidentType = accidentType ? accidentType:"";
    const mappedWitness = witness ? "Si":"No";
    const mappedWitnessName= witnessName ? witnessName:"";
    const mappedWitnessId= witnessIdNumber ? witnessIdNumber:"";
    const mappedReporterName=reporterName ? reporterName:"";
    const mappedBrigadeMember = brigadeMember ? brigadeMember:"";
    const mappedAditionalComments = additionalComments ? additionalComments:"";
    const mappedResearched= researched ? "Si":"No";
    const mappedResearcherName = researcherName ? researcherName:"";
    const mappedResearchDate = researchDate ? researchDate:"";
    const mappedActionPlan = actionPlan ? actionPlan:""; 
    const mappedActionExecutionDate = actionExecutionDate ? actionExecutionDate:"";
    const mappedState= state ? "Cerrado":"Abierto";

    let report = `
    <!doctype html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>Accidente de ${name}</title>
    <style>
    .personal-info{
        border: 2px solid #7D7F7D;
        padding:20px 20px;
    }
    .personal-info h1{
        font-weight:bold;
        font-size:18px;
        color:#000;
    }
    .personal-info h2{
        font-weight:bold;
        font-size:14px;
        color:#000;
    }
    .personal-info h4{
        font-size:14px;
        color:#000;
    }

    </style>
    </head>
    <body>
    <div class"personal-info">
    <h1>Información Personal</h1>
    <h2>Nombre: </h2><h4>${name} ${lastName}</h4>
    <h2>Cedula: </h2><h4>${idNumber}</h4>
    <h2>Empresa: </h2><h4>${company}</h4>
    <h2>Área: </h2><h4>${mappedArea}</h4>
    </div>
    <div class="event-info">
    <h1>Información del evento</h1>
    <h2>Fecha y hora del accidente: </h2><h4>${eventDate}</h4>
    <h2>Fecha y hora de entrada: </h2><h4>${arrivalDate}</h4>
    <h2>Parte del cuerpo afectada: </h2><h4>${bodyPartAffected}</h4>
    <h2>Tipo de accidente: </h2><h4>${mappedAccidentType}</h4>
    </div>
    <div class="event-description">
    <h1>Descripción del evento</h1>
    <h2>Descripción: </h2><h4>${description}</h4>
    <h2>Testigos: </h2><h4>${mappedWitness}</h4>
    <h2>Nombre del testigo: </h2><h4>${mappedWitnessName}</h4>
    <h2>Cédula del testigo: </h2><h4>${mappedWitnessId}</h4>
    <h2>Brigadista: </h2><h4>${mappedBrigadeMember}</h4>
    <h2>Nombre quién reporta: </h2><h4>${mappedReporterName}</h4>
    <h2>Comentarios Adicionales: </h2><h4>${mappedAditionalComments}</h4>
    </div>
    <div class="research-info">
    <h1>Investigación</h1>
    <h2>Investigado: </h2><h4>${mappedResearched}</h4>
    <h2>Nombre del investigador: </h2><h4>${mappedResearcherName}</h4>
    <h2>Fecha de la investigación: </h2><h4>${mappedResearchDate}</h4>
    <h2>Plan de acción: </h2><h4>${mappedActionPlan}</h4>
    <h2>Fecha de ejecución: </h2><h4>${mappedActionExecutionDate}</h4>
    <h2>Estado del caso: </h2><h4>${mappedState}</h4>
    </div>
    </body>
    </html>
    `
    return report;
}

async function generateReport(template) {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    const html = template;
    await page.setContent(html, {
        waitUntil: 'domcontentloaded'
    });
    const pdfBuffer = await page.pdf({
        printBackground: true,
        format: "Letter",
        margin: {
            top: "20px",
            bottom: "40px",
            left: "20px",
            right: "20px"
        }
    });
    
    
    /*await page.pdf({
        format: 'A4',
        path: `${__dirname}/my-fance-invoice.pdf`
    })*/
    
      // close the browser
    await browser.close();
    return pdfBuffer;
}

module.exports = {
    filterAccident,
    getFilesName,
    accidentTemplate,
    generateReport
}