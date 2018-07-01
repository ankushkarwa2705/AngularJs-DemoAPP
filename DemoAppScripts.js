var app1= angular.module('DemoApp', [])
    app1.controller('Controller', function ($scope, $http)
     {
        $scope.regex = '\\d+';
        $scope.save_data=function()
        {
            $http.post('/saveData',$scope.formdata).then(function(){
            alert("Submitted successfully...");
            })
        }
        $scope.getData=function(){
            $http.get('/getData').then(function(response){
                var text="Number_1 : " + response.data["number11"] + " Number_2 : " + response.data["number22"] + " Product : " + response.data["product12"];
                $scope.LastDBEntry=text;
            });
        }
        $scope.getData();
    }); 
