import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQuery {
  @IsOptional()
  @IsPositive()
  // @Type(() => Number) no longer need for that, while using `enableImplicitConversion` in main.ts (auto-transform to declared type)
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number)
  offset: number;
}
