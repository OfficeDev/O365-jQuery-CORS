// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

(function () {

    var baseEndpoint = 'https://' + tenant + '-my.sharepoint.com';

    var viewHTML; // The HTML for this View

    // This config object is defined in app.js.
    var authContext = new AuthenticationContext(config);

    function refreshViewData() {

        // Empty old view contents.
        var $dataContainer = $(".data-container");
        $dataContainer.empty();
        var $loading = $(".view-loading");

        console.log("Fetching files from OneDrive...");

        // Acquire token for Files resource.
        authContext.acquireToken(baseEndpoint, function (error, token) {

            // Handle ADAL Errors.
            if (error || !token) {
                printErrorMessage('ADAL error occurred: ' + error);
                return;
            }

            // Execute GET request to Files API.
            // Refer to the API reference for more information: https://msdn.microsoft.com/en-us/office/office365/api/files-rest-operations
            $.ajax({
                type: "GET",
                url: baseEndpoint + "/_api/v1.0/me/files",
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }).done(function (response) {
                console.log('Successfully fetched files from OneDrive.');
                console.log(response);

                var $html = $(viewHTML);
                var $template = $html.find(".data-container");
                var output = '';

                response.value.forEach(function (item) {
                    var $entry = $template;
                    $entry.find(".view-data-type").html(item.type);
                    $entry.find(".view-data-name").html(item.name);
                    output += $entry.html();
                });

                // Update the UI.
                $loading.hide();
                $dataContainer.html(output);

            }).fail(function () {
                console.log('Fetching files from OneDrive failed.');
                printErrorMessage('Something went wrong! Try refreshing the page.');
            });
        });
    }

    function clearErrorMessage() {
        var $errorMessage = $(".app-error");
        $errorMessage.empty();
    };

    function printErrorMessage(mes) {
        var $errorMessage = $(".app-error");
        $errorMessage.html(mes);
    }

    // Module definition. 
    window.filesApiCtrl = {
        requireADLogin: true,
        preProcess: function (html) {
        },
        postProcess: function (html) {
            viewHTML = html;
            refreshViewData();
        },
    };
}());

//*********************************************************  
//  
//O365 jQuery and CORS Sample, https://github.com/OfficeDev/O365-jQuery-CORS
// 
//Copyright (c) Microsoft Corporation 
//All rights reserved.  
// 
//MIT License: 
// 
//Permission is hereby granted, free of charge, to any person obtaining 
//a copy of this software and associated documentation files (the 
//""Software""), to deal in the Software without restriction, including 
//without limitation the rights to use, copy, modify, merge, publish, 
//distribute, sublicense, and/or sell copies of the Software, and to 
//permit persons to whom the Software is furnished to do so, subject to 
//the following conditions: 
// 
//The above copyright notice and this permission notice shall be 
//included in all copies or substantial portions of the Software. 
// 
//THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND, 
//EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
//MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
//LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
//OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
//WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
//  
//********************************************************* 