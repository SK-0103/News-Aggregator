# News Aggregator

A news aggregation platform that allows users to compare news from different sources and perspectives.

## Setup MongoDB Atlas

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)

2. Create a new cluster:
   - Click "Build a Database"
   - Select "Shared" for development
   - Choose your preferred cloud provider and region
   - Click "Create"

3. Set up database access:
   - Click "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter your desired username and password
   - Click "Add User"

4. Set up network access:
   - Click "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. Get the connection string:
   - Click "Connect"
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your database credentials

6. Update the `.env` file:
   - Replace the MONGO_URI with your MongoDB Atlas connection string
   - Make sure to replace `<username>` and `<password>` with your actual credentials

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/news-aggregator?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=30d
NEWS_API_KEY=your_news_api_key
```

## Running the Application

1. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

2. Start the backend server:
```bash
cd backend
npm start
```

3. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`
