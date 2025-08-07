import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsCEP(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isCEP',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const cepFiltrado = /^\d{5}-?\d{3}$/;
          return cepFiltrado.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'CEP inválido';
        }
      }
    });
  };
}
