import React from 'react';
import MemberProfile from './components/MemberProfile';

export default async function MemberPage({ searchParams }: any) {
  const { name } = await searchParams;
  const memberName = name ?? 'default';
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <MemberProfile
          profileName={memberName}
      />
    </div>
  );
};