import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "400", "500", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
function HistoryTab({ history }) {
  const viewImage = (file) => {
    window.open(file.fileUrl);
  };
  return (
    <section className="parts-wrap">
      {history.length > 0 ? (
        <section>
          {history.map((i) => (
            <div key={i.toolNumber} className="row-history">
              <div className="single-item">
                <label>Tool #</label>
                <p>{i.toolNumber}</p>
              </div>
              <div className="single-item">
                <label>Tech Assigned To</label>
                <p>{i.techAssigned}</p>
              </div>
              <div className="single-item">
                <label>Checked Out For</label>
                <p>
                  {i.checkedOut !== undefined ? `${i.checkedOut} days` : "none"}
                </p>
              </div>
              <div className="single-item">
                <label>Notes</label>
                <p>{i.note}</p>
              </div>
              <div className="single-item">
                <label>Job</label>
                <p>{i.job}</p>
              </div>
              <div className="single-item">
                <label>Employee</label>
                <p>{i.user}</p>
              </div>
              <div className="single-item">
                <label>Date</label>
                <p>{i.date}</p>
              </div>
              <div className="single-item">
                <label>Time</label>
                <p>{i.time}</p>
              </div>
              <div className="single-item">
                <label>Attachment</label>
                <img
                  onClick={() => viewImage(i.file)}
                  src={i.file && i.file.fileUrl}
                  width={30}
                  height={30}
                  alt={i.file && i.file.filename}
                />
              </div>
            </div>
          ))}
        </section>
      ) : (
        <p>There is no history available for this tool</p>
      )}
    </section>
  );
}

export default HistoryTab;
