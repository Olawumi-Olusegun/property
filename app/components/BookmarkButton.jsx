"use client";

import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react'
import { FaBookmark } from 'react-icons/fa'
import { toast } from "react-toastify";

const BookmarkButton = ({property}) => {

  const { data: session } = useSession();

  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const checkBookmarkStatus = async () => {
      if(!userId) {
        toast.error("You need to sign to bookmarkk a property");
        setIsLoading(false);
        return;
      }
  
      try {
        const response = await fetch('/api/bookmarks/check', {
          method: "POST",
          body: JSON.stringify({ propertyId: property?._id }),
          headers: {
            "Content-Type": "application/json",
          }
        });
  
        if(response.status === 200) {
          const data = await response.json();
          setIsBookmarked(data?.isBookmarked)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
      } finally {
        setIsLoading(false);
      }
    }

    checkBookmarkStatus();


  }, [property?._id, userId])


  const handleClicked = async () => {
    if(!userId) {
      toast.error("You need to sign to bookmarkk a property");
      return;
    }

    try {
      const response = await fetch('/api/bookmarks', {
        method: "POST",
        body: JSON.stringify({ propertyId: property?._id }),
        headers: {
          "Content-Type": "application/json",
        }
      });

      if(response.status === 200) {
        const data = await response.json();
        toast.success(data?.message);
        setIsBookmarked(data?.isBookmarked)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  if(isLoading) {
    return <p className='text-center'>Loading...</p>
  }

  return (
    <>
    <button onClick={handleClicked} className={`${isBookmarked ? " bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"} text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`} >
        <FaBookmark className="mr-2" /> { isBookmarked ? "Remove Bookmark" : "Bookmark Property" }
    </button>
    </>
  )
}

export default BookmarkButton