import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";

const Banner = () => {
  const [search, setSearch] = useState("");
  const onChange = ({ target }) => setSearch(target.value);


  return (
    <div className="hero-section relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-opacity-50 z-[-1]">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('banner.jpg')` }}
        />
      </div>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-8xl font-bold mb-4">Your Hero Title</h1>
        <div className="mx-auto max-w-md">
          <div className="relative flex w-full max-w-[24rem]">
            <Input
              type="text"
              placeholder="search..."
              value={search}
              onChange={onChange}
              className="!border pr-20 !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              color={search ? "gray" : "blue-gray"}
              disabled={!search}
              className="!absolute right-1 top-1 rounded"
            >
              search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
