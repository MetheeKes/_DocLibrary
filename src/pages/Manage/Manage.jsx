import { useEffect, useState, } from 'react';

import "./Manage.css";
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

  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    id: '',
    name: '',
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

  const handleSearchOrUpdateDocument = () => {
    if (editingIndex !== null) {
      const updatedDocuments = [...documents];
      updatedDocuments[editingIndex] = form;
      setDocuments(updatedDocuments);
      setEditingIndex(null);
    } 
    else {
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
    }
    setForm({ id: '', name: '', receivedDate: '', docType: '', fiscalYear: '', department: '', message: '',});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Form Change', name, value);
    if (editingIndex !== null) {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };


  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  }

  const [isExpanded, setIsExpanded] = useState(false)

  const handleEdit = (index) => {
    setForm(documents[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

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
    <div className="manage-container">
      <div>
        <br />
        <br />
        <div className='manage-filter'>
          หมายเลขเอกสาร &nbsp;
          <input 
          value={editingIndex !== null ? form.id : filters.docNumber} 
          name={editingIndex !== null ? 'id' : 'docNumber'}
          className='manage-input' 
          type="text" 
          onChange={handleChange}
          />
           &nbsp;
          ชื่อเอกสาร 
          &nbsp;
          <input 
          value={editingIndex !== null ? form.name : filters.docName}
          name={editingIndex !== null ? 'name' : 'docName'}
          className='manage-input'
          type="text" 
          onChange={handleChange} 
          />
          &nbsp;
          วันที่ได้รับ 
          &nbsp;
          <input 
          value={editingIndex !== null ? form.receivedDate : filters.receivedDate}
          name='receivedDate'
          className='manage-input' 
          type="date" 
          onChange={handleChange} 
          /> 
          &nbsp;
        </div>
        <div className='manage-filter'>
          ประเภทเอกสาร
          <select 
          value={editingIndex !== null ? form.docType : filters.docType} 
          name="docType" 
          id="" 
          className='manage-input-option' 
          onChange={handleChange}
          >
            <option value="option1">option1</option>
            <option value="option2">option2</option>
            <option value="option3">option3</option>
          </select> &nbsp;
          ปีงบประมาณ
          <select 
          value={editingIndex !== null ? form.fiscalYear : filters.fiscalYear} 
          name="fiscalYear" 
          id="" 
          className='manage-input-option' 
          onChange={handleChange}
          >
            <option value="2567">2567</option>
            <option value="2566">2566</option>
            <option value="2565">2565</option>
          </select> 
          &nbsp;
          หน่วยงาน
          <select 
          value={editingIndex !== null ? form.department : filters.department} 
          name="department" 
          id="" 
          className='manage-input-option' 
          onChange={handleChange}>
            <option value="xxx">xxx</option>
            <option value="yyy">yyy</option>
            <option value="zzz">zzz</option>
          </select>
        </div>
        
        <div className='manage-filter'>
          คำค้นหา
        </div>
        <br />
        <div className='manage-filter'>
          <input 
          value={editingIndex !== null ? form.message : filters.message} 
          name='message' 
          className='big-manage-input' 
          type="text" 
          onChange={handleChange} 
          />
        </div>
      </div>
      <div className='manage-search-button-container'>
        <button className='manage-search-button' onClick={handleSearchOrUpdateDocument} >
          {editingIndex !== null ? 'อัปเดตเอกสาร' : 'ค้นหา'}
        </button>
      </div>
      <br />
      <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
        <div className='button-manage-primary'>
          <button className='button-manage-secondary' onClick={() => { toggleSidebar(); }}>
            {isExpanded ? '▼' : '▷'}
            &nbsp;Document
          </button>
        </div>
      </div>
      <div>
        {isExpanded && (
          <table className='document-table' >
            <thead className='table-manage'>
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
                    <button className="btn btn-outline-warning" onClick={() => handleEdit(index)}><i className="bi bi-pencil-square"></i></button>
                    &nbsp;
                    <button className="btn btn-outline-danger" onClick={() => handleDelete(index)}><i className="bi bi-trash3"></i></button>
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

