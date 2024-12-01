import { useEffect, useState, } from 'react';

import "./Home.css";
function Manage() {
  const [documents, setDocuments] = useState(() => {
    const savedDocuments = localStorage.getItem('documents');
    return savedDocuments ? JSON.parse(savedDocuments) : [];
  });

  const [filters, setFilters] = useState({
    docNumber: '',
    docName: '',
    receivedDate: '',
    docType: '',
    fiscalYear: '',
    department: '',
    message: '',
  });


  const [filteredDocs, setFilteredDocs] = useState(documents);

  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(documents));
    setFilteredDocs(documents);
  }, [documents]);

  const handleSearch = () => {
      const filtered = documents.filter((doc) => {
        return (
          (filters.docNumber ? doc.id.includes(filters.docNumber) : true) &&
          (filters.docName ? doc.name.includes(filters.docName) : true) &&
          (filters.receivedDate ? doc.receivedDate === filters.receivedDate : true) &&
          (filters.docType ? doc.type === filters.docType : true) &&
          (filters.fiscalYear ? doc.fiscalYear === filters.fiscalYear : true) &&
          (filters.department ? doc.department.includes(filters.department) : true) &&
          (filters.message ? doc.message.includes(filters.message) : true)
        );
      });
      setFilteredDocs(filtered);
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Form Change', name, value);
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    };


  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  }

  const [isExpanded, setIsExpanded] = useState(false)

  const handleViewMessage = (message) => {
    alert(`ข้อความ: ${message}`);
  };

  const handleDownload = (file) => {
    if (file) {
      const link = document.createElement('a');
      link.href = file.base64;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div className="home-container">
      <div>
        <br />
        <br />
        <div className='home-filter'>
          หมายเลขเอกสาร &nbsp;
          <input 
          value={filters.docNumber} 
          name='docNumber'
          className='home-input' 
          type="text" 
          onChange={handleChange}
          />
           &nbsp;
          ชื่อเอกสาร 
          &nbsp;
          <input 
          value={filters.docName}
          name='docName'
          className='home-input'
          type="text" 
          onChange={handleChange} 
          />
          &nbsp;
          วันที่ได้รับ 
          &nbsp;
          <input 
          value={filters.receivedDate}
          name='receivedDate'
          className='home-input' 
          type="date" 
          onChange={handleChange} 
          /> 
          &nbsp;
        </div>
        <div className='home-filter'>
          ประเภทเอกสาร
          <select 
          value={filters.docType} 
          name="docType" 
          id="" 
          className='home-input-option' 
          onChange={handleChange}
          >
            <option value="option1">option1</option>
            <option value="option2">option2</option>
            <option value="option3">option3</option>
          </select> &nbsp;
          ปีงบประมาณ
          <select 
          value={filters.fiscalYear} 
          name="fiscalYear" 
          id="" 
          className='home-input-option' 
          onChange={handleChange}
          >
            <option value="2567">2567</option>
            <option value="2566">2566</option>
            <option value="2565">2565</option>
          </select> 
          &nbsp;
          หน่วยงาน
          <select 
          value={filters.department} 
          name="department" 
          id="" 
          className='home-input-option' 
          onChange={handleChange}>
            <option value="xxx">xxx</option>
            <option value="yyy">yyy</option>
            <option value="zzz">zzz</option>
          </select>
        </div>
        
        <div className='home-filter'>
           <p style={{textAlign: 'left'}}>คำค้นหา</p>
        </div>
        <div className='home-filter'>
          <input 
          value={filters.message} 
          name='message' 
          className='big-home-input' 
          type="text" 
          onChange={handleChange} 
          />
        </div>
      </div>
      <div className='manage-search-button-container'>
        <button className='home-search-button' onClick={handleSearch} >
          ค้นหา
        </button>
      </div>
      <br />
      <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
        <div className='button-home-primary'>
          <button className='button-home-secondary' onClick={() => { toggleSidebar(); }}>
            {isExpanded ? '▼' : '▷'}
            &nbsp;<b>Document</b>
          </button>
        </div>
      </div>
      <div>
        {isExpanded && (
          <table className='document-table' >
            <thead className='table-home'>
              <tr>
                <th style={{ textAlign: 'center' }}>เอกสาร</th>
                <th style={{ textAlign: 'center' }}>ชื่อเอกสาร</th>
                <th style={{ textAlign: 'center' }}>วันที่ได้รับ</th>
                <th style={{ textAlign: 'center' }}>ปีงบประมาณ</th>
                <th style={{ textAlign: 'center' }}>หน่วยงาน</th>
                <th style={{ textAlign: 'center' }}>เครื่องมือ</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{doc.id}</td>
                  <td style={{ textAlign: 'center' }}>{doc.name}</td>
                  <td style={{ textAlign: 'center' }}>{doc.receivedDate}</td>
                  <td style={{ textAlign: 'center' }}>{doc.fiscalYear}</td>
                  <td style={{ textAlign: 'center' }}> <span className='bi bi-person-fill'>หน่วยงาน</span> {doc.department}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleViewMessage(doc.message)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    &nbsp;
                    {doc.file && (
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleDownload(doc.file)}
                      >
                        <i className="bi bi-box-arrow-in-down"></i>
                      </button>
                    )}
                    &nbsp;

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

    </div>
  );
}

export default Manage;
