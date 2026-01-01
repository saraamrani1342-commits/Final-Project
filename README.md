# MakeUp Store API - Final Project

שרת API מלא לניהול חנות איפור, בנוי עם Node.js, Express, ו-MongoDB.

## 📋 תוכן עניינים

- [התקנה](#התקנה)
- [הגדרה](#הגדרה)
- [הרצה](#הרצה)
- [API Endpoints](#api-endpoints)
- [מבנה הפרויקט](#מבנה-הפרויקט)
- [Authentication](#authentication)

## 🚀 התקנה

1. **שכפול הפרויקט:**
```bash
git clone <repository-url>
cd Final-Project
```

2. **התקנת dependencies:**
```bash
npm install
```

3. **הגדרת משתני סביבה:**
   - העתק את `.env.example` ל-`.env`
   - עדכן את `MONGODB_URI` עם מחרוזת החיבור שלך מ-MongoDB Atlas
   - עדכן את `JWT_SECRET` עם מפתח סודי חזק

## ⚙️ הגדרה

### MongoDB Atlas

1. פתח חשבון ב-[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. צור cluster חדש
3. **חשוב:** אפשר גישה מכל מחשב (0.0.0.0/0) ב-Network Access
4. קבל את connection string והוסף אותו ל-`.env`

### משתני סביבה (.env)

```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/makeup-store
JWT_SECRET=your-super-secret-key
```

## ▶️ הרצה

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

השרת ירוץ על `http://localhost:3000`

## 📡 API Endpoints

### Users (`/api/users`)

- `POST /api/users/register` - הרשמה חדשה
- `POST /api/users/login` - התחברות (מחזיר JWT token)
- `GET /api/users` - קבלת כל המשתמשים (דורש admin)

### MakeUp Products (`/api/makeup`)

- `GET /api/makeup` - קבלת כל המוצרים
- `GET /api/makeup/:id` - קבלת מוצר לפי ID
- `POST /api/makeup` - יצירת מוצר חדש (דורש admin + authentication)
- `PUT /api/makeup/:id` - עדכון מוצר (דורש admin + authentication)
- `DELETE /api/makeup/:id` - מחיקת מוצר (דורש admin + authentication)

### Orders (`/api/orders`)

- `GET /api/orders` - קבלת הזמנות של המשתמש המחובר
- `GET /api/orders/all` - קבלת כל ההזמנות (דורש admin)
- `POST /api/orders` - יצירת הזמנה חדשה (דורש authentication)
- `PUT /api/orders/:id` - עדכון הזמנה (דורש owner או admin)
- `DELETE /api/orders/:id` - מחיקת הזמנה (דורש admin)

## 📁 מבנה הפרויקט

```
Final-Project/
├── config/
│   └── db.js              # חיבור ל-MongoDB
├── controllers/
│   ├── makeUp.js          # MakeUp CRUD operations
│   ├── order.js           # Order CRUD operations
│   └── user.js            # User authentication & management
├── models/
│   ├── makeUp.js          # MakeUp schema
│   ├── order.js           # Order schema
│   └── user.js            # User schema
├── routes/
│   ├── makeUp.js          # MakeUp routes
│   ├── order.js           # Order routes
│   └── user.js            # User routes
├── auth.js                # JWT authentication middleware
├── isAdmin.js             # Admin authorization middleware
├── isOrderOwnerOrAdmin.js # Order ownership middleware
├── index.js               # שרת ראשי
├── package.json
└── README.md
```

## 🔐 Authentication

השרת משתמש ב-JWT (JSON Web Tokens) לאימות.

### שימוש ב-Authentication:

1. **התחברות:**
```bash
POST /api/users/login
Body: {
  "email": "user@example.com",
  "password": "password123"
}
Response: {
  "user": {...},
  "token": "jwt-token-here"
}
```

2. **שימוש ב-Token:**
הוסף את ה-token ל-headers של כל בקשה:
```
Authorization: Bearer <your-jwt-token>
```

### Roles:
- **user** - משתמש רגיל
- **admin** - מנהל (גישה מלאה)

## 🧪 בדיקות Postman

### דוגמה ליצירת מוצר MakeUp:

```json
POST /api/makeup
Headers: {
  "Authorization": "Bearer <admin-token>",
  "Content-Type": "application/json"
}
Body: {
  "makeupName": "שפתון אדום",
  "brand": "MAC",
  "category": "שפתון",
  "description": "שפתון איכותי",
  "imageUrl": "https://example.com/image.jpg",
  "price": 120,
  "inStock": true
}
```

## 📝 הערות

- כל ה-routes של Orders דורשים authentication
- Routes של MakeUp שדורשים admin דורשים גם authentication
- ה-JWT token תקף ל-7 ימים
- ה-password מוצפן עם bcrypt לפני שמירה ב-DB

## 🚢 Deployment

להעלאה ל-Render או שירותי cloud אחרים:

1. העלה את הקוד ל-GitHub
2. חבר את ה-repository ל-Render
3. הגדר את משתני הסביבה ב-Render dashboard
4. השרת יעלה אוטומטית

## 👥 צוות

פרויקט זה נבנה בשיתוף פעולה של שני מפתחים.

---

**בהצלחה! 🎉**


