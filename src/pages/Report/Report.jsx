import "./Report.css";
function Report() {
  return (
    <div className="report-box">
      <div className="report-container">
        <p className="report-text">
          <h5 style={{ color: "white" }}>รายงาน</h5>
        </p>

        <div className="box-1">
          <p style={{ color: "white" }}>จำนวนเอกสารนำเข้าประจำเดือน</p>
          <p className="number" style={{ color: "white" }}>
            16
          </p>
          <p className="text" style={{ color: "white" }}>
            เอกสาร
          </p>
        </div>

        <div className="box-2">
          <p style={{ color: "white" }}>จำนวน Download นำเข้าประจำเดือน</p>
          <p className="number" style={{ color: "white" }}>
            9
          </p>
          <p className="text" style={{ color: "white" }}>
            เอกสาร
          </p>
        </div>

        <div className="box-3">
          <p style={{ color: "white" }}>จำนวนเอกสารประจำปีงบประมาณ</p>
          <p style={{ color: "white" }} className="text-1">
            2564 : 66 เอกสาร
          </p>
          <p style={{ color: "white" }} className="text-1">
            2565 : 72 เอกสาร
          </p>
          <p style={{ color: "white" }} className="text-1">
            2566 : 19 เอกสาร
          </p>
        </div>
        <div className="report-card">
          <h2>จำนวนเอกสารตามหน่วยงานประจำเดือน</h2>
          <table className="report-table">
            <thead>
              <tr>
                <th>หน่วยงาน</th>
                <th className="text-2">Upload</th>
                <th className="text-3">Download</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>หน่วยงาน xxxxx</td>
                <td className="text-2">7</td>
                <td className="text-3">3</td>
              </tr>
              <tr>
                <td>หน่วยงาน xxxxx</td>
                <td className="text-2">2</td>
                <td className="text-3">0</td>
              </tr>
              <tr>
                <td>หน่วยงาน xxxxx</td>
                <td className="text-2">1</td>
                <td className="text-3">0</td>
              </tr>
              <tr>
                <td>หน่วยงาน xxxxx</td>
                <td className="text-2">0</td>
                <td className="text-3">2</td>
              </tr>
              <tr>
                <td>หน่วยงาน xxxxx</td>
                <td className="text-2">5</td>
                <td className="text-3">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;
