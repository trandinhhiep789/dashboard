export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PartnerUser/Search";
export const LoadAPIPath = "api/PartnerUser/Load";
export const AddAPIPath = "api/PartnerUser/Add";
export const UpdateAPIPath = "api/PartnerUser/Update";
export const DeleteAPIPath = "api/PartnerUser/Delete";
export const UpdateOrderAPIPath = "api/PartnerUser/UpdateOrder";
export const BackLink = "/PartnerUser";
export const AddLink = "/PartnerUser/add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "UserName";
export const SearchPartnerRoleAPIPath = "api/PartnerRole/Search2";
import {CDN_LOGO_IMAGE} from '../../../../../../constants/systemVars';

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PartnerUser", Title: "Người dùng của nhà cung cấp" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PartnerUser", Title: "Người dùng của nhà cung cấp" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PartnerUser", Title: "Người dùng của nhà cung cấp" },
    { Link: "", Title: "Thêm" }
];

/****************************************** giấy tờ tùy thân *******************************************/

export const AddAPIPath_PartnerUserIDDocument = "api/PartnerUser_IDDocument/Add";
export const UpdateAPIPath_PartnerUserIDDocument = "api/PartnerUser_IDDocument/Update";
export const DeleteAPIPath_PartnerUserIDDocument = "api/PartnerUser_IDDocument/Delete";

/*******************************************************************************************************/

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        validatonList: []
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtUserName",
        label: "Tên truy cập người dùng:",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "UserName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "txtPartnerID",
        label: "Nhà cung cấp:",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName"
    },
    {
        type: "password",
        name: "txtPassWord",
        label: "Mật khẩu:",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PassWord",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "password",
        name: "txtPassWordConfirm",
        label: "Xác nhận mật khẩu:",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PassWordConfirm",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkShowPassWord",
        label: "Hiển thị mật khẩu:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "",
        validatonList: []
    },
    {
        type: "text",
        name: "txtFullName",
        label: "Họ tên đầy đủ:",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "FullName",
        readonly: false,
        validatonList: ["required"]
    },
    // {
    //     type: "text",
    //     name: "txtFirstName",
    //     label: "Tên:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "FirstName",
    //     readonly: false,
    //     validatonList: []
    // },
    // {
    //     type: "text",
    //     name: "txtLastName",
    //     label: "Họ:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "LastName",
    //     readonly: false,
    //     validatonList: []
    // },
    {
        type: "text",
        name: "txtPhoneNumber",
        label: "Điện thoại:",
        value: "",
        maxSize: "11",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PhoneNumber",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "text",
        name: "dtBirthday",
        label: "Ngày sinh:",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "Birthday",
        ValueMember: "Birthday",
        NameMember: "Birthday",
        validatonList: ["date"]
    },
    {
        type: "text",
        name: "txtEmail",
        label: "Email:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "Email",
        readonly: false,
        validatonList: ["Email"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        placeholder: "Mô tả",
        maxSize: "2000",
        icon: "",
        rows: "6",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: true,
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtUserName",
        label: "Tên truy cập người dùng:",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "UserName",
        readonly: true,
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "txtPartnerID",
        label: "Nhà cung cấp:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName"
    },
    {
        type: "password",
        name: "txtPassWord",
        label: "Mật khẩu:",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "",
        readonly: false,
        validatonList: []
    },
    {
        type: "password",
        name: "txtPassWordConfirm",
        label: "Xác nhận mật khẩu:",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkShowPassWord",
        label: "Hiển thị mật khẩu:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "",
        validatonList: []
    },
    {
        type: "text",
        name: "txtFullName",
        label: "Họ tên đầy đủ:",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "FullName",
        readonly: false,
        validatonList: []
    },
    // {
    //     type: "text",
    //     name: "txtFirstName",
    //     label: "Tên:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "FirstName",
    //     readonly: false,
    //     validatonList: []
    // },
    // {
    //     type: "text",
    //     name: "txtLastName",
    //     label: "Họ:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "LastName",
    //     readonly: false,
    //     validatonList: []
    // },
    {
        type: "text",
        name: "txtPhoneNumber",
        label: "Điện thoại:",
        value: "",
        maxSize: "11",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PhoneNumber",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "text",
        name: "dtBirthday",
        label: "Ngày sinh:",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "Birthday",
        ValueMember: "Birthday",
        NameMember: "Birthday",
        validatonList: ["date"]
    },
    {
        type: "text",
        name: "txtEmail",
        label: "Email:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "Email",
        readonly: false,
        validatonList: ["Email"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        placeholder: "Mô tả",
        icon: "",
        rows: "6",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "IsActived",
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "IsSystem",
        validatonList: []
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition = [
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "txtUserName",
        DataSourceMember: "UserName"
    },
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "txtPartnerID",
        DataSourceMember: "PartnerID"
    },
    {
        Name: "PassWord",
        DefaultValue: "",
        BindControlName: "txtPassWord",
        DataSourceMember: "PassWord"
    },
    {
        Name: "FullName",
        DefaultValue: "",
        BindControlName: "txtFullName",
        DataSourceMember: "FullName"
    },
    {
        Name: "FirstName",
        DefaultValue: "",
        BindControlName: "txtFirstName",
        DataSourceMember: "FirstName"
    },
    {
        Name: "LastName",
        DefaultValue: "",
        BindControlName: "txtLastName",
        DataSourceMember: "LastName"
    },
    {
        Name: "PhoneNumber",
        DefaultValue: "",
        BindControlName: "txtPhoneNumber",
        DataSourceMember: "PhoneNumber"
    },
    {
        Name: "Birthday",
        DefaultValue: "",
        BindControlName: "dtBirthday",
        DataSourceMember: "Birthday"
    },
    {
        Name: "Email",
        DefaultValue: "",
        BindControlName: "txtEmail",
        DataSourceMember: "Email"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUserFullName"
    },
    {
        Name: "UpdatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "UpdatedUser"
    },
    {
        Name: "LstMcUser_Role",
        DefaultValue: {},
        BindControlName: "LstMcUser_Role",
        DataSourceMember: "LstMcUser_Role"
    }

];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "UserName",
        Width: 100
    },
    {
        Name: "UserName",
        Type: "text",
        Caption: "Tên người dùng",
        DataSourceMember: "UserName",
        Width: 200
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Họ tên",
        DataSourceMember: "FullName",
        Width: 250
    },
    {
        Name: "PartnerName",
        Type: "text",
        Caption: "Tên nhà cung cấp",
        DataSourceMember: "PartnerName",
        Width: 800
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 200
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "UserName",
        Width: 200,
        Link: "/PartnerUser/edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const GridMLPartnerRoleDefinition = [
    {
        Name: "PartnerRoleID",
        DefaultValue: "",
        BindControlName: "PartnerRoleID",
        DataSourceMember: "PartnerRoleID"
    },
    {
        Name: "PartnerRoleName",
        DefaultValue: "",
        BindControlName: "PartnerRoleName",
        DataSourceMember: "PartnerRoleName"
    }
];

