import React from 'react'
import Properties from "./../../../components/Properties"
import PropertySearchForm from "./../../../components/PropertySearchForm"
import { fetchProperties } from "./../../../../utils/request";


const PropertiesPage = async () => {

  const properties = await fetchProperties();

  if(!properties) {
    return null;
  }

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <Properties />
    </>
  )
}

export default PropertiesPage