angular.module('iceCreamApp')
.service('productService', function($http, $q) {
    var service = this;
    service.getProducts = function() {
        return $http.get('data/products.json')
            .then(res => res.data)
            .catch(err => $q.reject(err));
    };
});
