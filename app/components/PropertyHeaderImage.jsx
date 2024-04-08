
import React from 'react'
import Image from "next/image";

const PropertyHeaderImage = ({propertyHeaderImage}) => {
  return (
    <>
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            sizes='100vw'
            src={`/images/properties/${propertyHeaderImage}`}
            alt=""
            className="object-cover h-[400px] w-full"
            width="1800"
            height={0}
            priority={true}
          />
        </div>
      </div>
    </section>
    </>
  )
}

export default PropertyHeaderImage