import { useCallback, useEffect, useRef } from "react";

export default function useElementInsertedBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  const showBanner = useCallback(() => {
    if (bannerRef.current) {
      bannerRef.current.style.display = "block";
      bannerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    bannerRef.current?.addEventListener("blur", () => {
      if (!bannerRef.current) return;

      bannerRef.current.style.display = "none";
    });
  }, []);

  const Banner = useCallback(
    () => (
      <div
        ref={bannerRef}
        tabIndex={-1}
        className="my-3 py-1 px-3 hidden text-[0.77rem] text-center text-green-500 font-mono box-border font-semibold bg-[#2B2B2B]"
      >
        <p>✅ Element inserted to Webflow console!</p>
      </div>
    ),
    [bannerRef]
  );

  return {
    Banner,
    showBanner,
  };
}
