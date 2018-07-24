export class PagingSpec {
  next?: boolean;
  prev?: boolean;
  totalPages?: boolean;

  constructor(paging: Array<'next' | 'prev' | 'totalPages'>) {
    paging.forEach(flag => this[flag] = true);
  }
}
