import orderSchema from '../models/order.js';

// Check if user is order owner or admin
const isOrderOwnerOrAdmin = async (req, res, next) => {
    const orderId = req.params.id;
    if (!req.user) {
        return res.status(401).json({ message: 'נדרשת התחברות לביצוע פעולה זו.' });
    }

    try {
        const order = await orderSchema.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'ההזמנה לא נמצאה.' });
        }
        
        const isAdminUser = req.user.role === 'ADMIN' || req.user.role === 'admin';
        const isOwner = req.user.id.toString() === order.userId.toString(); 
        if (isAdminUser || isOwner) {
            next();
        } else {
            return res.status(403).json({ message: 'אין לך הרשאה למחוק הזמנה זו.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'שגיאה בבדיקת הרשאת ההזמנה.' });
    }
};

export default isOrderOwnerOrAdmin;

