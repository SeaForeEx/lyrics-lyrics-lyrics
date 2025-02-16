import Link from "next/link";

const Page = () => {
  return (
    <>
      <h1>Welcome to LYRICS LYRICS LYRICS!</h1>
      <div>
        Check out our <Link href="/artists">artists</Link>!
      </div>
      <div>
        Check out our <Link href="/albums">albums</Link>!
      </div>
    </>
  );
};

export default Page;
