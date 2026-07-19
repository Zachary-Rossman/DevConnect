import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// Export Secret
export default JWT_SECRET;

// Sign Token: Creates a JWT for a user after login or registration
export function signToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
}


// Verify Token: Validates a JWT sent from the client
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (err) {
    // Token is invalid, expired, or tampered with
    return null;
  }
}