
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import logo from './../../assets/images/logo.png';

const Footer = () => {

  const currentYear =  new Date().getFullYear();

  return (

 /*    <!-- Footer --> */
    <footer className="bg-gray-200 py-4 mt-24">
      <div
        className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4"
      >
        <Link href="/" className="mb-4 md:mb-0 cursor-pointer">
          <Image src={logo} alt="brand-logo" width={32} height={32} className="h-8 w-auto" />
        </Link>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; { currentYear } PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer