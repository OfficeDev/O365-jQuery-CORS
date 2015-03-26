// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

(function () {

    // The HTML for this View
    var viewHTML;
    // Instantiate the ADAL AuthenticationContext
    var authContext = new AuthenticationContext(config);

    function refreshViewData() {

        // Empty Old View Contents
        var $dataContainer = $(".data-container");
        $dataContainer.empty();
        var $loading = $(".view-loading");

        var user = authContext.getCachedUser();

        var $html = $(viewHTML);
        var $template = $html.find(".data-container");
        var output = '';

        for (var property in user.profile) {
            if (user.profile.hasOwnProperty(property)) {
                var $entry = $template;
                $entry.find(".view-data-claim").html(property);
                $entry.find(".view-data-value").html(user.profile[property]);
                output += $entry.html();
            }
        }

        // Update the UI
        $loading.hide();
        $dataContainer.html(output);
    };

    // Module
    window.userDataCtrl = {
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