const AUTH_API_URL = 'https://jedps7snwzng3dblea33o2wjay0fdynj.lambda-url.us-east-1.on.aws/';

export interface LoginRequest {
  action: 'login';
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  action: 'changePassword';
  email: string;
  currentPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Login user with email and password
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'login',
        email,
        password,
      } as LoginRequest),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Login successful',
      };
    }

    // Handle error responses
    let errorMessage = 'Invalid email or password';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // If response is not JSON, use default error message
    }

    return {
      success: false,
      error: errorMessage,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Change user password
 */
export async function changePassword(
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'changePassword',
        email,
        currentPassword,
        newPassword,
      } as ChangePasswordRequest),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Password changed successfully',
      };
    }

    // Handle error responses
    let errorMessage = 'Failed to change password';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // If response is not JSON, use default error message
    }

    return {
      success: false,
      error: errorMessage,
    };
  } catch (error) {
    console.error('Change password error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}
