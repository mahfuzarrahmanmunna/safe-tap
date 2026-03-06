# SafeTap Backend Setup Script for Windows

## Step 1: Install Python Dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Green
pip install -r requirements.txt

## Step 2: Create .env file
Write-Host "`nSetting up environment configuration..." -ForegroundColor Green
if (Test-Path ".\.env") {
    Write-Host ".env file already exists. Skipping..." -ForegroundColor Yellow
} else {
    Copy-Item ".\.env.example" ".\.env"
    Write-Host ".env file created. Please edit it with your credentials." -ForegroundColor Yellow
}

## Step 3: Run Database Migrations
Write-Host "`nRunning database migrations..." -ForegroundColor Green
python manage.py makemigrations
python manage.py migrate

## Step 4: Create Admin User
Write-Host "`nCreating superuser..." -ForegroundColor Green
Write-Host "You will be prompted to enter admin credentials." -ForegroundColor Yellow
python manage.py createsuperuser

## Step 5: Collect Static Files (Optional)
Write-Host "`nCollecting static files..." -ForegroundColor Green
python manage.py collectstatic --noinput

## Step 6: Done!
Write-Host "`n" -ForegroundColor Green
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║           SafeTap Backend Setup Complete!                     ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green

Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env file with your database and Twilio credentials" -ForegroundColor White
Write-Host "2. Run: python manage.py runserver" -ForegroundColor White
Write-Host "3. Open: http://127.0.0.1:8000/admin/" -ForegroundColor White
Write-Host "4. Test API: http://127.0.0.1:8000/api/divisions/" -ForegroundColor White

Write-Host "`nUseful Commands:" -ForegroundColor Cyan
Write-Host "- Start server: python manage.py runserver" -ForegroundColor White
Write-Host "- Django shell: python manage.py shell" -ForegroundColor White
Write-Host "- Check migrations: python manage.py showmigrations" -ForegroundColor White
