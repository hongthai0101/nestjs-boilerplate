import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { get } from 'lodash';

export const DEFAULT_PER_PAGE = 10;
export const DEFAULT_PAGE = 1;

export class QueryBaseList {
  constructor(
    defaultSort: string,
    defaultPage?: number,
    defaultPerPage?: number,
  ) {
    this.sort = defaultSort;
    this.page = defaultPage;
    this.limit = defaultPerPage;
  }

  @ApiProperty({
    required: false,
    example: 'createdAt@asc',
    default: 'createdAt@asc',
  })
  @Exclude()
  @IsOptional()
  @IsString()
  readonly sort: string;

  @ApiProperty({
    required: false,
    example: 1,
    default: 1,
  })
  @Exclude()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  readonly page: number;

  @ApiProperty({
    required: false,
    example: 10,
    default: 10,
  })
  @Exclude()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Max(100)
  readonly limit: number;

  @ApiProperty({
    required: false,
    example: 'relation1,relation2',
  })
  @Expose()
  @IsOptional()
  @IsString()
  readonly relations: string;

  @ApiProperty({
    required: false,
    example: 'search',
    default: '',
  })
  @IsOptional()
  @Expose()
  @Transform(({ value }) => (value ? value : undefined), {
    toClassOnly: true,
  })
  readonly search?: string;

  @Expose()
  @Transform(
    ({ value, obj }) => {
      const order = getOrder(obj);
      const take = getTake(obj);
      const skip = getSkip(obj, take);
      const relations = getRelations(obj);

      return relations.length === 0
        ? { order, take, skip }
        : { order, take, skip, relations };
    },
    {
      toClassOnly: true,
    },
  )
  readonly filter: Record<string, any>;
}

function getOrder(obj): object {
  const value = obj.sort || 'createdAt@desc';

  const fieldSort: string = get(value.split('@'), 0, 'createdAt');
  const typeSort: number = get(value.split('@'), 1, 'desc');

  return { [fieldSort]: typeSort };
}

function getTake(obj): number {
  const take = obj.limit || DEFAULT_PER_PAGE;
  return isNaN(take) ? DEFAULT_PER_PAGE : +take;
}

function getSkip(obj, take: number): number {
  let page = obj.page || DEFAULT_PAGE;
  page = isNaN(page) ? DEFAULT_PAGE : page;
  return page * take - take;
}

function getRelations(obj): Array<string> {
  const relations = obj.relations;
  if (!relations) return [];
  return relations.split(',');
}
