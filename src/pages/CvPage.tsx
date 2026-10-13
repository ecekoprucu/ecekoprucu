import cvPdf from "../assets/ecekoprucu_cv.pdf";

export default function CvPage() {
  return <iframe height="100%" width="100%" src={cvPdf} frameBorder={0} />;
}
