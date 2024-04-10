"use client";

import React, { useState, useEffect } from 'react'
import { useParams  } from 'next/navigation';
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa';
import { fetchSingleProperty } from "./../../../../../utils/request"
import PropertyHeaderImage from "./../../../../components/PropertyHeaderImage";
import BookmarkButton from "./../../../../components/BookmarkButton";
import ShareButton from "./../../../../components/ShareButton";
import PropertyContactForm from "./../../../../components/PropertyContactForm";
import PropertyImages from "./../../../../components/PropertyImages";
import PropertyDetails from "./../../../../components/PropertyDetails";
import Spinner from "./../../../../components/Spinner";

const PropertyPage = () => {

  const { propertyId } = useParams();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);

  useEffect(() => {

    const fetchPropertyData = async () => {
      if(!propertyId) {
        return;
      }

      try {
        const property = await fetchSingleProperty(propertyId);
        setProperty(property)
      } catch (error) {
        setProperty(null)
      } finally {
        setLoading(false)
      }
    }

    if(property === null) {
      fetchPropertyData();
    }

  }, []);

  if (!property && !loading) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }


  return (
    <>
    { loading && <Spinner /> }
    {
      !loading && property && (
        <>
    <PropertyHeaderImage propertyHeaderImage={property?.images[0]} />

   {/*  <!-- Go Back --> */}
    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Properties
        </Link>
      </div>
    </section>


   {/*  <!-- Property Info --> */}
   <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-70/30 w-full gap-6">
        
        <PropertyDetails property={property} />
          <aside className="space-y-4">       
            <BookmarkButton property={property} />
            <ShareButton property={property} />
            <PropertyContactForm property={property} />
          </aside>
        </div>
      </div>
    </section>

      <PropertyImages images={property.images}  />
        
        </>
      )
    }

    </>
  )
}

export default PropertyPage