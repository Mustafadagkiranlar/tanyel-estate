import Image from 'next/image';
import React from 'react';



function MainHeader(){
  return (
<header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Image src={'/images/logo.png'} alt="Tanyel Logo" width={112} height={112} className="mr-2" />
            </div>
          </div>
          <div className="flex items-center">
            {/* Add any additional links or buttons here */}
            <p className="px-3 py-2 rounded-md font-medium text-gray-700 hover:text-gray-900 text-lg">
              Admin
            </p>
            {/* <div className="ml-4 relative">
              <img className="h-8 w-8 rounded-full" src={'/images/avatar.png'} alt="User name" />
            </div> */}
          </div>
        </div>
      </div>
    </header>


  );
}


export default MainHeader;
