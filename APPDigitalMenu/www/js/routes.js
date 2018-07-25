
var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },
  // About page
  {
    path: '/about/',
    url: './pages/about.html',
    name: 'about',
  },
  {
    path: '/jointable/:id/:link',
    componentUrl: './view_digital/joinTable.html'
  },
  {
    path: '/menu/',
    componentUrl: './view_digital/Menu.html'
  },
  {
    path: '/detail/',
    componentUrl: './view_digital/DetailItem.html'
  },
  {
    path: '/currentOrder/',
    componentUrl: './view_digital/currentOrder.html'
  },
  {
    path: '/summaryOrder/',
    componentUrl: './view_digital/summaryOrder.html'
  },
  {
    path: '/currentOrderDetail/',
    componentUrl: './view_digital/currentOrderDetail.html'
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
  
];
