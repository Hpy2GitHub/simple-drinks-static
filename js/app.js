// Ionic Starter App - Converted to Static Web App

// Remove 'firebase' from dependencies, keep ngStorage
angular.module('starter', ['ionic', 'ngRoute', 'ngStorage'])

.controller('MainCtrl', function ($scope, $localStorage) {  
    
    // Initialize with saved data or default drinks
    $scope.initializeDrinks = function() {
        $scope.defaultDrinks = [
            {"name": "Coke", "img": "soda", "count": 0, "id": 0},
            {"name": "Gingerale", "img": "ysoda", "count": 0, "id": 1},
            {"name": "Coffee", "img": "cp4", "count": 0, "id": 2},
            {"name": "Decaf", "img": "ycp4", "count": 0, "id": 3},
            {"name": "Tea", "img": "cup4", "count": 0, "id": 4},
            {"name": "Decaf Tea", "img": "ycup4", "count": 0, "id": 5},
            {"name": "Water", "img": "ywater", "count": 0, "id": 6},
            {"name": "Perrier", "img": "ywater", "count": 0, "id": 7},
            {"name": "Booze", "img": "cocktail", "count": 0, "id": 8}
        ];
        
        // Load today's data or start fresh
        var today = new Date().yyyymmdd();
        var storageKey = 'drinks_' + today;
        
        if ($localStorage[storageKey]) {
            $scope.drinks = $localStorage[storageKey];
        } else {
            $scope.drinks = angular.copy($scope.defaultDrinks);
        }
    };
    
    // Clear all drinks for today
    $scope.clearAll = function() {
        $scope.drinks = angular.copy($scope.defaultDrinks);
        $scope.saveToStorage();
    }; 
    
    $scope.increment = 1;
    $scope.last_clicked = new Date();
    $scope.today = "";
    $scope.drinks = [];
    
    // Initialize the app
    $scope.initializeDrinks();
        
    $scope.saveDate = function() {
        $scope.last_clicked = new Date();
        $scope.today = $scope.last_clicked.getFullYear().toString() + "-" +
        ($scope.last_clicked.getMonth()+1).toString() +"-" + 
            $scope.last_clicked.getDay().toString();
    }
    
    // Save current drinks to localStorage
    $scope.saveToStorage = function() {
        var today = new Date().yyyymmdd();
        var storageKey = 'drinks_' + today;
        $localStorage[storageKey] = $scope.drinks;
    };
           
    $scope.isSameDay = function(dateToCheck) {
        var actualDate = new Date();
        return (dateToCheck.getDate() == actualDate.getDate() 
        && dateToCheck.getMonth() == actualDate.getMonth()
        && dateToCheck.getFullYear() == actualDate.getFullYear());
    };
    
    $scope.imgClicked = function(id) {
        $scope.drinks[id].count = $scope.drinks[id].count + $scope.increment;
        $scope.saveDate();
        $scope.saveToStorage(); // Auto-save after each click
    };
   
   $scope.addDirection = function() {
        $scope.increment = 1;
        $scope.saveDate();
   };
   
   $scope.rmDirection = function() {
        $scope.increment = -1;
        $scope.saveDate();
   };
 
    // Replace Firebase saveAll with localStorage
    $scope.saveAll = function() {
        $scope.saveToStorage();
        alert('Data saved locally!');
    };
   
   // Download data from localStorage for today
   $scope.downloadData = function() {
       var today = new Date().yyyymmdd();
       var storageKey = 'drinks_' + today;
       
       if ($localStorage[storageKey]) {
           $scope.drinks = $localStorage[storageKey];
           alert('Today\'s data loaded!');
       } else {
           alert('No data found for today');
       }
   };
   
   // Upload/Save data to localStorage and create downloadable file
   $scope.uploadData = function() {
        $scope.saveToStorage();
        
        // Create downloadable JSON file
        var today = new Date().yyyymmdd();
        var dataStr = JSON.stringify($scope.drinks, null, 2);
        var dataBlob = new Blob([dataStr], {type: 'application/json'});
        var url = URL.createObjectURL(dataBlob);
        
        var link = document.createElement('a');
        link.href = url;
        link.download = 'drinks_data_' + today + '.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        alert('Data saved and downloaded!');
   };
   
   // Remove Firebase URL function
   // $scope.url = function() {
   //     d = new Date();
   //     return 'https://sweltering-heat-443.firebaseIO.com/app/ionic/drinks/'+d.yyyymmdd()+'/';
   // };
})

// Remove Cordova-specific code for web version
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Remove Cordova keyboard and StatusBar code for web version
    console.log('Drinks Tracker loaded successfully!');
  });
})

// Keep the date helper function
Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
};
