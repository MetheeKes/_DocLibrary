import React, { useState, useEffect } from 'react';
import './Permission.css';
import usersData from '../../data/usersData'; // นำเข้าไฟล์ usersData

const Permission = () => {
  const [users, setUsers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    id: '',
    name: '',
    permissions: {
      download: false,
      upload: false,
      editDelete: false,
      managePermissions: false,
      reportViewer: false,
    },
  });

  // ฟังก์ชันสำหรับการดึงข้อมูลจาก localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('usersData');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(usersData); // ถ้ายังไม่มีข้อมูลใน localStorage, ใช้ข้อมูลตัวอย่าง
    }
  }, []);

  // ฟังก์ชันสำหรับการบันทึกข้อมูลลงใน localStorage
  const saveUsersToLocalStorage = (users) => {
    localStorage.setItem('usersData', JSON.stringify(users));
  };

  // Toggle popup for adding user
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setNewUser({
      id: '',
      name: '',
      permissions: {
        download: false,
        upload: false,
        editDelete: false,
        managePermissions: false,
        reportViewer: false,
      },
    });
  };

  // Open delete confirmation popup
  const toggleDeletePopup = (user) => {
    setSelectedUser(user);
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permissionKey) => {
    setNewUser((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permissionKey]: !prev.permissions[permissionKey],
      },
    }));
  };

  const handleAddUser = () => {
    if (newUser.id && newUser.name) {
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      saveUsersToLocalStorage(updatedUsers); // บันทึกข้อมูลลงใน localStorage
      togglePopup();
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  const handleDeleteUser = () => {
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers); // บันทึกข้อมูลลงใน localStorage
    toggleDeletePopup(null);
  };

  return (
    <div className="permission-container">
      <div className="permission-header">
        <h3>บริหารสิทธิ์</h3>
        <button className="btn btn-success" onClick={togglePopup}>
          นำเข้าบุคลากร
        </button>
      </div>

      <table className="document-table">
        <thead>
          <tr>
            <th >รหัสบุคลากร</th>
            <th >ชื่อบุคลากร</th>
            <th>Download</th>
            <th >Upload</th>
            <th >แก้ไข/ลบ</th>
            <th>บริหารสิทธิ์</th>
            <th>Report viewer</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td
                className="clickable-name"
                onClick={() => toggleDeletePopup(user)}
              >
                {user.name}
              </td>
              {Object.keys(user.permissions).map((permissionKey) => (
                <td key={permissionKey}>
                  <input
                    type="checkbox"
                    checked={user.permissions[permissionKey]}
                    onChange={() =>
                      setUsers(
                        users.map((u) =>
                          u.id === user.id
                            ? {
                                ...u,
                                permissions: {
                                  ...u.permissions,
                                  [permissionKey]: !u.permissions[permissionKey],
                                },
                              }
                            : u
                        )
                      )
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Popup เพิ่มบุคลากรใหม่ */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>เพิ่มบุคลากรใหม่</h3>
            <input
              type="text"
              name="id"
              placeholder="รหัสบุคลากร"
              value={newUser.id}
              onChange={handleInputChange}
              className="form-control"
            />
            <input
              type="text"
              name="name"
              placeholder="ชื่อบุคลากร"
              value={newUser.name}
              onChange={handleInputChange}
              className="form-control"
            />
            <div className="permissions">
              <h4>ตั้งค่าสิทธิ์:</h4>
              {Object.keys(newUser.permissions).map((permissionKey) => (
                <div key={permissionKey} className="form-check">
                  <input
                    type="checkbox"
                    id={permissionKey}
                    className="form-check-input"
                    checked={newUser.permissions[permissionKey]}
                    onChange={() => handlePermissionChange(permissionKey)}
                  />
                  <label htmlFor={permissionKey} className="form-check-label">
                    {permissionKey === 'download'
                      ? 'Download'
                      : permissionKey === 'upload'
                      ? 'นำเข้าเอกสาร'
                      : permissionKey === 'editDelete'
                      ? 'แก้ไข/ลบ'
                      : permissionKey === 'managePermissions'
                      ? 'บริหารสิทธิ์'
                      : 'Report Viewer'}
                  </label>
                </div>
              ))}
            </div>
            <br />
            <div className="popup-buttons">
              <button className="btn btn-primary" onClick={handleAddUser}>
                บันทึก
              </button>
              <button className="btn btn-danger" onClick={togglePopup}>
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeletePopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>ลบบุคลากร</h3>
            <p>คุณต้องการลบบุคลากร {selectedUser?.name} ใช่หรือไม่?</p>
            <div className="popup-buttons">
              <button className="btn btn-danger" onClick={handleDeleteUser}>
                ลบ
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => toggleDeletePopup(null)}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Permission;