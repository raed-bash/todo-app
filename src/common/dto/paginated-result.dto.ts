import { PaginatedQueryDto } from "./paginated-query.dto";

class PaginatedMetadata {
  total!: number;

  lastPage!: number;

  currentPage!: number;

  perPage!: number;

  prev!: number;

  next!: number;
}

export class PaginatedResultsDto<T> {
  data!: T[];

  meta!: PaginatedMetadata;
}
