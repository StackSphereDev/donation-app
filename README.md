# Divine Annadaan Seva - Donation Web Application

A full-stack donation web application built with React, TypeScript, Node.js, Express, and MongoDB. This application allows users to make donations for the Divine Annadaan Seva campaign supporting pilgrims on the Char Dham Yatra.

## 🚀 Features

- **Modern Landing Page** - Beautiful, responsive UI with preset donation amounts
- **Donor Form** - Comprehensive form with validation using React Hook Form and Zod
- **Dummy Payment Gateway** - Simulated payment processing with success/failure handling
- **Success Page** - Detailed confirmation with transaction details
- **MongoDB Integration** - Persistent storage of donation data
- **TypeScript** - Full type safety across frontend and backend
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Toast Notifications** - User-friendly feedback for all actions
- **Error Handling** - Comprehensive error handling and validation

## 📁 Project Structure

```
CharanVandan/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   └── donationController.ts
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   └── validateRequest.ts
│   │   ├── models/
│   │   │   └── Donation.ts
│   │   ├── routes/
│   │   │   └── donationRoutes.ts
│   │   ├── utils/
│   │   │   ├── apiResponse.ts
│   │   │   └── generateTransactionId.ts
│   │   ├── validators/
│   │   │   └── donationValidator.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Button.tsx
    │   │   ├── DonationCard.tsx
    │   │   ├── Input.tsx
    │   │   ├── Loader.tsx
    │   │   └── Textarea.tsx
    │   ├── lib/
    │   │   └── axios.ts
    │   ├── pages/
    │   │   ├── DonorForm.tsx
    │   │   ├── LandingPage.tsx
    │   │   ├── PaymentPage.tsx
    │   │   └── SuccessPage.tsx
    │   ├── services/
    │   │   └── donationService.ts
    │   ├── types/
    │   │   └── donation.ts
    │   ├── utils/
    │   │   └── validation.ts
    │   ├── App.tsx
    │   ├── index.css
    │   └── main.tsx
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── .env.example
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Express Validator** - Request validation
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Dotenv** - Environment variables

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn package manager

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CharanVandan
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/donation-app
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📡 API Endpoints

### Donations

- **POST** `/api/donations/create` - Create a new donation
  - Body: `{ fullName, email, phone, amount, message? }`
  - Returns: `{ donationId, transactionId, amount, fullName }`

- **GET** `/api/donations/:id` - Get donation by ID
  - Returns: Complete donation details

- **PATCH** `/api/donations/:id/payment-status` - Update payment status
  - Body: `{ paymentStatus: 'pending' | 'success' | 'failed' }`
  - Returns: Updated donation details

- **GET** `/api/donations` - Get all donations (with pagination)
  - Query params: `page`, `limit`
  - Returns: Paginated donation list

- **GET** `/health` - Health check endpoint

## 🎯 Application Flow

1. **Landing Page** (`/`)
   - Display campaign information
   - Show preset donation amounts (₹501, ₹1100, ₹2100, ₹5100)
   - Allow custom amount input
   - Navigate to donor form with selected amount

2. **Donor Form** (`/donate`)
   - Collect donor information (name, email, phone)
   - Validate all inputs using Zod schema
   - Submit donation data to backend
   - Navigate to payment page

3. **Payment Page** (`/payment/:donationId`)
   - Display payment summary
   - Simulate payment processing (3 seconds)
   - Random success/failure (90% success rate)
   - Update payment status in database
   - Navigate to success page on completion

4. **Success Page** (`/success/:donationId`)
   - Display thank you message
   - Show complete donation details
   - Display transaction ID
   - Options to print receipt or return home

## 🗄️ Database Schema

### Donation Model

```typescript
{
  fullName: String (required, 2-100 chars)
  email: String (required, valid email)
  phone: String (required, 10-digit Indian number)
  amount: Number (required, min: 100)
  message: String (optional, max: 500 chars)
  transactionId: String (required, unique)
  paymentStatus: 'pending' | 'success' | 'failed'
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## 🎨 UI Components

### Reusable Components

- **Button** - Customizable button with variants and loading states
- **Input** - Form input with label and error display
- **Textarea** - Multi-line text input with validation
- **DonationCard** - Preset amount selection card
- **Loader** - Loading spinner component

## 🔒 Validation

### Frontend Validation (Zod)

- Full name: 2-100 characters
- Email: Valid email format
- Phone: 10-digit Indian mobile number (starts with 6-9)
- Amount: Minimum ₹100
- Message: Optional, max 500 characters

### Backend Validation (Express Validator)

- Same validation rules as frontend
- Additional server-side checks
- Sanitization of inputs

## 🏗️ Build for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## 🚢 Deployment

### Backend Deployment

1. Set up MongoDB Atlas or use a cloud MongoDB instance
2. Update `MONGODB_URI` in production environment
3. Deploy to platforms like:
   - Heroku
   - Railway
   - Render
   - AWS EC2
   - DigitalOcean

### Frontend Deployment

1. Build the production bundle: `npm run build`
2. Deploy to platforms like:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

### Environment Variables

**Backend Production:**
```env
PORT=5000
MONGODB_URI=<your-mongodb-atlas-uri>
NODE_ENV=production
FRONTEND_URL=<your-frontend-url>
```

**Frontend Production:**
```env
VITE_API_URL=<your-backend-api-url>
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Landing page loads correctly
- [ ] Preset amounts are selectable
- [ ] Custom amount input works
- [ ] Form validation works for all fields
- [ ] Invalid inputs show error messages
- [ ] Donation submission creates database entry
- [ ] Payment simulation works
- [ ] Success page displays correct information
- [ ] Navigation between pages works
- [ ] Toast notifications appear
- [ ] Responsive design on mobile devices

## 🐛 Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
mongosh

# Restart MongoDB service
sudo systemctl restart mongod
```

### Port Already in Use

```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 5173
npx kill-port 5173
```

### CORS Issues

Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL.

## 📝 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Developer

Built for CharanVandan Full Stack Developer Assessment

## 🙏 Acknowledgments

- CharanVandan for the opportunity
- Reference: [Divine Annadaan Seva Campaign](https://charanvandan.com/campaign/divine-annadaan-seva-nourishing-the-soul-of-the-char-dham-yatra/)

---

**Note:** This is a demonstration project with a dummy payment gateway. For production use, integrate a real payment gateway like Razorpay, Stripe, or PayPal.
