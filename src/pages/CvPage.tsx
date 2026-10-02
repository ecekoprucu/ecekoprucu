import Header from "../components/Header";
import cvPdf from "../assets/ecekoprucu_cv.pdf";

export default function CvPage() {
  return (
    <div
      style={{
        height: "calc(100vh - 48px)",
        width: "100vw",
      }}
    >
      <Header />
      <iframe
        height="100%"
        width="100%"
        src={cvPdf}
        frameBorder={0}
      />
    </div>
  );
}
