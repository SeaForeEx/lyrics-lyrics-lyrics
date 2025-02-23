import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <h1>These are the albums!</h1>
      <div>
        Check out our <Link href="/artists">artists</Link>!
      </div>
      <div>
        Go <Link href="/">back</Link>!
      </div>
    </>
  );
};

export default Page;
