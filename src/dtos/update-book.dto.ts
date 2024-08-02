import { IsOptional, IsString, IsUUID, Validate, IsArray, ValidateNested, IsNotEmpty, ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';
import { Type } from 'class-transformer';

export function OnlyIdAllowed(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'OnlyIdAllowed',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const keys = Object.keys(value);
          return keys.length === 1 && keys[0] === 'id';
        },
        defaultMessage(args: ValidationArguments) {
          return 'Only the id attribute is allowed.';
        }
      },
    });
  };
} 

class PublisherDTO {
  @IsUUID()
  @IsNotEmpty()
  @Validate(OnlyIdAllowed, {
    message: 'Only the id attribute is allowed.',
  })
  id: string;
}

class AuthorUpdateDTO {
  @IsUUID()
  @IsNotEmpty()
  @Validate(OnlyIdAllowed, {
    message: 'Only the id attribute is allowed.',
  })
  id: string;
}

export class UpdateBookDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  isbn?: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  pages?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PublisherDTO)
  publisher?: PublisherDTO;

  @IsOptional()
  @IsUUID()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AuthorUpdateDTO)
  authors?: AuthorUpdateDTO[];
}