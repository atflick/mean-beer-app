angular
  .module("beerApp", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("BeerFactory", [
    "$resource",
    BeerFactoryFunction
  ])
  .controller("beersIndexCtrl", [
    "$state",
    "BeerFactory",
    BeersIndexControllerFunction
  ])
  .controller("beersNewCtrl", [
    "$state",
    "BeerFactory",
    BeersNewControllerFunction
  ])
  .controller("beersShowCtrl", [
    "$stateParams",
    "BeerFactory",
    BeersShowControllerFunction
  ])

  function RouterFunction($stateProvider) {
    $stateProvider
      .state("welcome", {
        url: "/",
        templateUrl: "/public/js/ng-views/welcome.html"  //trying something different here, may need to cange to assets
      })
      .state("beersIndex", {
        url: "/beers",
        templateUrl: "/public/js/ng-views/beers/index.html",
        controller: "beersIndexCtrl",
        controllerAs: "vm"
      })
      .state("beersNew", {
        url: "/beers/new",
        templateUrl: "/public/js/ng-views/beers/new.html",
        controller: "beersNewCtrl",
        controllerAs: "vm"
      })
      .state("beersShow", {
        url: "/beers/:name",
        templateUrl: "/public/js/ng-views/beers/show.html",
        controller: "beersShowCtrl",
        controllerAs: "vm"
      })
  }

  function BeerFactoryFunction($resource) {
    return $resource("api/beers/:name", {}, {
      update: {method: "PUT"}
    })
  }

  function BeersIndexControllerFunction($state, BeerFactory) {
    this.beers = BeerFactory.query()

  }

  function BeersNewControllerFunction($state, BeerFactory) {
    this.newBeer = new BeerFactory()
    this.create = function() {
      this.newBeer.$save().then(function(beer) {
        $state.go("beersShow", {name: beer.name})
      })
    }
  }

  function BeersShowControllerFunction($state, BeerFactory) {
    this.beer = BeerFactory.get({name: $stateParams.name})
    this.update = function() {
      this.beer.$update({name:$stateParams.name})
    }
  }
