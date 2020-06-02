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
export const SearchPartnerRoleAPIPath = "api/PartnerRole/Search";

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
        value: new Date(),
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
        placeholder: "*********",
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
        placeholder: "*********",
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
        value: new Date(),
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
