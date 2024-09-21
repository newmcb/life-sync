import React, {FC} from 'react';
import {initialPosts, Post} from "@/src/features/memo/ui/Memo";

interface MemoListProps{
    posts:Post[]
}

const HEADER_LIST:string[] = ['name', 'type', 'access', 'date', ];

const MemoList:FC<MemoListProps> = ({posts}) => {
    console.log('posts', posts)
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    {HEADER_LIST.map((item,index)=>{
                        return (
                            <th key={`${item}_${index}`}
                                className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase">{item}
                            </th>
                    )
                    })}
                </tr>
                </thead>
                <tbody>
                {initialPosts.map((post) => (
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
    );
};

export default MemoList;