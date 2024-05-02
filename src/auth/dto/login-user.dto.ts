import {
  MinLength,
  MaxLength,
  IsString,
  IsEmail,
  Matches,
} from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @MaxLength(50)
  @MinLength(6)
  @IsString()
  password: string;
}
