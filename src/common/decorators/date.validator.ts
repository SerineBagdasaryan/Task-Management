import { registerDecorator, ValidationOptions } from 'class-validator';
import { isDate, parse } from 'date-fns';

export function IsDateFormat(format: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isDateFormat',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    const parsedDate = parse(value, format, new Date());
                    return isDate(parsedDate);
                },
                defaultMessage(): string {
                    return `Date must be in the format ${format}.`;
                },
            },
        });
    };
}
