
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
    path: '/vsign/:link',
    componentUrl: './view/vitalsign.html',
  },
  {
    path: '/addvsign/:link/:id/:name',
    componentUrl: './view/vitalsign.html',
  },
  {
    path: '/listvsign/:link',
    componentUrl: './view/listvitalsign.html',
    routes: [
      {
        path: '/detail/:id/:pname/:link',
        componentUrl: './view/vitalsigndetail.html',
      },
    ],
  },
  {
    path: '/listitem/:link',
    componentUrl: './view/listitem.html',
  },
  {
    path: '/visit/:link',
    componentUrl: './view/visit.html',
  },
  {
    path: '/profile/:link',
    componentUrl: './view/changepwd.html',
  },
  {
    path: '/patienthistory/:link',
    componentUrl: './view/patientHistory.html',
  },
  {
    path: '/summary/:link',
    componentUrl: './view/saleSummaryChart.html',
  },
  {
    path: '/inventory/:link',
    componentUrl: './view/InventoryBylocation.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
  
];
