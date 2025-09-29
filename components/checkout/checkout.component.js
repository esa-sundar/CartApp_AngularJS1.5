angular.module('iceCreamApp')
.component('checkoutPage', {
  template: `
    <h2 style="text-align:center; margin-bottom:20px;">Checkout</h2>
    <div class="checkout-container">
      <div ng-if="$ctrl.items.length===0" class="empty-cart">No items to checkout</div>

            <p class="checkout-total" ng-if="$ctrl.items.length>0">Grand Total: ₹{{$ctrl.getTotal()}}</p>

      <form name="billingForm" class="billing-form" ng-submit="$ctrl.placeOrder(billingForm)" novalidate>
        <label>Name:</label>
        <input type="text" ng-model="$ctrl.billing.name" name="name" ng-pattern="/^[a-zA-Z ]+$/" required>
        <p class="error" ng-show="billingForm.name.$dirty && billingForm.name.$error.pattern">Name should contain only letters.</p>

        <label>Phone:</label>
        <input type="tel" ng-model="$ctrl.billing.phone" name="phone" ng-pattern="/^\\d{10}$/" required>
        <p class="error" ng-show="billingForm.phone.$dirty && billingForm.phone.$error.pattern">Enter a valid 10-digit phone number.</p>

        <button type="submit" ng-disabled="billingForm.$invalid || $ctrl.items.length===0">Place Order</button>
      </form>
<loading-spinner ng-if="$ctrl.loading">Processing order...</loading-spinner>
      <div class="confirmation" ng-if="$ctrl.orderPlaced">
        <h3>✅ Thank you for your order!</h3>
        <p>Customer: {{$ctrl.billing.name}}</p>
        <p>Phone: {{$ctrl.billing.phone}}</p>
        <p>Grand Total: ₹{{$ctrl.orderTotal}}</p>
      </div>
    </div>
    
     <p ng-if="$ctrl.success">Order placed successfully!</p>
  `,
  controller: function(cartService, $timeout) {
    var ctrl = this;
    ctrl.items = cartService.items;
    ctrl.billing = {};
    ctrl.orderPlaced = false;

    ctrl.getTotal = function() { return cartService.getTotal(); };

    ctrl.placeOrder = function(form) {
  if(form.$valid && ctrl.items.length > 0) {
    ctrl.loading = true; // show spinner
    $timeout(function(){
      ctrl.loading = false;
        ctrl.orderTotal = ctrl.getTotal();
      ctrl.orderPlaced = true;
      cartService.items = [];
    }, 1500);
  }
};

  }
});
