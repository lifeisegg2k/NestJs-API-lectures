import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { identity } from 'rxjs';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-move.dto';
import { UpdateMovieDto } from './dto/update-move.dto';

@Controller('movies')
export class MoviesController {
    constructor(readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[]{
        return this.moviesService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') movieID: number): Movie {
        return this.moviesService.getOne(movieID);
    }

    @Post()
    create(@Body() moveData: CreateMovieDto){
        return this.moviesService.create(moveData);
    }

    @Delete('/:id')
    remove(@Param('id') movieID: number){
        return this.moviesService.deleteOne(movieID);
    }

    @Patch('/:id')
    patch(@Param('id') movieID: number, @Body() updateData: UpdateMovieDto){
        return {
            updateMovie: movieID,
            ...updateData,
        };
    }
}
