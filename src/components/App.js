// SVGs credits go to https://materialdesignicons.com/
import { ReactComponent as NewQuoteIcon } from "../svg/new-quote.svg";
import { ReactComponent as CloseQuoteIcon } from "../svg/close-quote.svg";
import { ReactComponent as OpenQuoteIcon } from "../svg/open-quote.svg";
import { ReactComponent as TwitterIcon } from "../svg/twitter-icon.svg";

import { useState } from "react";
import "./App.css";
import { useGetRandomQuoteQuery } from "../apiSlice";

const NewQuoteButton = ({ onClick }) => {
  return (
    <button id="new-quote" onClick={onClick}>
      <NewQuoteIcon height="48px" width="48px" />
    </button>
  );
};

const App = () => {
  const [state, setState] = useState(Date.now());

  const {
    data: quote,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetRandomQuoteQuery({
    state,
  });

  const newQuote = () => setState(Date.now());

  let content;

  if (isLoading) {
    content = (
      <div className="ring-container">
        <div className="ring">
          Loading...
          <span />
        </div>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div id="quote-box">
        <div className="container">
          <OpenQuoteIcon className="open-quote" />
          <div id="text">{quote.en}</div>
          <CloseQuoteIcon className="close-quote" />
          <div id="author">-- {quote.author}</div>
        </div>
        <div className="container">
          <NewQuoteButton onClick={newQuote} />
          <a
            id="tweet-quote"
            title="Tweet this quote!"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `"${quote.en}" - ${quote.author}`
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon height="48px" width="48px" />
          </a>
        </div>
      </div>
    );
  } else if (isError) {
    content = (
      <>
        <div className="bar error">Error: "{error.toString()}"</div>
        <NewQuoteButton onClick={newQuote} />
      </>
    );
  }

  return <>{content}</>;
};

export default App;
