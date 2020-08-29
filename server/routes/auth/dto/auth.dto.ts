import { IsNotEmpty, IsString, Length } from "class-validator";

export class loginRequest {
    constructor(){
        this.id = '';
        this.pw = '';
    }

    @IsNotEmpty()
    @IsString()
    @Length(0,20)
    id: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(0,20)
    pw: string;
}