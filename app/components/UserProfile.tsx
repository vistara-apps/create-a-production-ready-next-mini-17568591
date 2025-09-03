'use client';

import { useState } from 'react';
import { UserProfile as UserProfileType } from '../types';
import { formatAddress, formatDate } from '../utils';

interface UserProfileProps {
  profile?: UserProfileType;
  isLoading?: boolean;
  error?: string;
  onUpdateProfile?: (updates: Partial<UserProfileType>) => Promise<void>;
}

export default function UserProfile({
  profile,
  isLoading = false,
  error,
  onUpdateProfile,
}: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [profileImageUrl, setProfileImageUrl] = useState(profile?.profileImageUrl || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateProfile) return;
    
    setIsSubmitting(true);
    try {
      await onUpdateProfile({
        displayName,
        profileImageUrl,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-4">
        <div className="animate-pulse bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gray-700 h-16 w-16"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-4">
        <div className="bg-red-900/20 border border-red-500 text-red-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Error Loading Profile</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="w-full max-w-md mx-auto p-4">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">No Profile Found</h3>
          <p className="text-gray-400">Connect your wallet to view your profile.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-gray-800 p-6 rounded-lg">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your display name"
              />
            </div>
            
            <div>
              <label htmlFor="profileImageUrl" className="block text-sm font-medium text-gray-300 mb-1">
                Profile Image URL
              </label>
              <input
                type="text"
                id="profileImageUrl"
                value={profileImageUrl}
                onChange={(e) => setProfileImageUrl(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter image URL"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setDisplayName(profile.displayName || '');
                  setProfileImageUrl(profile.profileImageUrl || '');
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              {profile.profileImageUrl ? (
                <img
                  src={profile.profileImageUrl}
                  alt={profile.displayName || 'User'}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                  {(profile.displayName || profile.address.substring(0, 2)).charAt(0).toUpperCase()}
                </div>
              )}
              
              <div>
                <h2 className="text-xl font-bold">
                  {profile.displayName || formatAddress(profile.address)}
                </h2>
                {profile.ensName && (
                  <p className="text-blue-400">{profile.ensName}</p>
                )}
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Address</span>
                <span className="font-mono">{formatAddress(profile.address)}</span>
              </div>
              
              {profile.farcasterId && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Farcaster ID</span>
                  <span>{profile.farcasterId}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-400">First Connected</span>
                <span>{formatDate(profile.firstConnectedAt)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Last Active</span>
                <span>{formatDate(profile.lastActiveAt)}</span>
              </div>
            </div>
            
            {onUpdateProfile && (
              <div className="mt-6 pt-4 border-t border-gray-700">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
