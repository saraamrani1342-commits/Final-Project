# הוראות העלאה ל-GitHub

## שלב 1: התקנת Node.js (אם עדיין לא התקנת)
1. הורידי Node.js מ-https://nodejs.org/
2. התקיני את הגרסה LTS (המומלצת)
3. פתחי Terminal/PowerShell ובדקי שההתקנה הצליחה:
   ```bash
   node --version
   npm --version
   ```

## שלב 2: התקנת הספריות (יצירת node_modules)
פתחי Terminal/PowerShell בתיקיית הפרויקט והרצי:
```bash
npm install
```

זה ייצור את התיקייה `node_modules` אוטומטית עם כל הספריות.

## שלב 3: יצירת קובץ .env
צרי קובץ `.env` בתיקיית הפרויקט:
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/makeup-store
JWT_SECRET=your-secret-key
```

**חשוב:** הקובץ `.env` לא יעלה ל-GitHub (זה מוגדר ב-.gitignore)

## שלב 4: העלאה ל-GitHub

### א. יצירת Repository ב-GitHub
1. היכנסי ל-GitHub.com
2. לחצי על "+" למעלה → "New repository"
3. תני שם ל-repository (למשל: "Final-Project")
4. אל תסמני "Initialize with README"
5. לחצי "Create repository"

### ב. העלאת הקוד
פתחי Terminal/PowerShell בתיקיית הפרויקט והרצי:

```bash
# אתחול Git (אם עדיין לא עשית)
git init

# הוספת כל הקבצים (חוץ מ-node_modules ו-.env - זה אוטומטי)
git add .

# יצירת commit ראשון
git commit -m "Initial commit - MakeUp Store API"

# הוספת ה-remote (החלפי <your-repo-url> ב-URL של ה-repository שיצרת)
git remote add origin https://github.com/YOUR-USERNAME/Final-Project.git

# העלאה ל-GitHub
git branch -M main
git push -u origin main
```

## מה יעלה ל-GitHub?
✅ כל הקבצים שלך (controllers, models, routes, וכו')
✅ package.json
✅ .gitignore
✅ README.md
❌ node_modules (לא יעלה - גדול מדי)
❌ .env (לא יעלה - מכיל סודות)

## מה קורה כשמישהו מוריד את הפרויקט?
1. הוא מוריד את כל הקבצים
2. הוא מריץ `npm install`
3. זה יוצר את `node_modules` אצלו אוטומטית

זה למה לא מעלים `node_modules` - כל אחד יוצר אותו בעצמו!


