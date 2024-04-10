"use client";

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import { FaArrowAltCircleLeft} from "react-icons/fa";
import ListingCard from '../../../../components/ListingCard';
import PropertySearchForm from '../../../../components/PropertySearchForm';
import Spinner from '../../../../components/Spinner';


const SearchResultPage = () => {

    const searchParams = useSearchParams();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");


    useEffect(() => {
        const fetchSearchResult = async () => {

            try {
                const response = await fetch(`/api/properties/search?location=${location}&propertyType=${propertyType}`);

                if(response.status === 200) {
                    const data = await response.json();
                    setProperties(data?.properties);
                }

            } catch (error) {
                console.log(error);
                setProperties([]);
            } finally {
                setIsLoading(false)
            }
        }

        fetchSearchResult();

    }, [location, propertyType]);

    if(isLoading) {
        return <Spinner loading={isLoading} />
    }

  return (
    <>
    <section className='bg-blue-700 py-4'>
      <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
        <PropertySearchForm />
      </div>
    </section>
    {isLoading ? (
      <Spinner loading={isLoading} />
    ) : (
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <Link
            href='/properties'
            className='flex items-center text-blue-500 hover:underline mb-3'
          >
            <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
          </Link>
          <h1 className='text-2xl mb-4'>Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
                <ListingCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    )}
  </>
  )
}

export default SearchResultPage