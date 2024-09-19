
# S3 to Google Drive File Transfer

This project is a Node.js application built with Express and TypeScript to copy files from an AWS S3 bucket to Google Drive.

## Features

- Transfer files from an AWS S3 bucket to Google Drive.

- TypeScript for robust type-checking and development.

- Express for building the server-side logic.

- OAuth2 for Google Drive API integration.

  

## Prerequisites
Before running this project, ensure you have the following:

-  **Node.js** (v14.x or higher)
-  **AWS S3 Bucket** with appropriate access credentials.
-  **Google Cloud Project** with Drive API enabled.
-  **AWS CLI** and **Google Cloud SDK** (optional for setup and testing).

## Setup
1.  **Clone the repository:**
	```
	git clone https://github.com/Isuranga-2001/s3-to-gdrive.git
	cd s3-to-google-drive
	```
	
2.  **Install dependencies:**
	```
	npm install
	```
    
3.  **Configure AWS credentials:**
    
    Make sure your AWS credentials are set up in `~/.aws/credentials` or use environment variables.
    
4.  **Set up Google API credentials:**
    
    -   Create a project in the Google Cloud Console.
    -   Enable the Google Drive API.
    -   Create OAuth 2.0 credentials and download the `credentials.json` file.
    -   Place the `credentials.json` in the root of your project.
    
5.  **Create an `.env` file:**
    
    Create a `.env` file in the root directory with the following variables:
	```
	AWS_ACCESS_KEY_ID=your_aws_access_key_id
	AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
	AWS_REGION=your_aws_region
	PORT=3000
	S3_BUCKET_NAME=your_s3_bucket_name
	``` 
    
7.  **Run the project:**
	```
	npm run dev
	```

## Usage

-   **Upload files to S3:**
    
    Upload files to your S3 bucket via the AWS console, CLI, or any S3-compatible tools.
    
-   **Transfer files to Google Drive:**
    
    The application will handle the transfer of files from your S3 bucket to the specified Google Drive folder.
    

## Scripts

-   `npm run dev` - Runs the application in development mode using `ts-node`.
