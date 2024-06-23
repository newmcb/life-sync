'use client'

import React, {useState} from 'react';
import {FaAngleRight} from "react-icons/fa";


interface Post {
  id: number;
  name: string;
  type:string;
  accessLevel: string;
  date: string;
}


const initialPosts: Post[] = [
  {
    id: 1,
    name: "study",
    type:'folder',
    accessLevel: "public",
    date: "2023-05-01",
  },
  {
    id: 2,
    name: "Tips for Using This Board",
    type:'text',
    accessLevel: "public",
    date: "2023-05-02",
  },
  {
    id: 3,
    name: "Stay Connected",
    type:'text',
    accessLevel: "public",
    date: "2023-05-03",
  },
  {
    id: 4,
    name: "Feature Requests",
    type:'text',
    accessLevel: "private",
    date: "2023-05-04",
  },
  {
    id: 5,
    name: "Bug Reports",
    type:'text',
    accessLevel: "public",
    date: "2023-05-05",
  },
];

const MemoList = () => {

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [name, setName] = useState<string>('');
  const [accessLevel, setAccessLevel] = useState<string>('');

  const [directory, setDirectory] = useState<string[]>(['study']);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className={'text-xs text-gray-700 h-8 p-2'}>
          <span>home</span>
          {directory.map((dir, index) => (
            <span key={index}>
          <FaAngleRight className="inline mx-1 text-black"/>
              {dir}
        </span>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-center text-black mb-8">나만의 메모장</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
            <tr>
              <th
                className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase">Name
              </th>
              <th
                className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase">Type
              </th>
              <th
                className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase">공개여부
              </th>
              <th
                className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase">Date
              </th>
            </tr>
            </thead>
            <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="py-2 px-4 border-b border-gray-200 hover:cursor-pointer hover:text-blue-700 hover:underline">{post.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{post.type}</td>
                <td className="py-2 px-4 border-b border-gray-200">{post.accessLevel}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-[]">{post.date}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemoList;
