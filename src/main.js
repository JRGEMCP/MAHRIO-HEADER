import headerView from './header/index.html';

var header = document.createElement('div');
header.innerHTML = headerView;
document.getElementsByTagName('body')[0].prepend( header );

