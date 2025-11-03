# Bill Buddy - Personal Finance Tracker

A comprehensive MERN stack application for tracking personal financial transactions with friends and contacts.

## Features

- **User Authentication**: Secure signup/signin with unique user IDs
- **Contact Management**: Add, view, and delete contacts with mobile numbers
- **Transaction Tracking**: Record money given/received with detailed descriptions
- **Real-time Balance**: Dynamic balance calculation with color-coded display
- **Responsive Design**: Mobile-first design with Tailwind CSS and Material-UI
- **Visit Counter**: Real-time website visit tracking

## Tech Stack

- **Frontend**: React.js, Material-UI, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Deployment**: Frontend (Netlify), Backend (Render)

## Project Structure

```
bill-buddy/
├── front-end/          # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   └── utils/      # API utilities
│   └── public/         # Static assets
└── back-end/           # Express backend application
    ├── models/         # MongoDB models
    ├── routes/         # API routes
    └── server.js       # Main server file
```

## Installation & Setup

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd back-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd front-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy with build command: `npm install`
4. Start command: `npm start`

### Frontend (Netlify)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Update API base URL in `src/utils/api.js`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Contacts
- `GET /api/contacts/:userId` - Get user contacts
- `POST /api/contacts` - Create new contact
- `DELETE /api/contacts/:contactId` - Delete contact

### Transactions
- `GET /api/transactions/:contactId` - Get contact transactions
- `POST /api/transactions` - Create new transaction
- `DELETE /api/transactions/:transactionId` - Delete transaction

## Usage

1. **Sign Up**: Create account with unique user ID
2. **Add Contacts**: Add friends/contacts you exchange money with
3. **Record Transactions**: Track money given/received with descriptions
4. **View Balance**: Monitor real-time balance with each contact
5. **Manage Data**: Delete transactions or contacts (only with zero balance)

## Developer

**Abbireddy V.V.S.S.Prasad**
- GitHub: [AbbireddyPrasad-BRS](https://github.com/AbbireddyPrasad-BRS)
- Portfolio: [abbireddy-portfolio.netlify.app](https://abbireddy-portfolio.netlify.app)
- Email: abbireddysaiprasad@gmail.com

## License

This project is open source and available under the MIT License.