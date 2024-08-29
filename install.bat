@echo off
REM Initialize a new Node.js project (creates a package.json file)
echo Initializing Node.js project...
npm init -y

REM Install required npm packages
echo Installing dependencies...
npm install discord.js-selfbot-v13
npm install prompt-sync

echo Installation complete.
pause
