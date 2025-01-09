import { ValidationOptions } from "class-validator";
import { Validator } from "sequelize";


export function IsCEP(validationOptions?: ValidationOptions)  {
    return function(target: any, propertyKey: string){
        let originalMethod = target[propertyKey];

        Object.defineProperty(target, propertyKey, {
            get(){
                return originalMethod;
            },
            set(value: string){
                const cepFiltrado = /^\d{5}-?\d{3}$/;
                if (!cepFiltrado.test(value)) {
                    throw new Error(`Cep invalido`);
                }
                originalMethod = value;
            },
            enumerable: true,
            configurable: true
        })
    }
}