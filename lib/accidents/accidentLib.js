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

function getFilesName(fileArray){ 
    let result=[]
    fileArray.forEach(files=> {
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
            result.push(fileName);
        }
    })
    return result;
}

module.exports = {
    filterAccident,
    getFilesName
}