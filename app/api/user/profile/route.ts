import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, UserProfile } from '../../../types';

/**
 * GET handler for user profile
 * @param request - The incoming request
 * @returns NextResponse with user profile data
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // In a real implementation, you would:
    // 1. Verify the JWT token from the Authorization header
    // 2. Get the user's address from the token
    // 3. Fetch the user's profile from your database
    
    // For demo purposes, we'll return mock data
    const mockProfile: UserProfile = {
      address: '0x1234567890123456789012345678901234567890',
      displayName: 'Demo User',
      ensName: 'demouser.eth',
      profileImageUrl: 'https://example.com/profile.png',
      farcasterId: '12345',
      firstConnectedAt: Date.now() - 86400000, // 1 day ago
      lastActiveAt: Date.now(),
    };
    
    const response: ApiResponse<UserProfile> = {
      success: true,
      data: mockProfile,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch user profile',
      errorCode: 1005,
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * PUT handler for updating user profile
 * @param request - The incoming request
 * @returns NextResponse with updated user profile data
 */
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    // In a real implementation, you would:
    // 1. Verify the JWT token from the Authorization header
    // 2. Get the user's address from the token
    // 3. Parse the request body
    // 4. Validate the input
    // 5. Update the user's profile in your database
    
    // Parse the request body
    const body = await request.json();
    
    // For demo purposes, we'll return mock data with the updates
    const mockProfile: UserProfile = {
      address: '0x1234567890123456789012345678901234567890',
      displayName: body.displayName || 'Demo User',
      ensName: 'demouser.eth',
      profileImageUrl: body.profileImageUrl || 'https://example.com/profile.png',
      farcasterId: '12345',
      firstConnectedAt: Date.now() - 86400000, // 1 day ago
      lastActiveAt: Date.now(),
    };
    
    const response: ApiResponse<UserProfile> = {
      success: true,
      data: mockProfile,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating user profile:', error);
    
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Failed to update user profile',
      errorCode: 1005,
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
