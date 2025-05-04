# Express-Projects

# Navigate to the Django service directory

cd tf_service

# Create a virtual environment

python3 -m venv venv

# Activate the virtual environment

# For macOS/Linux:

source venv/bin/activate

# For Windows:

# venv\Scripts\activate

# Install dependencies

pip install django djangorestframework tensorflow pillow

# Apply migrations

python manage.py migrate

# Run the Django service

python manage.py runserver

# Navigate to the server directory

cd server

# Install dependencies

npm install

# Create a .env file with your MongoDB connection string

# Example:

# CONNECTION_URL=mongodb://localhost:27017/express-projects

# PORT=5050

# Run the Node.js server

npm run dev

# Navigate to the client directory

cd client

# Install dependencies

npm install

# Run the development server

npm run dev
