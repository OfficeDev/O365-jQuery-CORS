---
topic: sample
products:
- office-sp
- office-365
languages:
- javascript
extensions:
  contentType: samples
  createdDate: 3/26/2015 2:17:27 PM
---
Office 365 CORS Sample for jQuery
====================
This sample demonstrates how to use Azure Active Directory Authentication Library (ADAL) for JavaScript to secure a single-page app written independently of any frameworks. Additionally, this sample shows how to set up ADAL JS to make HTTP requests to the Office 365 APIs, as well as how to use CORS to execute a request. 

ADAL for JavaScript is an open source library.  For distribution options, source code, and contributions, check out the ADAL JS repo at https://github.com/AzureAD/azure-activedirectory-library-for-js.

For more information about how the protocols work in this scenario and other scenarios, see [Authentication Scenarios for Azure AD](http://go.microsoft.com/fwlink/?LinkId=394414).

## How To Run This Sample

Getting started is simple!  To run this sample you will need:
- Visual Studio 2013
- An Internet connection
- An Azure subscription (a free trial is sufficient)

Every Azure subscription has an associated Azure Active Directory tenant.  If you don't already have an Azure subscription, you can get a free subscription by signing up at [http://www.windowsazure.com](http://www.windowsazure.com).  All of the Azure AD features used by this sample are available free of charge.

### Step 1:  Clone or download this repository 

From your shell or command line:
`git clone https://github.com/OfficeDev/O365-jQuery-CORS.git`

### Step 2: Set up your Office 365 development environment

In order to run this sample, you'll need an Office 365 Developer Site associated with your Azure Active Directory tenant. If you already have this configured, continue on to Step 3. However, if you don't, refer to [Set up your Office 365 development environment](https://msdn.microsoft.com/en-us/office/office365/howto/setup-development-environment) on MSDN to get set up.

Return to these instructions after your Office 365 tenant is associated with your Azure tenant.

### Step 3:  Register the sample with your Azure Active Directory tenant

1. Sign in to the [Azure management portal](https://manage.windowsazure.com).
2. Click **Active Directory** in the left hand nav.
3. Click the directory tenant where you wish to register the sample application.
4. Select the **Applications** tab.
5. In the drawer, click **Add**.
6. Click **Add an application my organization is developing**.
7. Enter a friendly name for the application, for example "O365-jQuery-CORS", select **Web Application and/or Web API**, and click the arrow to continue.
8. For the sign-on URL, enter the base URL for the sample, which is by default `https://localhost:44302/`.
9. For the App ID URI, enter `https://<your_tenant_name>/O365-jQuery-CORS`, replacing `<your_tenant_name>` with the name of your Azure AD tenant.
10. Next, click the **Configure** tab near the top of the portal. 
11. Scroll down to the **permissions to other applications** section and click **Add application**.
12. Choose **Office 365 SharePoint Online** and then click the check mark icon.
13. Choose the **Delegated Permissions** column for Office 365 SharePoint Online, and check **Read users' files**.
14. Click **Save** in the bottom tray.


All done!  Before moving on to the next step, you need to find the Client ID of your application.

1. While still in the Azure portal, click the **Configure** tab of your application.
2. Find the Client ID value and copy it to the clipboard.


### Step 4:  Enable the OAuth2 implicit grant for your application

By default, applications provisioned in Azure AD are not enabled to use the OAuth2 implicit grant. In order to run this sample, you need to explicitly opt in.

1. In the [Azure Management Portal](https://manage.windowsazure.com), select the **Configure** tab for your application’s entry.
2. Use the **Manage Manifest** button in the drawer to download the manifest file for the application and save it to your computer.
3. Open the manifest file with a text editor. Search for the `oauth2AllowImplicitFlow` property. You will find that it is set to `false`; change it to `true` and save the file.
4. Use the **Manage Manifest** button to upload the updated manifest file and then click **Save** to save the app configuration. 

### Step 5:  Configure the sample to use your Azure Active Directory tenant

1. Open the solution in Visual Studio 2013.
2. Find the *App/Scripts* folder and open `config.js`. 
    * Replace the value of `tenant` with your AAD tenant name.
    * Replace the value of `clientId` with the Client ID from the Azure Management Portal.

### Step 6:  Run the sample

* Clean the solution 
* Rebuild the solution
* Run the solution 

You can trigger the sign-in experience by either clicking on the sign-in link on the top right corner, or by clicking the Files or User tab.

**Note** This sample will not work in Internet Explorer. Please use a different browser, such as Google Chrome. ADAL.js uses an iframe to get CORS API tokens for resources other than the SPA's own backend. These iframe requests require access to the browser's cookies to authenticate with Azure Active Directory. Unfortunately, cookies are not accessible to Internet Explorer when the app is running in localhost.

## About the Code

The key files containing authentication and Office 365 API logic are the following:

**app.js** - Provides the app configuration values used by ADAL for driving protocol interactions with AAD, indicates which routes should not be accessed without previous authentication, issues login and logout requests to Azure AD, handles both successful and failed authentication callbacks from Azure AD, and displays information about the user received in the **id_token**.

**filesApiCtrl.js**- Shows how to take advantage of the **acquireToken()** method in ADAL.js to get a token for accessing a resource, as well as how to make a CORS request to the Office 365 Files API. 

**userDataCtrl.js** - Shows how to extract user information from the cached id_token.

**index.html** - Contains a reference to the adal.js CDN.
   
## Copyright
Copyright (c) 2015 Microsoft. All rights reserved.



This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