export const InputPartnerRoleColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "PartnerRoleID",
        Width: 70
    },
    {
        Name: "PartnerRoleID",
        Type: "text",
        Caption: "Mã vai trò",
        DataSourceMember: "PartnerRoleID",
        Width: 150
    },
    {
        Name: "PartnerRoleName",
        Type: "text",
        Caption: "Tên vai trò",
        DataSourceMember: "PartnerRoleName",
        Width: 700
    }
];

//model
export const SearchMLmoldeDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const SearchElementModeList = [
    {
        type: "textType",
        name: "txtKeyword",
        label: "",
        value: "",
        placeholder: "Từ khóa ",
        icon: "",
        listoption: {}
    }
];

export const InitSearchParamsModeList = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const DataGridColumnListMultiple = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PartnerRoleID",
        Width: 70
    },
    {
        Name: "PartnerRoleID",
        Type: "text",
        Caption: "Mã vai trò",
        DataSourceMember: "PartnerRoleID",
        Width: 150
    },
    {
        Name: "PartnerRoleName",
        Type: "text",
        Caption: "Tên vai trò",
        DataSourceMember: "PartnerRoleName",
        Width: 700
    }

];


//------------- giấy tờ tùy thân người dùng -----------------------------------------------

export const Modal_PartnerUserIDDocument_Add = [
    {
        type: "select",
        Name: "IDDocumentTypeID",
        label: "Loại giấy tờ tùy thân",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "IDDocumentTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.IDDOCUMENTTYPE",
        ValueMember: "IDDocumentTypeID",
        NameMember: "IDDocumentTypeName"
    },
    {
        Name: "IDDocumentNumber",
        type: "text",
        label: "Số giấy tờ tùy thân",
        maxSize: "19",
        DataSourceMember: "IDDocumentNumber",
        readonly: false,
        validatonList: []
    },
    {
        Name: "FullNameOnIDDocument",
        type: "text",
        label: "Tên trên giấy tờ tùy thân",
        maxSize: "200",
        DataSourceMember: "FullNameOnIDDocument",
        readonly: false,
        validatonList: []
    },
    {
        type: "singleFileUpload",
        Name: "FrontIDDocumentImageURL",
        NameMember: "FrontIDDocumentImageURL",
        label: "Ảnh mặt trước giấy tờ tùy thân",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "FrontIDDocumentImageURL",
        readonly: false,
        validatonList: []
    },
    {
        type: "singleFileUpload",
        Name: "BackSideIDDocumentImageURL",
        NameMember: "BackSideIDDocumentImageURL",
        label: "Ảnh mặt sau giấy tờ tùy thân",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "BackSideIDDocumentImageURL",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IDDocumentImageFormatName",
        type: "text",
        label: "Tên định dạng giấy tờ tùy thân",
        maxSize: "50",
        DataSourceMember: "IDDocumentImageFormatName",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];


export const Modal_PartnerUserIDDocument_Edit = [
    {
        type: "select",
        Name: "IDDocumentTypeID",
        label: "Loại giấy tờ tùy thân",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "IDDocumentTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.IDDOCUMENTTYPE",
        ValueMember: "IDDocumentTypeID",
        NameMember: "IDDocumentTypeName"
    },
    {
        Name: "IDDocumentNumber",
        type: "text",
        label: "Số giấy tờ tùy thân",
        maxSize: "19",
        DataSourceMember: "IDDocumentNumber",
        readonly: false,
        validatonList: []
    },
    {
        Name: "FullNameOnIDDocument",
        type: "text",
        label: "Tên trên giấy tờ tùy thân",
        maxSize: "200",
        DataSourceMember: "FullNameOnIDDocument",
        readonly: false,
        validatonList: []
    },
    {
        type: "singleFileUpload",
        Name: "FrontIDDocumentImageURL",
        NameMember: "FrontIDDocumentImageURL",
        label: "Ảnh mặt trước giấy tờ tùy thân",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "FrontIDDocumentImageURL",
        readonly: false,
        validatonList: []
    },
    {
        type: "singleFileUpload",
        Name: "BackSideIDDocumentImageURL",
        NameMember: "BackSideIDDocumentImageURL",
        label: "Ảnh mặt sau giấy tờ tùy thân",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "BackSideIDDocumentImageURL",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IDDocumentImageFormatName",
        type: "text",
        label: "Tên định dạng giấy tờ tùy thân",
        maxSize: "50",
        DataSourceMember: "IDDocumentImageFormatName",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];

export const PartnerUserIDDocument_DataGrid_ColumnList = [
    {
        Name: "chkSelectIDDocumentID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "IDDocumentID",
        Width: 50
    },
    {
        Name: "IDDocumentNumber",
        Type: "text",
        Caption: "Số giấy tờ tùy thân",
        DataSourceMember: "IDDocumentNumber",
        Width: 200
    },
    {
        Name: "FullNameOnIDDocument",
        Type: "text",
        Caption: "Tên trên giấy tờ tùy thân",
        DataSourceMember: "FullNameOnIDDocument",
        Width: 160
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
    {
        Name: "EditIDDocumentID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "IDDocumentID",
        Width: 100
    }

];

export const MLObject_PartnerUserIDDocument = [
    {
        Name: "IDDocumentID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "IDDocumentID"
    },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "UserName",
        DataSourceMember: "UserName"
    },
    {
        Name: "IDDocumentTypeID",
        DefaultValue: "",
        BindControlName: "IDDocumentTypeID",
        DataSourceMember: "IDDocumentTypeID"
    },
    {
        Name: "IDDocumentNumber",
        DefaultValue: "",
        BindControlName: "IDDocumentNumber",
        DataSourceMember: "IDDocumentNumber",
        // Label: "Kiểu lấy chi phí",
        // ValidationList: ["required"]
    },
    {
        Name: "FullNameOnIDDocument",
        DefaultValue: "",
        BindControlName: "FullNameOnIDDocument",
        DataSourceMember: "FullNameOnIDDocument"
    },
    {
        Name: "FrontIDDocumentImageURL",
        DefaultValue: "",
        BindControlName: "FrontIDDocumentImageURL",
        DataSourceMember: "FrontIDDocumentImageURL"
    },
    {
        Name: "BackSideIDDocumentImageURL",
        DefaultValue: "",
        BindControlName: "BackSideIDDocumentImageURL",
        DataSourceMember: "BackSideIDDocumentImageURL"
    },
    {
        Name: "IDDocumentImageFormatName",
        DefaultValue: "",
        BindControlName: "IDDocumentImageFormatName",
        DataSourceMember: "IDDocumentImageFormatName"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedDate",
        DefaultValue: "",
        BindControlName: "CreatedDate",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    }
];
