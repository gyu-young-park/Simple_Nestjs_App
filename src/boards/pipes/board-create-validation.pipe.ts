import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class BoardCreateValidationPipe implements PipeTransform {
    transform(value : any, metadata : ArgumentMetadata){
        const title = value.title as string
        const desc = value.description as string

        if( title === "" || desc === "" || title === undefined || desc === undefined){
            throw new BadRequestException("Wrong input value")
        }
        return value;
    }
}