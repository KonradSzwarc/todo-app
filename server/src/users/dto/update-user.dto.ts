import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { ThemeKey, Language } from '../user.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(Language)
  @IsOptional()
  @ApiProperty({ enum: Language, enumName: 'Language', default: Language.EN })
  language?: Language;

  @IsEnum(ThemeKey)
  @IsOptional()
  @ApiProperty({ enum: ThemeKey, enumName: 'ThemeKey', default: ThemeKey.LIGHT })
  theme?: ThemeKey;
}
