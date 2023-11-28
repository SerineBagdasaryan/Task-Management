import { registerDecorator, ValidationOptions } from 'class-validator';
import { isDate, parse, isAfter, isSameDay } from 'date-fns';

export function IsDateFormat(
  format: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const parsedDate = parse(value, format, new Date());
          return (
            isDate(parsedDate) &&
            (isAfter(parsedDate, new Date()) ||
              isSameDay(parsedDate, new Date()))
          );
        },
        defaultMessage(): string {
          return `Date must be in the format ${format}.`;
        },
      },
    });
  };
}
