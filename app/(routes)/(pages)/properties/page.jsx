import React from 'react'
import ListingCard from "./../../../components/ListingCard"
import { fetchProperties } from "./../../../../utils/request";


const PropertiesPage = async () => {

  const properties = await fetchProperties();

  if(!properties) {
    return null;
  }

  return (
    <>
    {/* <!-- All Listings --> */}
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">

      {
        properties?.length === 0 ? (
          <p>No property found!</p>
        ): (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              properties?.map((property) => (
                <ListingCard key={property._id} property={property} />
              ))
            }
          </div>
        )
      }

        </div>
    </section>




 {/*    <!-- Pagination --> */}
    <section className="container mx-auto flex justify-center items-center my-8">
      <button className="mr-2 px-3 py-1.5 hover:bg-gray-200 transition-colors duration-300 border border-gray-300 rounded">
        Previous
      </button>
      <span className='mx-2'>
        Page 1 of 10
      </span>
      <button
        className='ml-2 px-3 py-1.5 hover:bg-gray-200 transition-colors duration-300 border border-gray-300 rounded'>
        Next
      </button>
    </section>


    </>
  )
}

export default PropertiesPage