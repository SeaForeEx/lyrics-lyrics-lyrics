import Link from "next/link";

const Page = () => {
  return (
    <>
      <h1>These are the artists!</h1>
      <div>
        Check out our <Link href="/albums">albums</Link>!
      </div>
      <div>
        Go <Link href="/">back</Link>!
      </div>
    </>
  );
};

export default Page;
