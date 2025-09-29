angular.module('iceCreamApp')
.component('productPage', {
  bindings: { product: '<', onBack: '&' },
  template: `
    <div class="product-panel">
      <h3>{{ $ctrl.product.title }}</h3>

      <div class="selector-row">
        <label>Size:</label>
        <select ng-model="$ctrl.selectedSize"
                ng-options="size for size in $ctrl.sizes"
                ng-change="$ctrl.updatePrice()">
        </select>
      </div>

      <div class="image-box">
        <img ng-src="{{$ctrl.selectedFlavor.image}}"
             ng-style="{ width: $ctrl.imageSize + 'px', height: $ctrl.imageSize + 'px' }">
      </div>

      <p class="price">Price: ₹{{$ctrl.currentPrice}}</p>

      <p>Select Flavor:</p>
      <div class="flavors">
        <button ng-repeat="f in $ctrl.product.flavors"
                ng-class="{active: f.name === $ctrl.selectedFlavor.name}"
                ng-click="$ctrl.selectFlavor(f)">
          {{ f.name }}
        </button>
      </div>

      <p>Quantity: <input type="number" ng-model="$ctrl.quantity" min="1"></p>

      <div class="buttons">
        <button ng-click="$ctrl.addToCart()">Add to Cart</button>
        <button ng-click="$ctrl.onBack()">Back</button>
      </div>
    </div>
  `,
  controller: function(cartService) {
    var ctrl = this;
    ctrl.$onInit = function() {
      ctrl.quantity = 1;
      ctrl.selectedFlavor = ctrl.product.flavors[0];
      ctrl.sizes = ['Small', 'Medium', 'Large'];
      ctrl.selectedSize = ctrl.sizes[0];
      ctrl.updatePrice();
    };

    ctrl.selectFlavor = function(flavor) { ctrl.selectedFlavor = flavor; };
    ctrl.updatePrice = function() {
      if(ctrl.selectedSize==='Small') ctrl.imageSize = 120;
      else if(ctrl.selectedSize==='Medium') ctrl.imageSize = 160;
      else ctrl.imageSize = 200;
      ctrl.currentPrice = ctrl.product.prices[ctrl.selectedSize];
    };

    ctrl.addToCart = function() {
      cartService.addItem({
        product: ctrl.product,
        flavor: ctrl.selectedFlavor,
        size: ctrl.selectedSize,
        quantity: ctrl.quantity,
        pricePerItem: ctrl.currentPrice
      });
      alert('Added to cart!');
    };
  }
});
