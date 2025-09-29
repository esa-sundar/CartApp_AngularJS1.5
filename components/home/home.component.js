angular.module('iceCreamApp')
.component('homePage', {
  template: `
    <h2 style="text-align:center; margin-bottom:30px;">Our Products</h2>
    <div class="home-wrapper">
      <div class="product-list">
        <div class="product-row">
          <div class="product" ng-repeat="p in $ctrl.products" ng-click="$ctrl.selectProduct(p)">
            <div class="image-box">
              <img ng-src="{{p.image}}" alt="{{p.title}}">
            </div>
            <h4>{{p.title}}</h4>
            <p>Starts at: ₹{{p.prices.Small}}</p>
          </div>
        </div>
      </div>

      <product-page ng-if="$ctrl.selectedProduct"
                    product="$ctrl.selectedProduct"
                    on-back="$ctrl.selectedProduct = null">
      </product-page>
    </div>
  `,
  controller: function() {
    var ctrl = this;
    ctrl.selectedProduct = null;
    ctrl.products = [
      { id: 1, title: 'Ice Cream', prices: { Small: 50, Medium: 70, Large: 90 }, image: 'images/front_1.jpg',
        flavors: [
          {name:'Vanilla', image:'images/vanilla_flavor.png'},
          {name:'Chocolate', image:'images/chocolate_flavor.png'},
          {name:'Strawberry', image:'images/strawberry_flavor.png'}
        ]
      },
      { id: 2, title: 'Popsicle', prices: { Small: 30, Medium: 45, Large: 60 }, image: 'images/front_2.png',
        flavors: [
          {name:'Orange', image:'images/orange_flavor.png'},
          {name:'Grape', image:'images/grapes.png'},
          {name:'Lime', image:'images/lime_flavor.png'}
        ]
      }
    ];
    ctrl.selectProduct = function(product) { ctrl.selectedProduct = product; };
  }
});
