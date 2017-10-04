import FilterModel from './filter.model';

export default class NoFilter extends FilterModel {
  constructor( ){
    super('mahrio.filters.none', 'AND', tutorial => 1);
  }
}