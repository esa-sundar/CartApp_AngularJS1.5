angular.module('iceCreamApp')
.service('cartService', function($q, $timeout) {
    var service = this;
    service.items = [];

    service.addItem = function(item) {
        var existing = service.items.find(i =>
            i.product.id === item.product.id &&
            i.flavor.name === item.flavor.name &&
            i.size === item.size
        );
        if (existing) existing.quantity += item.quantity;
        else service.items.push(angular.copy(item));
    };

    service.removeItem = function(index) { service.items.splice(index, 1); };

    service.updateQuantity = function(index, quantity) {
        if (quantity <= 0) service.removeItem(index);
        else service.items[index].quantity = quantity;
    };

    service.getTotal = function() {
        return service.items.reduce((total, i) => total + i.quantity * i.pricePerItem, 0);
    };

    service.placeOrder = function() {
        var deferred = $q.defer();
        $timeout(function() {
            if (service.items.length > 0) {
                var order = angular.copy(service.items);
                service.items = [];
                deferred.resolve(order);
            } else deferred.reject("Cart is empty");
        }, 1500);
        return deferred.promise;
    };
});
