import { useState } from "react";

export const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [classNames, setClassNames] = useState() as [
    HTMLCollectionOf<Element>,
    any
  ];
  const [totalCount, setTotalCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);

  let index = 0;
  let counter: number;
  let value: string;
  // let previousScrollTop = 0;
  // let currentScrollTop = 0;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check if the decrement or increment button is clicked
    if(classNames?.length > 0){
      if (currentCount < totalCount) {
        index = currentCount;
        setCurrentCount((curr) => curr + 1);
      } else {
        setCurrentCount(1);
        index = 0;
      }

      if (classNames[index]) {
        classNames[index].scrollIntoView({
          behavior: "auto",
          block: "center",
          // inline: "center",
        });
        // check if we can increment more

        counter = 0;
        // scroll to the first match
        let loop = setInterval(() => {
          // currentScrollTop = window.innerHeight;
          // if (currentScrollTop > previousScrollTop) {
          //   console.log("Scrolling down");
          // } else {
          //   console.log("Scrolling up");
          // }
          // previousScrollTop = currentScrollTop;
          classNames[index].scrollIntoView({
            behavior: "auto",
            block: "center",
            // inline: "center",
          });
          counter++;
          if (
            // classNames[index].getBoundingClientRect().top >=
            //   window.innerHeight * 0.4 &&
            // classNames[index].getBoundingClientRect().bottom <=
            //   window.innerHeight * 0.6
            counter >= 7
          ) {
            // window.scrollTo(0, -100);

            clearInterval(loop);
          }
        }, 80);
      }
    }


  };

  return (
    <form
      className="flex justify-center items-center w-screen absolute p-4 adjust-z translucent"
      onSubmit={handleSubmit}
    >
      <input
        value={searchValue}
        placeholder="Search Insta username"
        className="font-semibold text-purple-200 py-2 px-4 border border-purple-300 rounded shadow bg-gray-800/50 focus:border-textColor focus:ring-4 focus:outline-none focus:bg-gray-800/80"
        onChange={(e) => {
          value = e.target.value;
          setSearchValue(value);
          // get classNames that match the searchValue
          setClassNames(
            document.getElementsByClassName(value.toLowerCase())
          );
          setTotalCount(document.getElementsByClassName(value.toLowerCase()).length);
          setCurrentCount(0);
        }}
      />
      <span style={{ padding: "0px 12px" }} className="text-purple-200">
        {currentCount}/{totalCount}
      </span>
      <input
        type="submit"
        value={currentCount > 0 ? "Next" : "Find"}
        className="bg-gray-200 hover:bg-gray-600/30 font-semibold py-2 px-4 border rounded shadow  bg-gray-600/60 text-purple-200 focus:border-textColor focus:ring-4 focus:outline-none border-purple-300"
      />
    </form>
  );
};

export default SearchComponent;
