export default function FAQs() {
  return (
    <section aria-labelledby="faq-title" className="mx-auto p-3 w-xl">
      <h2 id="faq-title" className="font-bold mb-2 text-xl">🙋 In case you have questions...</h2>

      <details open className="my-1">
        <summary className="font-semibold">What does this app do?</summary>
        <p className="my-1 px-1">It shortens yurls.</p>
      </details>

      <hr className="my-2" />

      <details open className="my-1">
        <summary className="font-semibold">What is a "yurl"?</summary>
        <p className="my-1 px-1">It's just a URL.  Preferrably a long one, or you wouldn't need to make it tiny.</p>
      </details>

      <hr className="my-2" />

      <details open className="my-1">
        <summary className="font-semibold">Is it free to use?</summary>
        <p className="my-1 px-1">Completely.  I made it as a side-project to stay sharp. 💪</p>
      </details>

      <hr className="my-2" />

      <details open className="my-1">
        <summary className="font-semibold">How long do tiny yurls last?</summary>
        <p className="my-1 px-1">For thirty days, and then they auto-expire.</p>
      </details>

      <hr className="my-2" />

      <details open className="my-1">
        <summary className="font-semibold">Who are you?</summary>
        <p className="my-1 px-1">I'm <strong>Scott McCormack</strong>, and I make apps that are beautiful inside and out.  If you need me, I'll be <a className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline" href="https://github.com/flintinatux" target="_blank" rel="noopener noreferrer">over here</a> pushing this big green <span className="bg-green-700 dark:bg-green-600 px-[6px] py-[2px] rounded text-white">Merge</span> button...</p>
      </details>
    </section>
  )
}
