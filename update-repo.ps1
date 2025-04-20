Write-Host "Updating GitHub repository..." -ForegroundColor Green

Write-Host "Adding all files..." -ForegroundColor Cyan
git add .

Write-Host "Committing changes..." -ForegroundColor Cyan
git commit -m "Update: Fix email API and improve error handling"

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

Write-Host "Done!" -ForegroundColor Green
Read-Host "Press Enter to continue" 