import Shortener from '@/components/Shortener'

export default function Home() {
  return (
    <main>
      <section className="bg-neutral-200 mt-3 mx-auto p-3 rounded-lg w-xl">
        <h1 className="font-bold text-4xl text-center">😜 tiny-yurl</h1>
        <p className="italic my-2 text-center">Makes all your yurls the tiniest of tiny.</p>
        <Shortener />
      </section>
    </main>
  )
}
