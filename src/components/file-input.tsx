import { useRef } from "react";

export default function FileInput() {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <input ref={ref} name="attachment" type="file" className="hidden" accept="image/png, image/jpeg" />
      <button
        type="button"
        className="flex h-[50px] w-[50px] items-center justify-center rounded-lg bg-indigo-600 text-white transition-colors hover:bg-indigo-500 active:bg-indigo-500"
        onClick={() => ref.current?.click()}
      >
        <span className="sr-only">Attach</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13.234 20.252 21 12.3" />
          <path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
        </svg>
      </button>
    </>
  );
}
