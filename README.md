

    Sauce Demo Test Automation - Complete Test Suite

    What This Project Does
    Project Description:
    This project contains automated and manual test cases designed to verify the functionalities and workflows of the Sauce Demo e-commerce application.
    
    Main Objective:
    Validate the proper functioning of authentication, product catalog, shopping cart, and checkout processes, ensuring that all business rules and user flows work correctly from login to order completion.

 Technologies Used
 
	•	Playwright - Modern web testing framework
	•	TypeScript - Type-safe JavaScript
	•	Node.js - JavaScript runtime environment
	•	ParaBank - Demo banking application for testing

 Before You Start

Make sure you have the following installed:

	•	Visual Studio Code
	•	Node.js (v18.17.0 or higher, any v20.x.x, or v21.x.x or later)
	•	Git

Step 1: Verify Node.js

	1-Open the terminal:
	2-Windows: Press Windows + R, type cmd, press Enter
	3-macOS: Press Cmd + Space, type Terminal, press Enter
	4-Check Node.js version:

node --version

   •	You’re ready if it shows: v18.17.0 or higher, v20.x.x, or v21.x.x+
   
	   1.	If Node.js is not installed:
	   2.	Go to https://nodejs.org
	   3.	Click the green LTS button
	   4.	Run the installer
	   5.	Verify installation:

node --version

Step 2: Verify Git
		1.	Check if Git is installed:
	
	   git --version
	   
   •	You’re ready if it shows git version 2.x.x or higher
   
	   2.	If Git is not installed (Windows):
	   1.	Go to https://git-scm.com/download/win
	   2.	Download the 64-bit installer
	   3.	Run the installer (use default options)
	   4.	Verify installation:

git --version

Step 3: Verify Visual Studio Code

	1.	Check if VS Code is installed:
	•	Windows: Search for “Visual Studio Code” in the Start menu
	•	macOS: Search in Spotlight (Cmd + Space)
	•	Linux: Search in the applications menu
	2.	If not installed:
	1.	Go to https://code.visualstudio.com/
	2.	Download the installer for your OS
	3.	Run the installer
	4.	Open VS Code to verify

Step 4: Get the Project

Method 1: Download ZIP

	1.	Go to https://github.com/starling26/qa-challenge-automation
	2.	Click the green Code button → Download ZIP
	3.	Extract the ZIP to your Desktop
	4.	Open terminal and navigate to the project folder

   Method 2: Use Git
   
	git clone https://github.com/starling26/qa-challenge-automation.git
	cd qa-challenge-automation
	
	Optional: Open project in VS Code from terminal:
	-cd qa-challenge-automation
	-code .

Step 5: Install Project Dependencies

	   npm install
	   
	   (This may take 2–5 minutes)

Step 6: Install Playwright

	   npx playwright install
	   
	   If installation fails
	   
	   •	Force installation:
	      
	   npx playwright install --force
	      
	   •	Or install only Chromium:
	      
	   npx playwright install chromium
	      
	   •	On Mac/Linux with permission issues:
	      
	   sudo npx playwright install


Step 7: Run the Tests

	   1.	Run all tests:
	   
	   npx playwright test
	   
	   2.	Run specific tests:
	   
	   npx playwright test filename.spec.ts
	   
	   3.	View interactive HTML report:
	   
	   npx playwright show-report
# sauce_demo
# sauce_demo
# sauce_demo
