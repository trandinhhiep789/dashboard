export const APIHostName = "TMSAPI";
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
export const CreateUserNameAPIPath = "api/PartnerUser/CreateNewUserID";
import { CDN_LOGO_IMAGE } from '../../../../../../constants/systemVars';

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerUser", Title: "Khai báo user đối tác" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerUser", Title: "Khai báo user đối tác" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerUser", Title: "Khai báo user đối tác" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerUser", Title: "Khai báo user đối tác" },
    { Link: "", Title: "Chi tiết" }
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
    },
    {
        SearchKey: "@PartnerID",
        SearchValue: -1
    }
   
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "cbPartnerID"
    },
];

export const SearchElementList = [

    {
        type: "text",
        name: "txtKeyword",
        DataSourceMember: "Keyword",
        label: "Từ khóa",
        value: "",
        colspan: 2,
        placeholder: "số điện thoại/mã user",
        icon: ""
    },
    {
        type: "ComboBox",
        name: "cbPartnerID",
        DataSourceMember: "PartnerID",
        label: "Chọn đối tác",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName"

    },

    // {
    //     type: "text",
    //     name: "txtKeyword",
    //     label: "Từ khóa:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     validatonList: []
    // },
    // {
    //     type: "multiselect",
    //     name: "txtPartnerID",
    //     label: "Nhà cung cấp:",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "PartnerID",
    //     readonly: false,
    //     validatonList: [],
    //     isMulti: false,
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
    //     ValueMember: "PartnerID",
    //     NameMember: "PartnerName"
    // },
];

export const AddElementList = [
    {
        type: "text",
        Name: "txtUserName",
        label: "tên truy cập người dùng:",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "UserName",
        readonly: true,
        validatonList: []
    },
    // {
    //     type: "button",
    //     name: "btnCreateUserName",
    //     label: "Lấy tên đăng nhập",
    //     value: "",
    //     maxSize: "20",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "",
    //     readonly: false,
    //     validatonList: []
    // },
    {
        type: "multiselect",
        Name: "txtPartnerID",
        label: "Nhà cung cấp:",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName"
    },
    {
        type: "password",
        Name: "txtPassWord",
        label: "mật khẩu:",
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
        Name: "txtPassWordConfirm",
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
        Name: "chkShowPassWord",
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
        Name: "txtFullName",
        label: "họ tên đầy đủ:",
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
        Name: "txtPhoneNumber",
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
        Name: "dtBirthday",
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
        Name: "txtEmail",
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
        Name: "txtDescription",
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
        Name: "chkIsActived",
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
        Name: "chkIsSystem",
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
        label: "tên truy cập người dùng:",
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
        type: "multiselect",
        name: "txtPartnerID",
        label: "Nhà cung cấp:",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName",
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



export const ModalColumnList_Insert = [
    {
        type: "text",
        Name: "UserName",
        label: "tên truy cập người dùng:",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "UserName",
        readonly: true,
        validatonList: []
    },
    // {
    //     type: "button",
    //     name: "btnCreateUserName",
    //     label: "Lấy tên đăng nhập",
    //     value: "",
    //     maxSize: "20",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "",
    //     readonly: false,
    //     validatonList: []
    // },
    {
        type: "multiselect",
        Name: "PartnerID",
        label: "Nhà cung cấp:",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName"
    },
    {
        type: "password",
        Name: "PassWord",
        label: "mật khẩu:",
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
        Name: "PassWordConfirm",
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
        Name: "ShowPassWord",
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
        Name: "FullName",
        label: "họ tên đầy đủ:",
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
        Name: "PhoneNumber",
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
        Name: "Birthday",
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
        Name: "txtEmail",
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
        Name: "Description",
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
        Name: "IsActived",
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
        Name: "IsSystem",
        label: "Hệ thống:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        validatonList: []
    }
];

export const ModalColumnList_Edit = [
    {
        type: "text",
        Name: "UserName",
        label: "tên truy cập người dùng:",
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
        type: "multiselect",
        Name: "PartnerID",
        label: "Nhà cung cấp:",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName",
    },
    {
        type: "password",
        Name: "PassWord",
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
        Name: "PassWordConfirm",
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
        Name: "ShowPassWord",
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
        Name: "FullName",
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
        Name: "PhoneNumber",
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
        Name: "Birthday",
        label: "Ngày sinh:",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "Birthday",
        validatonList: ["date"]
    },
    {
        type: "text",
        Name: "Email",
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
        Name: "Description",
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
        Name: "IsActived",
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
        Name: "IsSystem",
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
        DataSourceMember: "UpdatedUserFullName"
    },
    {
        Name: "LstMcUser_Role",
        DefaultValue: {},
        BindControlName: "LstMcUser_Role",
        DataSourceMember: "LstMcUser_Role"
    }

];


export const Modal_MLObjectDefinition = [
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "UserName",
        DataSourceMember: "UserName"
    },
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "PartnerID",
        DataSourceMember: "PartnerID"
    },
    {
        Name: "PassWord",
        DefaultValue: "",
        BindControlName: "PassWord",
        DataSourceMember: "PassWord"
    },
    {
        Name: "FullName",
        DefaultValue: "",
        BindControlName: "FullName",
        DataSourceMember: "FullName"
    },
    {
        Name: "FirstName",
        DefaultValue: "",
        BindControlName: "FirstName",
        DataSourceMember: "FirstName"
    },
    {
        Name: "LastName",
        DefaultValue: "",
        BindControlName: "LastName",
        DataSourceMember: "LastName"
    },
    {
        Name: "PhoneNumber",
        DefaultValue: "",
        BindControlName: "PhoneNumber",
        DataSourceMember: "PhoneNumber"
    },
    {
        Name: "Birthday",
        DefaultValue: "",
        BindControlName: "Birthday",
        DataSourceMember: "Birthday"
    },
    {
        Name: "Email",
        DefaultValue: "",
        BindControlName: "Email",
        DataSourceMember: "Email"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "IsSystem",
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
        DataSourceMember: "UpdatedUserFullName"
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
    // {
    //     Name: "UserName",
    //     Type: "texttolink",
    //     Link: "/PartnerUser/Detail/",
    //     Caption: "Tên người dùng",
    //     DataSourceMember: "UserName",
    //     Width: 200
    // },
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
        Name: "PhoneNumber",
        Type: "text",
        Caption: "Điện thoại",
        DataSourceMember: "PhoneNumber",
        Width: 150
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
    // {
    //     Name: "UserName",
    //     Type: "edit",
    //     Caption: "Sửa",
    //     DataSourceMember: "UserName",
    //     Width: 80
    // }
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
        validatonList: ["number"]
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
        validatonList: ["number"]
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
        Name: "IDDocumentTypeName",
        Type: "text",
        Caption: "Loại giấy tờ tùy thân",
        DataSourceMember: "IDDocumentTypeName",
        Width: 150
    },
    {
        Name: "IDDocumentNumber",
        Type: "text",
        Caption: "Số giấy tờ tùy thân",
        DataSourceMember: "IDDocumentNumber",
        Width: 150
    },
    {
        Name: "FullNameOnIDDocument",
        Type: "text",
        Caption: "Tên trên giấy tờ tùy thân",
        DataSourceMember: "FullNameOnIDDocument",
        Width: 200
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
        Name: "IDDocumentTypeName",
        DefaultValue: "",
        BindControlName: "IDDocumentTypeName",
        DataSourceMember: "IDDocumentTypeName"
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
