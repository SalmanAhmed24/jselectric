import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "400", "500", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
function HistoryTab() {
  return (
    <section className="parts-wrap">
      <p className={poppins.className}>this is history tab</p>
    </section>
  );
}

export default HistoryTab;
