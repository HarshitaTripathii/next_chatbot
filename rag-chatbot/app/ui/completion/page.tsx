"use client";

import { useState } from "react";

export default function CompletionPage() {
  // usetStates
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<String | null>(null);
  // completion has ai response: data.text
  const [completion, setCompletion] = useState("");
  // isLoading means, ai is generating answers
  const [isLoading, setIsLoading] = useState(false);

  const complete = async (e: React.SubmitEvent) => {
    e.preventDefault();
    // form submitted
    // use the current prompt, send to ai then update prompt or store it
    const submittedPrompt = prompt;
    setPrompt("");
    // loading must start , while ai is working
    setIsLoading(true);
    // old answer is removed while the new request is loading.
    setCompletion("");
    // collect ai response , and update the completion

    try {
      const response = await fetch("api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: submittedPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      // now update the new ai repsonse
      setCompletion(data.text);
    } catch (error) {
      console.log("Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      // after setting it false, completion will get displayed, if no error is present
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error && <div className="text-red-500 mb-4"> {error} </div>}

      {isLoading ? (
        <div> Loading... </div>
      ) : completion ? (
        <div>{completion}</div>
      ) : null}

      <form
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
        onSubmit={complete}
      >
        <div className="flex gap-2">
          <input
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            placeholder="Enter your prompt"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          ></input>

          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            disabled={isLoading}
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
