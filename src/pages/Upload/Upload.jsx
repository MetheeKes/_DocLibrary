import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import React, { useState, useEffect } from "react";

import "./Upload.css";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

function Upload() {
  const [documents, setDocuments] = useState(() => {
    const savedDocuments = localStorage.getItem("documents");
    return savedDocuments ? JSON.parse(savedDocuments) : [];
  });

  const [form, setForm] = useState({
    id: "",
    name: "",
    receivedDate: "",
    fiscalYear: "",
    department: "",
    message: "",
    file: null,
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const base64File = await fileToBase64(files[0]);
      setForm({ ...form, file: { name: files[0].name, base64: base64File } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddOrUpdateDocument = () => {
    if (editingIndex !== null) {
      const updatedDocuments = [...documents];
      updatedDocuments[editingIndex] = form;
      setDocuments(updatedDocuments);
      setEditingIndex(null);
    } else {
      setDocuments([...documents, form]);
    }
    setForm({
      id: "",
      name: "",
      receivedDate: "",
      fiscalYear: "",
      department: "",
      message: "",
      file: null,
    });
  };

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
      const link = document.createElement("a");
      link.href = file.base64;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="upload-container">
      <div className="">
        <br />
        <br />
        <div className="form">
          หมายเลขเอกสาร
          <input
            className="form-input"
            type="text"
            name="id"
            placeholder=""
            value={form.id}
            onChange={handleChange}
          />
          ชื่อเอกสาร
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder=""
            value={form.name}
            onChange={handleChange}
          />
          วันที่ได้รับ
          <input
            className="form-input"
            type="date"
            name="receivedDate"
            value={form.receivedDate}
            onChange={handleChange}
          />
        </div>
        <div className="form">
          ปีงบประมาณ&nbsp;
          <select 
          value={form.fiscalYear} 
          name="fiscalYear" 
          id="" 
          className='form-input-option' 
          onChange={handleChange}
          >
            <option value="2567">2567</option>
            <option value="2566">2566</option>
            <option value="2565">2565</option>
          </select>
          หน่วยงาน&nbsp;
          <select 
          value={form.department} 
          name="department" 
          id="" 
          className='form-input-option' 
          onChange={handleChange}>
            <option value="xxx">xxx</option>
            <option value="yyy">yyy</option>
            <option value="zzz">zzz</option>
          </select>
          แนบไฟล์&nbsp;
          <input
            className="form-input-upload"
            type="file"
            name="file"
            onChange={handleChange}
          />
        </div>

        <div className="form">
          คำอธิบายเพิ่มเติม&nbsp;:
          <input
            className="form-input"
            type="text"
            name="message"
            value={form.message}
            style={{width: '500px'}}
            onChange={handleChange}
          />
        </div>

        <br />
        <br />

        <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
          <div className="button-manage-primary">
            <button
              className="button-manage-secondary"
              onClick={() => {
                toggleSidebar();
              }}
            >
              {isExpanded ? "▼" : "▷"}
              &nbsp;Document
            </button>
            <button
              className="add-document-button"
              onClick={handleAddOrUpdateDocument}
            >
              {editingIndex !== null ? "อัปเดตเอกสาร" : "เพิ่มเอกสาร"}
            </button>
          </div>
        </div>

        <div>
          {isExpanded && (
            <table className="document-table">
              <thead>
                <tr>
                  <th>หมายเลขเอกสาร</th>
                  <th>ชื่อเอกสาร</th>
                  <th>วันที่รับ</th>
                  <th>ปีงบประมาณ</th>
                  <th>หน่วยงาน</th>
                  <th>เครื่องมือ</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={index}>
                    <td>{doc.id}</td>
                    <td>{doc.name}</td>
                    <td>{doc.receivedDate}</td>
                    <td>{doc.fiscalYear}</td>
                    <td>{doc.department}</td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => handleViewMessage(doc.message)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(index)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(index)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                      {doc.file && (
                        <button
                          className="download-button"
                          onClick={() => handleDownload(doc.file)}
                        >
                          <i className="bi bi-box-arrow-in-down"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;
