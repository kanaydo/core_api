// import { Injectable } from "@nestjs/common";
// import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

// @ValidatorConstraint({ name: 'EmailExistsRule', async: true })
// @Injectable()
// export class EmailExistsRule implements ValidatorConstraintInterface {
//   validate(value: any, args?: ValidationArguments | undefined): boolean | Promise<boolean> {
//     console.log(`==========================================> validating ${value}`);
//     return false;
//   }

//   defaultMessage?(validationArguments?: ValidationArguments | undefined): string {
//     return `email already used!`;
//   }
// }

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  
  constructor(private dataSource: DataSource) { }

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [model, property = 'id', exceptField = null] = args.constraints;

    const current = await this.dataSource.getRepository(model).createQueryBuilder("q").where(`q.${property} = :term`, { term: value }).getOne();
    // console.log('================>', current);
    if (current === null) return true;

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} already used`;
  }
}

export function Unique(
  model: any,
  uniqueField: string,
  exceptField?: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, uniqueField, exceptField],
      validator: UniqueConstraint,
    });
  };
}