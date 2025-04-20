@echo off
echo Updating GitHub repository...

echo Adding all files...
git add .

echo Committing changes...
git commit -m "Update: Fix email API and improve error handling"

echo Pushing to GitHub...
git push origin main

echo Done!
pause 