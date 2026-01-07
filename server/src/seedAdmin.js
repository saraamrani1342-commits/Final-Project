import { connect } from "mongoose";
import { userModel } from "./models/user.js";
import bcrypt from "bcrypt";
import 'dotenv/config';

const dbUrl = process.env.MONGODB_URI || process.env.DB_URI;

// Create admin user
const createAdminUser = async () => {
    try {
        // Connect to database
        await connect(dbUrl);
        console.log("Connected to MongoDB successfully");

        // Admin user details - CHANGE THESE TO YOUR DETAILS
        const adminData = {
            userName: "sara",
            email: "sara@example.com",
            password: "123456", // CHANGE THIS TO YOUR PASSWORD
            role: "admin"
        };

        // Check if admin already exists
        const existingAdmin = await userModel.findOne({ 
            $or: [
                { email: adminData.email },
                { userName: adminData.userName }
            ] 
        });

        if (existingAdmin) {
            console.log("Admin user already exists!");
            console.log("Admin details:", {
                _id: existingAdmin._id,
                userName: existingAdmin.userName,
                email: existingAdmin.email,
                role: existingAdmin.role
            });
            process.exit(0);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        // Create admin user
        const adminUser = new userModel({
            userName: adminData.userName,
            email: adminData.email,
            password: hashedPassword,
            role: adminData.role
        });

        await adminUser.save();

        console.log("Admin user created successfully!");
        console.log("Admin details:", {
            _id: adminUser._id,
            userName: adminUser.userName,
            email: adminUser.email,
            role: adminUser.role,
            createdAt: adminUser.createdAt,
            updatedAt: adminUser.updatedAt
        });

        process.exit(0);
    } catch (err) {
        console.error("Error creating admin user:", err);
        process.exit(1);
    }
};

createAdminUser();

