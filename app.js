angular.module('iceCreamApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/products');

    $stateProvider
      .state('home', { url: '/products', component: 'homePage' })
      .state('cart', { url: '/cart', component: 'cartPage' })
      .state('checkout', { url: '/checkout', component: 'checkoutPage' });
});
