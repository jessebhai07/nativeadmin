import React from "react";
import BlogUpload from "./BlogUpload";
import EventUploader from "./EventUploader";

function Home() {
  return <div className=" h-full">
    <div className="">
        <h1 className="text-red-500 p-5 flex justify-center font-bold underline">Please upload only one item at a time.</h1>
        <BlogUpload/>
        <EventUploader/>

    </div>
  </div>;
}

export default Home;
