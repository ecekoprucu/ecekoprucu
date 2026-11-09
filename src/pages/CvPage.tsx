import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import cvPdf from "../assets/ecekoprucu_cv.pdf";
import { PageLoader } from "../components/Loader";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

// pdf.js loops over ReadableStreams with `for await` (e.g. to build the selectable text
// layer). Safari only added that recently and pdf.js's legacy build has no fallback,
// so on older iPhones it throws "undefined is not a function". Add it if missing.
if (
  typeof ReadableStream !== "undefined" &&
  !(Symbol.asyncIterator in ReadableStream.prototype)
) {
  Object.defineProperty(ReadableStream.prototype, Symbol.asyncIterator, {
    configurable: true,
    writable: true,
    value: async function* <T>(this: ReadableStream<T>) {
      const reader = this.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) return;
          yield value;
        }
      } finally {
        reader.releaseLock();
      }
    },
  });
}

const MAX_PAGE_WIDTH = 850;

export default function CvPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.floor(entry.contentRect.width)),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-poppins w-screen min-h-[calc(100vh_-_3rem)] bg-gray-200 dark:bg-gray-700 px-3 py-6 flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        className="w-full flex flex-col items-end gap-3"
        style={{ maxWidth: MAX_PAGE_WIDTH }}
      >
        <a
          href={cvPdf}
          download="ecekoprucu_cv.pdf"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700! dark:text-gray-200! border border-gray-600 dark:border-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <FontAwesomeIcon icon={faDownload} />
          Download PDF
        </a>
        {width !== undefined && (
          <Document
            file={cvPdf}
            suspense={false}
            loading={<PageLoader />}
            error={
              <p className="w-full text-center text-gray-700 dark:text-gray-200">
                The CV couldn't be displayed here.{" "}
                <a href={cvPdf} className="underline">
                  Open the PDF
                </a>
              </p>
            }
            className="w-full shadow-md shadow-gray-500 dark:shadow-gray-900"
          >
            <Page pageNumber={1} width={width} loading={null} />
          </Document>
        )}
      </div>
    </div>
  );
}
