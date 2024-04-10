import { sendError } from 'h3';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);


  const authEmail = useRuntimeConfig().email;
  const authPassword = useRuntimeConfig().password;

  // Validate credentials (this example uses hard-coded values, replace with your env variables)
  const isValid = email === authEmail && password === authPassword

  if (isValid) {
    const token = generateSessionToken();
    return {
      token,
      message: 'Login successful',
    };
  } else {
    // Invalid credentials
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    }));
  }
});

function generateSessionToken() {
  // Generate a random session token
  // You can use a library like 'jsonwebtoken' for more secure token generation
  return Math.random().toString(36).substring(7);
}