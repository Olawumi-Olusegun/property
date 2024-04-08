
import React from 'react'
import Link from "next/link"
import ListingCard from './ListingCard';

const HomeProperties = ({properties}) => {


    const recentProperties = properties.sort(() => Math.random() - Math.random()).slice(0, 3);

  return (
    <>
     {/*    <!-- Featured Properties --> */}
    <section class="bg-blue-50 px-4 pt-6 pb-10">
      <div class="container-xl lg:container m-auto">
        <h2 class="text-3xl font-bold text-blue-500 mb-6 py-8 text-center">
          Featured Properties
        </h2>
        {
        recentProperties.length === 0 ? (
          <p>No property found!</p>
        ): (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              recentProperties.map((property) => (
                <ListingCard key={property._id} property={property} />
              ))
            }
          </div>
        )
      }
     </div>
    </section>

    <section className="m-auto max-w-lg my-10 px-6">
      <Link
        href="/properties"
        className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Properties</Link
      >
    </section>


    </>
  )
}

export default HomeProperties