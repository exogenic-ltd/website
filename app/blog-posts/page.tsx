import React from 'react';
import BlogPost from './components/BlogPost';

export default async function MemberPage({ searchParams }: any) {
  const { slug } = await searchParams;
  const blogPost = slug ?? 'default';
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <BlogPost
          slug={blogPost}
      />
    </div>
  );
};