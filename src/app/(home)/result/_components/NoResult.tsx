import clsx from "clsx";

const filledIndex = [2, 3, 5, 7];

const NoResult = () => {
  return (
    <section className="w-full min-h-[80vh] grid place-items-center">
      <div className="w-full max-w-96 flex flex-col justify-center items-center gap-3 text-center select-none">
        <div className="w-28 grid grid-cols-3 gap-1 border-2 border-primary/50 p-1 shadow-lg rounded-sm ring-2 ring-offset-4 ring-primary/50 mb-2">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className={clsx(
                  "w-full aspect-square border-2 border-primary/50 grid place-items-center relative shadow rounded-sm",
                  {
                    "bg-primary": filledIndex.includes(index),
                  }
                )}
              >
                <span
                  className={clsx(
                    "absolute w-[2px] h-full bg-primary/50 rotate-45 origin-center",
                    {
                      "bg-white": filledIndex.includes(index),
                    }
                  )}
                ></span>
                <span
                  className={clsx(
                    "absolute w-[2px] h-full bg-primary/50 -rotate-45 origin-center",
                    {
                      "bg-white": filledIndex.includes(index),
                    }
                  )}
                ></span>
              </div>
            ))}
        </div>
        <h1 className="capitalize text-2xl md:text-3xl font-bold pb-2">
          No result found
        </h1>
        <p className="text-sm">Try different keywords</p>
      </div>
    </section>
  );
};

export default NoResult;
