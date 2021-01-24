# Currency

Test app

Build react application
Create application with 2 pages.

    1. Page “/currencies”

The page will have a table which shows real time BitCoin price. 
You need to make a request to Coin Desk API service  to retrieve required data for display. 
(More information about API can be found in https://www.coindesk.com/api)

Functional requirements
• Implement sorting by currency name or it‘s rate.
• Implement auto-refresh table feature (for example: every 10 seconds) and loading indicator.
• Display information about when data has been updated.
• Handle error case when servise is not responding.


    2. Analysis tool page “/analysis”
Page to display extract specific insights about the webpage or a simple XML file.
• Use any technology or programming language of your preference, however it has to 
be opensource and you must provide detailed instructions on how to launch the code.
• You can use additional libraries for the document parsing but the statistics and 
insights should be collected by your algorithm.

Functional requirements
• The webpage URL has to be provided as a parameter.
• Find all unique tags used in the document.
• Find the most commonly used tag.
• Find the longest path in the document tree where the most popular tag is used the most times.
• All 3 insights can be presented in your preferred way.



Additional tasks:

    • Style your application using CSS, SCSS or SASS.
    • Create README.md which contains how application must be build/started.
    • Build aplication bundle using Webpack or any other build tool.
    • Configure Express or Webpack dev server to launch your application.
    • Use Typescript for typings.
    • Use Redux to store data and share between components.
    • Include some tests for your code, 100% coverage is not required, focus on some key functionalities.

NOTE: For application creation react-scripts and create-react-app are not allowed.

#Run App

Running Frontend app
1. Install https://nodejs.org/en/
2. Open terminal, launch npm install then npm start
3. Open http://localhost:3000 in your browser
4. For running test use npm test

Running BackEnd app
1. Install https://nodejs.org/en/
2. Open terminal in currency/app, launch npm install then npm start
3. Open http://localhost:8080 in your browser