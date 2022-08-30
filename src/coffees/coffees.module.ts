import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

// temporary fake mock for below example
// class MockCoffeesService {}
// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    // do something
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: () => ['buddy brew', 'nescafe'],
    },
  ],
  // -===- CUSTOM PROVIDERS USAGE EXAMPLES -===-
  // -=- <async useFactory> mock custom provider -=-
  // providers: [
  //   CoffeesService,
  //   {
  //     provide: COFFEE_BRANDS,
  //     // Note "async" here, and Promise/Async event inside the Factory function
  //     // Could be a database connection / API call / etc
  //     // In our case we're just "mocking" this type of event with a Promise
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     useFactory: async (connection: Connection): Promise<string[]> => {
  //       // const coffeeBrands = await connection.query('SELECT * ...');
  //       const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
  //       return coffeeBrands;
  //     },
  //     inject: [Connection],
  //   },
  // ],
  //
  // -=- <useFactory> custom provider -=-
  // providers: [
  //   CoffeesService,
  //   CoffeeBrandsFactory,
  //   {
  //     provide: COFFEE_BRANDS,
  //     useFactory: (brandsFactory: CoffeeBrandsFactory) =>
  //       brandsFactory.create(),
  //     inject: [CoffeeBrandsFactory],
  //   },
  // ],
  //
  // -=- <useClass> custom provider -=-
  // providers: [
  //   CoffeesService,
  //   {
  //     provide: ConfigService,
  //     useClass:
  //       process.env.NODE_ENV === 'development'
  //         ? DevelopmentConfigService
  //         : ProductionConfigService,
  //   },
  //   { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
  // ],
  //
  // -=- <useValue> custom provider -=-
  // custom provider for value, for non-nest dependencies, for example external library instances
  // providers: [{ provide: CoffeesService, useValue: new MockCoffeesService() }],
  exports: [CoffeesService],
})
export class CoffeesModule {}
