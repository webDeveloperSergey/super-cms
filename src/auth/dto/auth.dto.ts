import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString({
    message: 'Почта обязательна',
  })
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Минимальная длина пароля 6 символов',
  })
  @IsString({
    message: 'Пароль обязателен',
  })
  password: string;
}
