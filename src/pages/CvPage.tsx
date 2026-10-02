import Header from "../components/Header";

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
        src={"../src/assets/ecekoprucu_cv.pdf"}
        frameBorder={0}
      />
    </div>
  );
}
