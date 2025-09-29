angular.module('iceCreamApp')
.component('cartPage', {
  template: `
    <h2 style="text-align:center; margin-bottom:20px;">Cart</h2>
    <div class="cart-container">
      <div ng-if="$ctrl.items.length===0" class="empty-cart">Cart is empty</div>

      <div class="cart-item" ng-repeat="item in $ctrl.items track by $index">
        <div class="cart-left">
          <img ng-src="{{item.flavor.image}}">
        </div>
        <div class="cart-right">
          <h4>{{item.product.title}} - {{item.flavor.name}}</h4>
          <p>Size: {{item.size}}</p>
          <p>Quantity: <input type="number" ng-model="item.quantity" ng-change="$ctrl.updateQuantity($index,item.quantity)" min="1"></p>
          <p>Price: ₹{{item.pricePerItem}} each</p>
          <p>Total: ₹{{item.pricePerItem*item.quantity}}</p>
          <button ng-click="$ctrl.remove($index)">Remove</button>
        </div>
      </div>

      <p class="cart-total" ng-if="$ctrl.items.length>0">Total: ₹{{$ctrl.getTotal()}}</p>
    </div>
  `,
  controller: function(cartService) {
    var ctrl = this;
    ctrl.items = cartService.items;

    ctrl.getTotal = function() { return cartService.getTotal(); };
    ctrl.remove = function(i) { cartService.removeItem(i); };
    ctrl.updateQuantity = function(i, qty) { cartService.updateQuantity(i, qty); };
  }
});
