import Link from "next/link";
import { BsDownload } from "react-icons/bs";
import { Gpts } from "@/app/types/gpts";
import GptsDetail from "@/app/components/GptsDetail";
import Image from "next/image";
import extensionSrc from "@/public/extension.png";
import { findByUuid } from "@/app/models/gpts";

async function getData(uuid: string): Promise<Gpts | undefined> {
  if (!uuid) {
    return;
  }

  const gpts = await findByUuid(uuid);

  return gpts;
}

export default async ({ params }: { params: { uuid: string } }) => {
  const data = await getData(params.uuid);

  console.log("data", data);
  return (
    <section className="relatve">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-2">
          <li>
            <div>
              <Link className="text-gray-400 hover:text-gray-500" href="/">
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
              </svg>
              <Link
                className="ml-2 text-md font-medium text-gray-500 hover:text-gray-700"
                aria-current="page"
                href="/gpts/random"
              >
                tools
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
              </svg>
              <Link
                href={"#"}
                className="ml-2 text-md font-medium text-gray-500 hover:text-gray-700"
                aria-current="page"
              >
                {data?.properties.Title.title[0].plain_text}
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        {data && <GptsDetail gpts={data} />}
      </div>
    </section>
  );
};
