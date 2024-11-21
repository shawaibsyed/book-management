import {
  IsString,
  IsInt,
  IsDateString,
  IsISBN,
  Min,
  IsOptional,
} from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsDateString()
  @IsOptional()
  publishedDate?: string;

  @IsISBN()
  @IsOptional()
  isbn?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  pages?: number;

  @IsString()
  @IsOptional()
  language?: string;
}
