import React from 'react';
import ProjectDetails from './components/ProjectDetails';

export default async function MemberPage({ searchParams }: any) {
  const { projectName } = await searchParams;
  const project = projectName ?? 'default';
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <ProjectDetails
          projectName={project}
      />
    </div>
  );
};