export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PartnerPriviledge/Search";
export const LoadAPIPath = "api/PartnerPriviledge/Load";
export const AddAPIPath = "api/PartnerPriviledge/Add";
export const UpdateAPIPath = "api/PartnerPriviledge/Update";
export const DeleteAPIPath = "api/PartnerPriviledge/Delete";
export const UpdateOrderAPIPath = "api/PartnerPriviledge/UpdateOrder";
export const BackLink = "/PartnerPriviledge";
export const AddLink = "/PartnerPriviledge/add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PartnerPriviledgeID";

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@PartnerPriviledgeGroupID",
        SearchValue: -1
    }
];
export const PagePath = [
    { Link: "/home/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách quyền nhà cung cấp" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerPriviledge", Title: "Danh sách quyền nhà cung cấp" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home"},
    { Link: "/PartnerPriviledge", Title: "Danh sách quyền nhà cung cấp" },
    { Link: "", Title: "Thêm" }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    },
    {
        type: "select",
        name: "txtPartnerPriviledgeGroupID",
        label: "Nhóm quyền:",
        value: -1,
        listoption: [],
        css: "col-md-4",
        DataSourceMember: "PartnerPriviledgeGroupID",
        isCategory: true,
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNERPRIVILEDGEGROUP",
        ValueMember: "PartnerPriviledgeGroupID",
        NameMember: "PartnerPriviledgeGroupName"
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "PartnerPriviledgeGroupID",
        DefaultValue: "",
        BindControlName: "txtPartnerPriviledgeGroupID"
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtPartnerPriviledgeID",
        label: "mã quyền",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerPriviledgeID",
        readonly: false,
        validatonList: ["required","touppercase"]
    },
    {
        type: "select",
        name: "selPartnerPriviledgeGroupID",
        label: "Mã nhóm quyền:",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerPriviledgeGroupID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNERPRIVILEDGEGROUP",
        ValueMember: "PartnerPriviledgeGroupID",
        NameMember: "PartnerPriviledgeGroupName"
    },
    {
        type: "text",
        name: "txtPartnerPriviledgeName",
        label: "tên quyền",
        value: "",
        maxSize: "800",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerPriviledgeName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "1900",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: 0,
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: true,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsActived",
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsSystem",
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtPartnerPriviledgeID",
        label: "Mã quyền",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerPriviledgeID",
        readonly: true,
        validatonList: ["required","touppercase"]
    },
    {
        type: "select",
        name: "selPartnerPriviledgeGroupID",
        label: "Mã nhóm quyền:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerPriviledgeGroupID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNERPRIVILEDGEGROUP",
        ValueMember: "PartnerPriviledgeGroupID",
        NameMember: "PartnerPriviledgeGroupName"
    },
    {
        type: "text",
        name: "txtPartnerPriviledgeName",
        label: "Tên quyền",
        value: "",
        maxSize: "800",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerPriviledgeName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
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
        listoption: {},
        readonly: false,
        DataSourceMember: "IsSystem",
        validatonList: []
    }
];


export const MLObjectDefinition = [
    {
        Name: "PartnerPriviledgeID",
        DefaultValue: "",
        BindControlName: "txtPartnerPriviledgeID",
        DataSourceMember: "PartnerPriviledgeID"
    },
    {
        Name: "PartnerPriviledgeGroupID",
        DefaultValue: "",
        BindControlName: "selPartnerPriviledgeGroupID",
        DataSourceMember: "PartnerPriviledgeGroupID"
    },
    {
        Name: "PartnerPriviledgeGroupName",
        DefaultValue: "",
        BindControlName: "txtPartnerPriviledgeGroupName",
        DataSourceMember: "PartnerPriviledgeGroupName"
    },
    {
        Name: "PartnerPriviledgeName",
        DefaultValue: "",
        BindControlName: "txtPartnerPriviledgeName",
        DataSourceMember: "PartnerPriviledgeName"
    },

    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "0",
        BindControlName: "txtOrderIndex",
        DataSourceMember: "OrderIndex"
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
        Name: "CreatedUserFullName",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUserFullName"
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
        Name: "LoginLogID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: ""
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PartnerPriviledgeID",
        Width: 60
    },
    {
        Name: "PartnerPriviledgeID",
        Type: "text",
        Caption: "Mã  quyền",
        DataSourceMember: "PartnerPriviledgeID",
        Width: 100
    },
    {
        Name: "PartnerPriviledgeName",
        Type: "text",
        Caption: "Tên quyền",
        DataSourceMember: "PartnerPriviledgeName",
        Width: 150
    },
    {
        Name: "PartnerPriviledgeGroupName",
        Type: "text",
        Caption: "Tên nhóm quyền",
        DataSourceMember: "PartnerPriviledgeGroupName",
        Width: 150
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "PartnerPriviledgeID",
        Width: 80,
        Link: "/PartnerPriviledge/edit/",
        LinkText: "Chỉnh sửa"
    }
];
