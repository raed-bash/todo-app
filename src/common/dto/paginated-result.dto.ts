import { PaginatedQueryDto } from "./paginated-query.dto";

export class PaginatedMetadata {
  total!: number;

  lastPage!: number;

  currentPage!: number;

  perPage!: number;
}

export class PaginatedResultsDto<T> {
  data!: T[];

  meta!: PaginatedMetadata;
}
