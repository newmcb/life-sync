import React from 'react';

const LayoutContents = ({children}:{children:React.ReactNode}) => {
  return (

    <main className="pt-20">
      {/*<section className="bg-white py-20">*/}
      {/*  <div className="container mx-auto text-center">*/}
      {/*    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Website</h1>*/}
      {/*    <p className="text-lg text-gray-600 mb-8">We offer the best services for your needs.</p>*/}
      {/*    <a href="#" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Get Started</a>*/}
      {/*  </div>*/}
      {/*</section>*/}


      {/*<section className="bg-gray-100 py-20">*/}
      {/*  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">*/}
      {/*    <div className="bg-white p-6 rounded shadow">*/}
      {/*      <h2 className="text-2xl font-bold mb-2">Feature One</h2>*/}
      {/*      <p className="text-gray-600">Description of feature one.</p>*/}
      {/*    </div>*/}
      {/*    <div className="bg-white p-6 rounded shadow">*/}
      {/*      <h2 className="text-2xl font-bold mb-2">Feature Two</h2>*/}
      {/*      <p className="text-gray-600">Description of feature two.</p>*/}
      {/*    </div>*/}
      {/*    <div className="bg-white p-6 rounded shadow">*/}
      {/*      <h2 className="text-2xl font-bold mb-2">Feature Three</h2>*/}
      {/*      <p className="text-gray-600">Description of feature three.</p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}


      {/*<section className="bg-white py-20">*/}
      {/*  <div className="container mx-auto text-center">*/}
      {/*    <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>*/}
      {/*    <p className="text-lg text-gray-600 mb-8">We would love to hear from you.</p>*/}
      {/*    <a href="#" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Contact Us</a>*/}
      {/*  </div>*/}
      {/*</section>*/}
        {children}
    </main>

  // </div>
)
  ;
};

export default LayoutContents;
