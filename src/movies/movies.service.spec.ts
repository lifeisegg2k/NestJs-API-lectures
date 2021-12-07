import { ConsoleLogger, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2001,
        genres: ["action", "etc"]
      });
      const movie = service.getOne(1)
      // console.log(typeof(movie));
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })
    it('should throw a NotFoundException', () => {
      try{
        service.getOne(0);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with Id: 0 not found');
      }
    })
  })

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2001,
        genres: ["action", "etc"]
      });
      // console.log(service.getAll());
      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
    })
    it('should throw a NotFoundException', () => {
      try{
        service.deleteOne(0);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe('cretae', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2001,
        genres: ["action", "etc"]
      });
      const afterCreate = service.getAll().length;
      // console.log(service.getAll());
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
    
  })

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2001,
        genres: ["action", "etc"]
      });
      service.update(1, { title: 'Update Test'});
      const movie = service.getOne(1);
      // console.log(service.getAll());
      expect(movie.title).toEqual('Update Test');
    })
    it('should throw a NotFoundException', () => {
      try{
        service.update(0, {});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
