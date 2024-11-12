<!-- Project Info -->
<br>

![GitHub repo size](https://img.shields.io/github/repo-size/GlenDorner221358/idkwhattomaketoeat-ly)
![GitHub watchers](https://img.shields.io/github/watchers/GlenDorner221358/idkwhattomaketoeat-ly)
![GitHub language count](https://img.shields.io/github/languages/count/GlenDorner221358/idkwhattomaketoeat-ly)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/GlenDorner221358/idkwhattomaketoeat-ly)

<!-- Logo and link to repository -->
<p align="center">
  <a href="https://github.com/GlenDorner221358/idkwhattomaketoeat-ly">
    <img src="./assets/Logo.png" width="100px">
  </a>
</p>

<!-- Short Description -->
<h3 align="center">IdkWhatToMakeToEat-Ly</h3>
<p align="center"> For when you dont know what to make to eat...ly
    <br>
    <!-- Bug Links -->
    <a href="https://github.com/GlenDorner221358/idkwhattomaketoeat-ly/issues">Report Bug</a>
    <br>
</p>

<!-- Name and Number In Alphabetical Order -->
<div>
    <h5 align="center" style="padding:0;margin:0;">Glen Dorner</h5>
    <h5 align="center" style="padding:0;margin:0;">Student Number: 221358</h5>
    <br>
</div>
<!-- Subject and Term -->
<h6 align="center">DV300 | Term 4</h6>

<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About the Project](#about-the-project)
  - [Mockup](#mockup)
  - [Project Description](#project-description)
  - [Technologies Used](#technologies-used)
  - [Built With](#built-with)
    - [Electron](#typescript)
    - [C#](#angular-ts)
    - [PostgreSQL](#postgresql)
    - [React](#react)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features and Functionality](#features-and-functionality)
- [Development Process](#development-process)
  - [Architecture](#architecture)
  - [Design Frame](#design-frame)
  - [Theme](#theme)
  - [Development Documents](#development-documents)
    - [Highlights](#highlights)
    - [Challenges](#challenges)
  - [Peer Review Feedback](#peer-review-feedback)
  - [Future Implementation](#future-implementation)
- [Final Outcome](#final-outcome)
  - [Mockups](#mockups)
  - [Video Demonstration](#video-demonstration)
- [License](#license)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

<!-- About the Project -->
## About the Project

<!--PROJECT DESCRIPTION-->
### Project Description
IdkWhatToMakeToEat-Ly is an Ai driven react-native expo app that leverages Ai technologies such as openAi and google vision to generate delicious recipes using whatever ingredients you give it! You can talk with the chat bot directly, or you can take a picture of everything you have and add it to the chat!
### Technologies Used
* React-native
* Expo SDK50/51
* OpenAi's chatgpt3.5 turbo
* Google cloud vision
* Google Firebase

### Built With
<!-- React-native -->
#### React-native
* React Native is an open-source UI software framework developed by Meta Platforms. It is used to develop applications for Android, Android TV, iOS, macOS, tvOS, Web, Windows and UWP by enabling developers to use the React framework along with native platform capabilities.
<img src="./assets/README images/react-native.png" alt="React_native_Logo" style="width: 300px; height: auto;" />

<!-- Expo -->
#### Expo
* Expo is an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.
<img src="./assets/README images/expo.svg" alt="Expo_Logo" style="width: 300px; height: 225px;"/>

<!-- gpt3.5 turbo -->
#### gpt3.5 turbo
* The OpenAI API is powered by a diverse set of models with different capabilities and price points. GPT3.5 turbo is a fast, inexpensive model for simple tasks.
<img src="./assets/README images/chatgpt.png" alt="Chatgpt_Logo" style="width: 300px; height: auto;"/>

<!-- Google cloud vision -->
#### Google cloud vision
* Computer vision is a field of artificial intelligence (AI) that enables computers and systems to interpret and analyze visual data and derive meaningful information from digital images, videos, and other visual inputs.
<img src="./assets/README images/google vision.png" alt="GoogleVision_Logo" style="width: 300px; height: auto;"/>

<!-- Google Firebase -->
#### Google Firebase
* A set of backend cloud computing services and application development platforms provided by Google
<img src="./assets/README images/firebase.png" alt="Firebase_Logo" style="width: 300px; height: auto;"/>

<!-- GETTING STARTED -->
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
For development and testing, the latest version of React-native is required, which is available here: [React-Native](https://reactnative.dev/).
You will also have to download expo GO on your mobile device from its respective app store to run the app: [.expoGO](https://expo.dev/go).

This application utilizes api keys from 3 different services, as such you will have to create your own .env file and include 3 api keys from google firebase, openAi and google cloud vision in your own .env file. This application utilizes react-native-dotenv to import these api keys as consts from the env file, here is an example:
REACT_NATIVE_FIREBASE_API_KEY="your api key here"

You will also need to create your own firebase project with authentication and a firestore database and link it in a firebase.js file.
The structure for the db is as follows:
users -> user email as document id -> email, name, recipes collection -> recipe id -> dateCreated, name, response

### Installation
Here are a couple of ways to clone this repo:

1.  GitHub Desktop </br>
    Enter `https://github.com/GlenDorner221358/idkwhattomaketoeat-ly` into the URL field and press the `Clone` button.

2.  Clone Repository </br>
    Run the following in the command-line to clone the project:

    ```sh
    git clone https://github.com/GlenDorner221358/idkwhattomaketoeat-ly
    ```

Once installed, open the terminal and run "npm i" inside the the idkwhattomaketoeat-ly folder.

Then create a new .env file in the root directory

Create 3 consts for your firebase, openAi and Cloud vision Api keys as shown above in the prerequisites and paste the relevant API keys in their respective places:
REACT_APP_FIREBASE_API_KEY
REACT_APP_OPENAI_API_KEY
REACT_APP_GOOGLE_CLOUD_API_KEY

Then run "npx expo start" in the terminal. 

Finally scan the generated QR code using the expo Go app and the app should load.

<!-- Main Features and Functionality -->
## Features and Functionality
1. Firebase authentication
* For secure login and easy register functionality

2. Easy access to previously generated recipes
* Edit, delete, search through and view old recipes
* Featuring a pull down to refresh feature incase you save a recipe and it doesn't immediately appear

3. Chat with gpt3.5 turbo
* A fully functional chat page where you can interact with gpt3.5 turbo

4. Camera vision system
* You can take a picture of whatever you want and have gpt3.5 generate a recipe using everything it sees in the picture.

<!-- Development PROCESS -->
## Development Process
### Architecture
The application consists of several jsx files, each with their own stylesheets to make styling easier.
### Design Frame
How might I make an app that utilizes Ai that can help people eat healthier, better meals?
### Theme
The idea was to make fun of apps that end in "ly" and from there the rest of the theme and colors developed.

### Development Documents
<!-- Moodboard & Color palette -->
* Moodboard & color palette
<p align="center">
  <a href="https://za.pinterest.com/dorner0235/dv300-idontknowwhattomaketoeat-ly/">
    Moodboard
  </a>
</p>
<img src="./assets/README images/color palette.png" alt="Color_palette" style="height: 600px">

<!-- Data Planning - ERD -->
* Data Planning - User journey diagram
<img src="./assets/README images/user journey diagram.png" alt="Data_Planning_User_journey" style="height: 300px">

<!-- Wireframes -->
* Wireframes
Onboarding page
<img src="./assets/README images/onboarding screen.png" alt="Onboarding" style="width: 300px"/>
Login/Signup Page
<img src="./assets/README images/LoginSignup.png" alt="LoginSignup" style="width: 300px"/>
History page
<img src="./assets/README images/History.png" alt="History" style="width: 300px"/>
Dashboard page
<img src="./assets/README images/dashboard.png" alt="Dashboard" style="width: 300px"/>
Camera page
<img src="./assets/README images/Camera.png" alt="Camera" style="width: 300px"/>

<!-- Highlights -->
#### Highlights
* As always, working with react native is wonderful, its so easy to use and everything is organized so nicely
* Simply scanning a qr code to test an app on my phone never gets old
* Leveraging Ai tools like chatgpt made implementing features super fast and efficient
* When I got the vision ai to communicate with chat for the first time and generate a recipe

<!-- Challenges -->
#### Challenges
* In the start I wanted to use expo SDK51, but the documentation just straight up lies to you about how the navigation works, and setting it up was such a pain that I just reverted back to SDK50
* I had to find R100 to give openAi to use their API
* Getting the camera to work was a big hassle

<!-- Peer Review Feedback -->
### Peer Review Feedback
* During the final week of class we were asked to have our peers review our creations. The following are some bits of feedback that I recieved. A CSV file with all of the user feedback has been included in this repo inside of the README IMAGES folder found inside of the ASSETS folder.

1. The recipes were very legible and understandable 
* All of the peer reviewers voted 8 and above on understandability out of 10
<img src="./assets/README images/LegibilityGraph.png" alt="LegibilityGraph" style="width: 600px"/>

2. The recipes were very good, but not perfect 
* All of the peer reviewers voted 9 out of 10 on goodness
<img src="./assets/README images/GoodnessGraph.png" alt="GoodnessGraph" style="width: 600px"/>

3. All of the reviewers found the edit recipe title button very easily 
* All of them voted YES when asked if it was where they thought it would be
<img src="./assets/README images/EditButtonGraph.png" alt="EditButtonGraph" style="width: 600px"/>

4. The Ai tended to use most of /all of the ingredients captured in an image using the camera feature
* 2/3rds voted All while 1/3 voted More than half
<img src="./assets/README images/IngredientsUsedGraph.png" alt="IngredientsUsedGraph" style="width: 600px"/>

5. Everyone thought the signout process was very easy and intuitive 
* All of them voted 5/5 for ease of use
<img src="./assets/README images/SignoutProcessGraph.png" alt="SignoutProcessGraph" style="width: 600px"/>

6. I should change the camera permissions text from yellow to something darker to better contrast against the white background
* A very valid piece of advice, already implemented it as soon as it was mentioned

7. A button on the history page that says "Add new recipe" and takes you to the dashboard page
* Implemented. The peer reviewers seemed to try to create a new recipe using the search bar on the history page, I have tried to alleviate the issue by changing the placeholder text on the search bar to make it more clear that it is used to search previously made recipes

8. A peer reviewer said that it would be nice if the image from the camera page displayed on the dashboard page when it was added to chat
* I tried to implement this, but because of time constraints and because it is such a small addition, in the end this feature did not make it into the final build.

<!-- Future Implementation -->
### Future Implementation
* I want to add macros to the history screen, so you can ask the AI to analyze how many calories/proteins etc is in a certain amount of food
* I want to have the image you ask chat to make a recipe of display on the chat bubble on the dashboard page as well

<!-- Final Outcome -->
## Final Outcome
<!-- SCREENSHOTS -->
### Screenshots
<img src="./assets/README images/dashboard page SCREENSHOT.jpg" alt="Dashboard page screenshot" style="width: 400px"/>
<img src="./assets/README images/camera page SCREENSHOT.jpg" alt="Camera page screenshot" style="width: 400px"/>
<img src="./assets/README images/history page SCREENSHOT.jpg" alt="history page screenshot" style="width: 400px"/>
<img src="./assets/README images/signup page SCREENSHOT.jpg" alt="signup page screenshot" style="width: 400px"/>

<br>

<!-- Video Demonstration -->
### Video Demonstration
**Video Demonstration:** <a href="https://drive.google.com/file/d/1TLBtG2XaYjA-puCbQBikdkLbGlOh592i/view?usp=sharing">Google Drive Link</a> -->

<!-- LICENSE -->
## License
See the `LICENSE` file for more information.

<!-- AUTHORS -->
## Authors
* **Glen Dorner** - [Github](https://github.com/GlenDorner221358)

* **Project Link** - https://github.com/GlenDorner221358/idkwhattomaketoeat-ly

<!-- ACKNOWLEDGEMENTS -->
<!-- all resources that you used and Acknowledgements here -->
## Acknowledgements
* [Lecturer](https://github.com/ArmandPretorius)
* [Figma](https://www.figma.com/)
* [W3Schools](https://www.w3schools.com)