import { IsString } from "class-validator";

export class CreateCarDto {
    @IsString()
    model: string;

    @IsString()
    brand: string
}
