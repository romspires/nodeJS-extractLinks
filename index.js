import chalk from 'chalk';
import { readFile } from 'node:fs/promises';

function extractLinks(text){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResults = [];
    let temp;
    while((temp = regex.exec(text)) !== null){
        arrayResults.push({ [temp[1]]: temp[2] })
    }
    return arrayResults;
}

function errorHandling(error){
    throw new Error(chalk.red(error.code, '- Roms says: There is no file in the specified path.'));
}

async function getFile(filePath){
    const encoding = 'utf-8';
    try{
        const promises = await readFile(filePath, encoding);
        const text = promises;
        console.log(extractLinks(text));
    } catch (error){
        errorHandling(error);
    }
}

getFile('./arquivos/texto1.md');