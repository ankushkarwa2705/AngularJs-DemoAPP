var app1= angular.module('DemoApp', [])
    app1.controller('Controller', function ($scope,$http)
     {
        $scope.regex = '\\d+';
        $scope.multiply = function () 
        {
            var product = parseInt($scope.firstnumber) * parseInt($scope.secondnumber);
            $scope.result = product;
        };
        $scope.postRequest=function()
        {
            $http.post('/saveData',$scope.formdata).then(function(response){
            alert("Submitted successfully...");
            }).catch(function(response){
                alert("error...");
            })
        }
        $scope.getData=function(){
            $http.get('/getData').then((response)=>{
                var text="Number_1 : "+response.data["number11"]+" Number_2 : "+response.data["number22"]+" Product : "+response.data["product12"];
                $scope.replace= "Recent DataBase Record";
                $scope.loadDB=text;
            },(response)=>{
                $scope.getErrMsg="errorstatus: "+response.status.Text;
            });
        }
        $scope.getData();
    }); 