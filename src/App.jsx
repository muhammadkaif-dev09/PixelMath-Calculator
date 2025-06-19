import { useEffect, useState } from "react";
// Optional: Use for safe expression evaluation
import { evaluate } from "mathjs";

function App() {
  const btn =
    "w-full h-full rounded-full text-2xl shadow-sm bg-white text-black flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all duration-150 cursor-pointer";

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  // Replace visual operators with real JS operators
  const evaluateExpression = (exp) => {
    return exp
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/%/g, "/100");
  };

  useEffect(() => {
    const allButtons = document.querySelectorAll("button[data-value]");

    const handleClick = (e) => {
      const value = e.currentTarget.dataset.value;

      if (value === "=") {
        try {
          const parsed = evaluateExpression(expression);
          const resultValue = evaluate(parsed); // Safe alternative to eval()
          // const resultValue = eval(parsed);
          setExpression(resultValue.toString());
          setResult("");
        } catch (error) {
          setExpression("Error");
          setResult("");
        }
      } else if (value === "AC") {
        setExpression("");
        setResult("");
      } else if (value === "Del") {
        setExpression((prev) => prev.slice(0, -1));
      } else if (value === ".") {
        const lastNumber = expression.split(/[\+\−\×\÷]/).pop();
        if (lastNumber.includes(".")) return;
        setExpression((prev) => prev + value);
      } else {
        setExpression((prev) => prev + value);
      }
    };

    allButtons.forEach((btn) => btn.addEventListener("click", handleClick));

    return () => {
      allButtons.forEach((btn) =>
        btn.removeEventListener("click", handleClick)
      );
    };
  }, [expression]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-lime-100 flex justify-center items-center flex-col p-6 gap-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
          PixelMath
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          A Beautifully Simple Calculator for Everyday Use.
        </p>
      </div>

      {/* Calculator Box */}
      <div className="bg-white w-[22rem] lg:w-[28rem] h-[35rem] rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-300">
        {/* Display */}
        <div className="px-6 pt-8 text-right">
          <div className="text-gray-500 text-sm mb-1 break-words h-5">
            {result || expression || "0"}
          </div>
          <div className="text-5xl font-bold text-black break-words">
            {expression || "0"}
          </div>
        </div>

        {/* Buttons */}
        <div className="bg-[#F5F5F5] w-full h-[75%] py-5 px-4 rounded-t-3xl">
          <div className="grid grid-cols-4 grid-rows-5 gap-4 w-full h-full">
            <button className={`${btn} text-red-500`} data-value="Del">
              Del
            </button>
            <button className={`${btn}`} data-value="%">
              %
            </button>
            <button className={`${btn}`} data-value="÷">
              ÷
            </button>
            <button className={`${btn}`} data-value="×">
              ×
            </button>

            <button className={`${btn}`} data-value="7">
              7
            </button>
            <button className={`${btn}`} data-value="8">
              8
            </button>
            <button className={`${btn}`} data-value="9">
              9
            </button>
            <button className={`${btn}`} data-value="−">
              −
            </button>

            <button className={`${btn}`} data-value="4">
              4
            </button>
            <button className={`${btn}`} data-value="5">
              5
            </button>
            <button className={`${btn}`} data-value="6">
              6
            </button>
            <button className={`${btn}`} data-value="+">
              +
            </button>

            <button className={`${btn}`} data-value="1">
              1
            </button>
            <button className={`${btn}`} data-value="2">
              2
            </button>
            <button className={`${btn}`} data-value="3">
              3
            </button>

            <button
              className={`${btn} row-span-2 col-span-1 flex items-center justify-center text-3xl text-white font-semibold bg-gradient-to-b from-pink-500 to-orange-400 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform`}
              data-value="="
            >
              =
            </button>

            <button
              className={`${btn} col-span-1 text-red-400`}
              data-value="AC"
            >
              AC
            </button>
            <button className={`${btn} col-span-1`} data-value="0">
              0
            </button>
            <button className={`${btn} col-span-1`} data-value=".">
              .
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-4">
        Made with ❤️ by{" "}
        <span className="font-medium text-gray-700">
          <a href="https://github.com/muhammadkaif-dev09?tab=repositories">Kaif Chandiwala</a>
        </span>{" "}
        &middot; © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
