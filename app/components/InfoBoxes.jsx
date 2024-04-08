
import React from 'react'
import InfoBox from "./../components/InfoBox";

const InfoBoxes = () => {
  return (
/*     <!-- Renters and Owners --> */
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">

        <InfoBox 
         heading="For Renters"
         textColor='text-black'
         backgroundColor='bg-gray-100'
         buttonInfo={{
            link: "/properties",
            text: "Browse Properties",
            backgroundColor: " bg-black"
         }}
        >
            Find your dream rental property. Bookmark properties and contact owners.
        </InfoBox>

        <InfoBox 
         heading="For Property Owners"
         backgroundColor='bg-blue-100'
         textColor='text-black'
         buttonInfo={{
            link: "/properties/add",
            text: "Add Property",
            backgroundColor: "bg-blue-500"
         }}
        >
             List your properties and reach potential tenants. Rent as an
              airbnb or long term.
        </InfoBox>

          {/* <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">For Renters</h2>
            <p className="mt-2 mb-4">
              Find your dream rental property. Bookmark properties and contact
              owners.
            </p>
            <a
              href="/properties.html"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Properties
            </a>
          </div> */}
          {/* <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">For Property Owners</h2>
            <p className="mt-2 mb-4">
              List your properties and reach potential tenants. Rent as an
              airbnb or long term.
            </p>
            <a
              href="/add-property.html"
              className="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
            >
              Add Property
            </a>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default InfoBoxes