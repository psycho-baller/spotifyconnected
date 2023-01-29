// import { FaQuestion } from "react-icons/fa";
// import Footer from "./footer";

export default function FloatingButton() {
  return (
    <div className="floating-button adjust-z">
      {/* <FaQuestion className="adjust-z" /> */}
      <div className="invisible-space" />
      <div className="popover adjust-z">
        <p className="text-purple-200">
          <strong className="text-purple-100">What is this?</strong>
          <br />
          This is a visual representation of
          <a
            target={"_blank"}
            className=" text-purple-400 hover:text-purple-300"
            rel={"noopener noreferrer"}
            href="https://open.spotify.com/playlist/1n2DiebkudNyQQch6C329Z"
          >
            {" "}
            my 53 songs of the week of 2022{" "}
          </a>
          , but for each song, you can see the instagram accounts of the people
          that the song reminds me of
          <br />
          <br />
          <strong className="text-purple-100">How can I find my song?</strong>
          <br />
          You can search up your instagram username using the search bar above.
          Search functionality is not thoroughly tested so if you face any
          issues, please let me know.
        </p>
        <br />
        {/* <Footer /> */}
      </div>
    </div>
  );
}
