export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PartnerPriviledgeGroup/Search";
export const LoadAPIPath = "api/PartnerPriviledgeGroup/Load";
export const AddAPIPath = "api/PartnerPriviledgeGroup/Add";
export const UpdateAPIPath = "api/PartnerPriviledgeGroup/Update";
export const DeleteAPIPath = "api/PartnerPriviledgeGroup/Delete";
export const UpdateOrderAPIPath = "api/PartnerPriviledgeGroup/UpdateOrder";
export const BackLink = "/PartnerPriviledgeGroup";
export const AddLink = "/PartnerPriviledgeGroup/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PartnerPriviledgeGroupID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Danh sách nhóm quyền nhà cung cấp" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PartnerPriviledgeGroup", Title: "Danh sách nhóm quyền nhà cung cấp" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PartnerPriviledgeGroup", Title: "Danh sách nhóm quyền nhà cung cấp" },
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
        name: "txtPartnerPriviledgeGroupName",
        label: "tên nhóm quyền:",
        value: "",
        maxSize: "700",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerPriviledgeGroupName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "1900",
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
        name: "txtPartnerPriviledgeGroupID",
        label: "mã nhóm quyền:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: true,
        DataSourceMember: "PartnerPriviledgeGroupID",
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtPartnerPriviledgeGroupName",
        label: "tên nhóm quyền:",
        value: "",
        maxSize: "700",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "PartnerPriviledgeGroupName",
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "1900",
        placeholder: "Mô tả",
        icon: "",
        rows: "6",
        listoption: [],
        readonly: false,
        DataSourceMember: "Description",
        validatonList: []
    },
    {
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
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
        Name: "PartnerPriviledgeGroupID",
        DefaultValue: "",
        BindControlName: "txtPartnerPriviledgeGroupID",
        DataSourceMember: "PartnerPriviledgeGroupID"
    },
    {
        Name: "PartnerPriviledgeGroupName",
        DefaultValue: "",
        BindControlName: "txtPartnerPriviledgeGroupName",
        DataSourceMember: "PartnerPriviledgeGroupName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
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
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PartnerPriviledgeGroupID",
        Width: 70
    },
    {
        Name: "PartnerPriviledgeGroupID",
        Type: "text",
        Caption: "Mã nhóm quyền",
        DataSourceMember: "PartnerPriviledgeGroupID",
        Width: 100
    },
    {
        Name: "PartnerPriviledgeGroupName",
        Type: "text",
        Caption: "Tên nhóm quyền",
        DataSourceMember: "PartnerPriviledgeGroupName",
        Width: 350
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 100
    },
    {
        Name: "CreatedFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "PartnerPriviledgeGroupID",
        Width: 70,
        Link: "/PartnerPriviledgeGroup/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
