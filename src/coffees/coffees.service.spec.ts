import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        { provide: DataSource, useValue: {} },
        { provide: 'COFFEE_BRANDS', useValue: ['buddy brew', 'nescafe'] },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // example of test naming and structure

  // method name (from coffee service becaue we are testing coffee service)
  describe('findOne', () => {
    // scenario (scenartios can be founded by "return" or "throw" statements)
    describe('when coffee with ID exists', () => {
      // assumption / test case
      it('should return the coffee object', async () => {
        // arrange
        const coffeeId = '1';
        const expectedCoffee = {};
        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        // act
        const coffee = await service.findOne(coffeeId);
        // assert
        expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe('when coffee with ID not exists', () => {
      it('should throw the "NotFoundException"', async () => {
        // arrange
        const coffeeId = '1';
        coffeeRepository.findOne.mockReturnValue(undefined);
        // act
        try {
          await service.findOne(coffeeId);
        } catch (err) {
          // assert
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
        }
      });
    });
  });
});
