//inject directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('MyCtrl', ['$scope', 'Upload', function($scope, Upload) {
    //axpo-data
    $scope.address = "";
    $scope.database = "";
    $scope.tableName = "";
    $scope.username = "";
    $scope.password = "";

    $scope.infotext = "Please enter the password and select the file to upload";

    // upload later on form submit or something similar
    $scope.submit = function() {
        if ($scope.password.length && $scope.form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
        } else {
            alert('Empty or invalid required fields, please verify.');
        }
    };

    // upload on file select or drop
    $scope.upload = function(file) {
        $scope.infotext = "Sending the file...please wait."
        Upload.upload({
            url: '',
            data: {
                file: file,
                password: $scope.password
            }
        }).then(function(resp) {
            $scope.infotext = "Please enter the password and select the file to upload"
            console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
            alert('Success ' + resp.config.data.file.name + ' uploaded.');
        }, function(resp) {
            $scope.infotext = "Please enter the password and select the file to upload"
            if (resp.status === 500) {
                var errorMessage = resp.statusText + ': ' + resp.status + '.\n\n';
                if (resp.data) {
                    var detailMessage = 'Detail Message: ' + resp.data + '.\n\n';
                }else{
                    var detailMessage = 'No details.\n\n';
                }
                var genericMessage = 'Please verify your password and spreadsheet.';

                alert(errorMessage + detailMessage + genericMessage);
            } else {
                alert('Server error: ' + resp.status + '. Please report to your service provider.');
            }

        }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
}]);