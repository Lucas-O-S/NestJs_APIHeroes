import { BadRequestException, FileTypeValidatorOptions, FileValidator } from "@nestjs/common";
import { IFile } from "@nestjs/common/pipes/file/interfaces";

export interface MinFileSizeValidatorOptions{
    //minSize em bits
    minSize: number; 
}

export class MinFileSizeValidator extends FileValidator<MinFileSizeValidatorOptions,IFile> {

    constructor(validationOptions: { minSize: number }) {
        super(validationOptions);
    }

    
    isValid(file?: IFile | IFile[]): boolean | Promise<boolean> {
        if (!file) return false;
        if(!Array.isArray(file)){
            console.log(`imagem ${file.size} - minimo: ${this.validationOptions.minSize} `)

            return this.validationOptions.minSize <= file.size
        }
        else{
            return file.every((element => 
                element.size >= this.validationOptions.minSize
            ))
        }

    }
    
    buildErrorMessage(file: any): string {
        return `O tamanho do arquivo deve ser no mínimo ${this.validationOptions.minSize} bytes.`;
    }
        


    

}