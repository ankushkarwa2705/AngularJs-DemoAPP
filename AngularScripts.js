var app = angular.module('DemoApp', []);
app.controller('AppCtrl', function ($scope) {
    $scope.firstfun = function () {
        var patt = /^\d+$/;
        if (patt.test($scope.firstnumber) && patt.test($scope.secondnumber)) 
        {
            document.getElementById("id_1").style.fontWeight = "normal";
            document.getElementById("id_1").style.color = "black";
            document.getElementById("id_2").style.fontWeight = "normal";
            document.getElementById("id_2").style.color = "black";
            document.getElementById("Button").disabled = false;
        }
        else {
            document.getElementById("Button").disabled = true;
            if(!patt.test($scope.firstnumber) && patt.test($scope.secondnumber)){
                document.getElementById("id_1").style.fontWeight = "bold";
                document.getElementById("id_1").style.color = "red";
                document.getElementById("id_2").style.fontWeight = "normal";
                document.getElementById("id_2").style.color = "black";
            }
            else if(!patt.test($scope.secondnumber) && patt.test($scope.firstnumber)){
                document.getElementById("id_1").style.fontWeight = "normal";
                document.getElementById("id_1").style.color = "black";
                document.getElementById("id_2").style.fontWeight = "bold";
                document.getElementById("id_2").style.color = "red";
            }
            else {
                document.getElementById("id_1").style.fontWeight = "bold";
                document.getElementById("id_1").style.color = "red";
                document.getElementById("id_2").style.fontWeight = "bold";
                document.getElementById("id_2").style.color = "red";
            }
        }
    };
    $scope.check_reload = function () {
        fetch('last_db_record.txt')
            .then(response => response.text())
            .then(text => {
                console.log(text);
                document.getElementById("id_4").innerHTML = text;
            });
    };
});