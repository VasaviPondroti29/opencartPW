import fs from 'fs';
import { parse } from 'csv-parse/sync';
import * as xlsx from "xlsx";

export class dataprovider {

    static gettestdatafromjson(filePath: string) {
        let data: any = JSON.parse(fs.readFileSync(filePath, 'utf8') as string);
        return data;
    }


    static gettestdatafromcsv(filePath: string) {
        let data: any =parse(fs.readFileSync(filePath,'utf-8'), {columns: true, skip_empty_lines: true });
        return data;
    }

    static gettestdatafromexcel(filePath:string){
        
        let workbook= xlsx.readFile(filePath); //read the workbook
        let sheetname=workbook.SheetNames[0]; 
        let sheet=workbook.Sheets[sheetname]; //get the first sheet

        //convert to JSON array
        let data=xlsx.utils.sheet_to_json(sheet);
        return data;

    }

}