import { NextRequest, NextResponse } from 'next/server';

// Admin credentials - in production, store these securely in database with hashed passwords
const ADMIN_CREDENTIALS = {
  email: 'Kennen_02@icloud.com',
  password: 'Kenan3477!', // In production, this should be hashed
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin'
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if it's the admin login
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Generate admin JWT token (in production, use proper JWT library)
      const adminToken = `admin-jwt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const adminData = {
        id: 'admin-001',
        email: ADMIN_CREDENTIALS.email,
        firstName: ADMIN_CREDENTIALS.firstName,
        lastName: ADMIN_CREDENTIALS.lastName,
        role: 'admin',
        permissions: [
          'view_all_jobs',
          'edit_jobs',
          'delete_jobs',
          'view_users',
          'edit_users',
          'delete_users',
          'view_analytics',
          'manage_platform'
        ],
        verified: true,
        loginTime: new Date().toISOString()
      };

      console.log(`🔐 Admin login successful: ${email}`);

      return NextResponse.json({
        success: true,
        message: 'Admin authentication successful',
        token: adminToken,
        user: adminData,
        redirectTo: '/admin/dashboard'
      });
    }

    // For regular users, implement your normal authentication logic here
    // This is a placeholder for regular user authentication
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );

  } catch (error) {
    console.error('Admin authentication error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}