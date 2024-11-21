import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsISBN,
  IsInt,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title!: string; // Use `!` to assert that this will be initialized

  @IsString()
  @IsNotEmpty()
  author!: string;

  @IsDateString()
  @IsNotEmpty()
  publishedDate!: string;

  @IsISBN()
  @IsNotEmpty()
  isbn!: string;

  @IsInt()
  @Min(1)
  pages!: number;

  @IsString()
  @IsNotEmpty()
  language!: string;
}
