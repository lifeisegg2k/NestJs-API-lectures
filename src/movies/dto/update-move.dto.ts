import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateMovieDto } from './create-move.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}