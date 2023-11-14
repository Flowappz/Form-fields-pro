export default function useElementInsertedBanner() {
  return {
    Banner: () => (
      <div className="my-3 py-1 px-3 text-[0.77rem] text-center text-green-500 font-mono box-border font-semibold bg-[#2B2B2B]">
        <p>✅ Element inserted to Webflow console!</p>
      </div>
    ),
  };
}
