#!/bin/bash

# SafeTap Backend Setup Script for Linux/Mac

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║        SafeTap Backend - Automated Setup Script               ║"
echo "╚════════════════════════════════════════════════════════════════╝"

# Step 1: Check if Python is installed
echo -e "\n\033[32m[1/6] Checking Python installation...\033[0m"
if ! command -v python3 &> /dev/null; then
    echo -e "\033[31mError: Python 3 is not installed. Please install Python 3.8 or higher.\033[0m"
    exit 1
fi
echo -e "\033[32mPython $(python3 --version) found!\033[0m"

# Step 2: Create virtual environment (optional)
echo -e "\n\033[32m[2/6] Setting up virtual environment...\033[0m"
if [ ! -d "venv" ]; then
    python3 -m venv venv
    source venv/bin/activate
    echo -e "\033[32mVirtual environment created and activated.\033[0m"
else
    source venv/bin/activate
    echo -e "\033[32mVirtual environment activated.\033[0m"
fi

# Step 3: Install dependencies
echo -e "\n\033[32m[3/6] Installing Python dependencies...\033[0m"
pip install -r requirements.txt

# Step 4: Setup environment file
echo -e "\n\033[32m[4/6] Setting up environment configuration...\033[0m"
if [ -f ".env" ]; then
    echo -e "\033[33m.env file already exists. Skipping...\033[0m"
else
    cp .env.example .env
    echo -e "\033[33m.env file created. Please edit it with your credentials:\033[0m"
    echo -e "\033[33mnano .env\033[0m"
fi

# Step 5: Run migrations
echo -e "\n\033[32m[5/6] Running database migrations...\033[0m"
python manage.py makemigrations
python manage.py migrate

# Step 6: Create superuser
echo -e "\n\033[32m[6/6] Creating superuser...\033[0m"
echo -e "\033[33mYou will be prompted to enter admin credentials.\033[0m"
python manage.py createsuperuser

# Done!
echo -e "\n"
echo -e "\033[32m╔════════════════════════════════════════════════════════════════╗\033[0m"
echo -e "\033[32m║           SafeTap Backend Setup Complete!                     ║\033[0m"
echo -e "\033[32m╚════════════════════════════════════════════════════════════════╝\033[0m"

echo -e "\n\033[36mNext Steps:\033[0m"
echo -e "1. Edit .env file with your database and Twilio credentials"
echo -e "2. Run: python manage.py runserver"
echo -e "3. Open: http://127.0.0.1:8000/admin/"
echo -e "4. Test API: http://127.0.0.1:8000/api/divisions/"

echo -e "\n\033[36mUseful Commands:\033[0m"
echo -e "- Start server: python manage.py runserver"
echo -e "- Django shell: python manage.py shell"
echo -e "- Check migrations: python manage.py showmigrations"
echo -e "- Activate venv: source venv/bin/activate"
