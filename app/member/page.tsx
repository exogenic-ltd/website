import React from 'react';
import MemberProfile from './components/MemberProfile';

export default function MemberPage({ searchParams }: any){
  const memberName = searchParams.name || 'default';
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <MemberProfile
        profileName={memberName}
      />
    </div>
  );
};