import React from 'react';
import MemberProfile from './MemberProfile';

export default function MemberPage({ searchParams }: any){
  const memberName = searchParams.name || 'default';
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 flex flex-col items-center justify-center p-8 font-sans">
      {/* Pass the extracted parameters as props to the ClientComponent */}
      <MemberProfile
        profileName={memberName}
      />
    </div>
  );
};