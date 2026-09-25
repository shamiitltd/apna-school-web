import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Helper to ensure at least one Admin account is initialized in MongoDB
const getOrInitializeAdmin = async () => {
  let admin = await Admin.findOne();
  if (!admin) {
    // Create initial admin with default password
    admin = new Admin({
      role: "admin",
      password: "admin123", // Pre-save hook in Admin model will bcrypt-hash this
    });
    await admin.save();
    console.log("Initial admin account created in database with default hashed password");
  }
  return admin;
};

export const adminLogin = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // Get admin document from database (or initialize if first run)
    const admin = await getOrInitializeAdmin();

    // Verify password with bcrypt
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect admin password. Please try again.",
      });
    }

    const secretKey = process.env.JWT_SECRET_KEY || process.env.JWT_SECRET || "secret";
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      secretKey,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin authentication successful",
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication",
    });
  }
};

export const verifyAdmin = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        valid: false,
        message: "Unauthorized: No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY || process.env.JWT_SECRET || "secret";
    const decoded = jwt.verify(token, secretKey);

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({
        success: false,
        valid: false,
        message: "Admin account not found",
      });
    }

    return res.status(200).json({
      success: true,
      valid: true,
      message: "Admin session is active",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      valid: false,
      message: "Invalid or expired token",
    });
  }
};

export const updateAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found",
      });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Set new password (pre-save hook will automatically hash it)
    admin.password = newPassword;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Admin password updated and hashed securely in database",
    });
  } catch (error) {
    console.error("Update password error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating admin password",
    });
  }
};
