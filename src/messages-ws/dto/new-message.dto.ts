import { IsString, MinLength } from 'class-validator';

export class NewMessageDto {
  @MinLength(1)
  @IsString()
  message: string;
}
