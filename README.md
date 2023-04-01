<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">ITSA G1 T3 Project B AY2022/23 Semester 2</h3>

  <p align="center">
    Frontend
    <br />
    <br />
    <a href="https://www.itsag1t3.com/">View Demo</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-frontend">About the Frontend</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#run-test-and-build-app">Run, Test and Build App</a></li>
        <li><a href="#deploy-app-to-amazon-s3">Deploy App to Amazon S3</a></li>
      </ul>
    </li>
    <li>
      <a href="#screenshots-of-the-app">Screenshots of the app</a>
    </li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About the Frontend
Reward programs are becoming a popular marketing tool for banks and credit card issuers to attract and retain customers. Our application provides customers with an efficient and user-friendly platform for managing their rewards. A large number of spend transactions can be processed daily in real-time and the application is able to accept these transactions via a file upload or API request to the tenant. Campaign management is available for tenants, where they can run customisable campaigns for specific card programs that encourage user spending, while at the same time reward customers. From a customer perspective, this enhances the perceived value of these card programs offered by the tenant, helping our affiliated banks to preserve brand loyalty and expand their market share.

The frontend provides a user-interface for users to view and interact with the application. 


### Built With

* [![React][React.com]][React-url]
* [![MUI][MUI.com]][MUI-url]
* [![AWS][AWS.com]][AWS-url]


<!-- GETTING STARTED -->
## Getting Started
### Prerequisites
1. [Node.js] installed
2. Create 2 AWS S3 buckets, one for the main app and one for failover. Ensure the failover bucket is in <b>us-east-1</b> region and the the main app bucket is in another region of your choice. 
3. Create a user pool in AWS Cognito
4. Retrieve _**User Pool ID**_ and _**Cognito Domain**_ from your user pool
5. Create an App Client in your user pool
6. Retrieve _**Client ID**_ and _**Client Secret**_ (if any) from your App Client
5. Retrieve _**Access Key ID**_ and _**Secret Access Key**_ from your IAM user
6. Retrieve _**API Invoke URL**_ and _**API Domain**_ from your API Gateway


### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/cs301-itsa/project-2022-23t2-g1-t3-fe-web-ui.git
   ```
2. Install project dependencies
    ```sh
    npm install
    ```

### Run, Test and Build App
1. Create an environment file and add your environment variables

    Replace variables in curly braces with your own credentials
   ```txt
    REACT_APP_USER_POOL_ID = {User Pool ID}
    REACT_APP_CLIENT_ID = {Client ID}
    REACT_APP_CLIENT_SECRET = {Client Secret}
    REACT_APP_REGION = {Cognito Region}
    REACT_APP_COGNITO_DOMAIN = {Cognito Domain}

    REACT_APP_ACCESS_KEY_ID = {AWS Access Key ID}
    REACT_APP_SECRET_ACCESS_KEY = {AWS Secret Access Key}

    REACT_APP_BASE_URL = {API Invoke URL}
    REACT_APP_API_DOMAIN = {API Domain}
   ```
2. Run the app
    ```sh
    npm run start
    ```
3. Test the app
    ```sh
    npm run test
    ```
4. Build the app
    ```sh
    npm run build
    ```

### Deploy app to Amazon S3
1. Add the following variables in your GitHub Secrets

    Replace variables in curly braces with your own credentials
   ```txt
    REACT_APP_USER_POOL_ID = {User Pool ID}
    REACT_APP_CLIENT_ID = {Client ID}
    REACT_APP_CLIENT_SECRET = {Client Secret}
    REACT_APP_COGNITO_DOMAIN = {Cognito Domain}

    REACT_APP_BASE_URL = {API Invoke URL}
    REACT_APP_API_DOMAIN = {API Domain}

    AWS_ACCESS_KEY_ID = {AWS Access Key ID}
    AWS_SECRET_ACCESS_KEY = {AWS Secret Access Key}
    AWS_REGION = {AWS Region for your main app}
    AWS_REGION_FAILOVER = {AWS Region for failover}
    AWS_S3_MAIN_APP = {S3 Bucket Name for your main app}
    AWS_S3_FAILOVER = {S3 Bucket Name for failover}
   ```
2. Push your repository into GitHub to trigger the CI/CD and deploy the app to Amazon S3

<!-- SCREENSHOT OF THE APP -->
## Screenshot of the App
1. Login Page
2. Tenant: Data files Page
3. Tenant: Upload file Page
4. Tenant: Campaigns Page
5. Tenant: Add Campaign Page
6. Customer: Rewards Page
7. Error Page (for failover)


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

### Team Members
* Gan Shao Hong
* Hafil Noer Zachiary
* Khaw Shao Hao Dino
* Stanford Darwin Chandra
* Tan Gi Han
* Tan Jia Xuan Sean
* Zhang Zhiyao


### Project Advisor/Mentor
* [Professor Ouh Eng Lieh](https://www.linkedin.com/in/eng-lieh-ouh/?originalSubdomain=sg)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[AWS-url]: https://aws.amazon.com/s3/
[AWS.com]: https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white
[MUI-url]: https://mui.com/
[MUI.com]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[Node.js]: https://nodejs.org/en
[React-url]: https://legacy.reactjs.org/
[React.com]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB