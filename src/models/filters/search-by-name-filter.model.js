import FilterModel from './filter.model';

export default class SearchByNameFilter extends FilterModel {
  constructor( searchString ){
    super('mahrio.filters.searchbyname', 'AND', () => {});

    this.searchString = searchString;
    this.filter = tutorial => new RegExp( this.searchString, 'i').test( tutorial.title );
  }
}