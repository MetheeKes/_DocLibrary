// usersData.jsx
const usersData = [
  {
    id: '001',
    name: 'นายสมชาย สมศักดิ์',
    permissions: {
      download: true,
      upload: true,
      editDelete: true,
      managePermissions: false,
      reportViewer: true,
    },
  },
  {
    id: '002',
    name: 'นางสาวพรทิพย์ พรหมจิต',
    permissions: {
      download: false,
      upload: true,
      editDelete: false,
      managePermissions: true,
      reportViewer: false,
    },
  },
  {
    id: '003',
    name: 'นายเอกชัย สันติ',
    permissions: {
      download: true,
      upload: false,
      editDelete: true,
      managePermissions: false,
      reportViewer: true,
    },
  },
  {
    id: '004',
    name: 'นายอนันต์ กิตติชัยวงศ์',
    permissions: {
      download: true,
      upload: true,
      editDelete: true,
      managePermissions: false,
      reportViewer: true,
    },
  },
  {
    id: '005',
    name: 'นางสุภาวดี ชลธารานนท์',
    permissions: {
      download: true,
      upload: true,
      editDelete: true,
      managePermissions: false,
      reportViewer: false,
    },
  },
];

export default usersData;
