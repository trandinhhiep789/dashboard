export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ServicePriceTable/Search";
export const LoadAPIPath = "api/ServicePriceTable/Load";
export const AddAPIPath = "api/ServicePriceTable/Add";
export const UpdateAPIPath = "api/ServicePriceTable/Update";
export const DeleteAPIPath = "api/ServicePriceTable/Delete";
export const BackLink = "/ServicePriceTable";
export const AddLink = "/ServicePriceTable/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ServicePriceTableID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách bảng giá dịch vụ" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServicePriceTable", Title: "Danh sách bảng giá dịch vụ" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServicePriceTable", Title: "Danh sách bảng giá dịch vụ" },
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
        Name: "ServiceAgreementTypeID",
        DefaultValue: "",
        BindControlName: "txtServiceAgreementTypeID",
        DataSourceMember: "ServiceAgreementTypeID"
    },
    {
        Name: "ServiceAgreementTypeName",
        DefaultValue: "",
        BindControlName: "txtServiceAgreementTypeName",
        DataSourceMember: "ServiceAgreementTypeName"
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
        DataSourceMember: "ServiceAgreementTypeID",
        Width: 60
    },
    {
        Name: "ServiceAgreementTypeID",
        Type: "text",
        Caption: "Mã loại hợp đồng dịch vụ",
        DataSourceMember: "ServiceAgreementTypeID",
        Width: 200
    },
    {
        Name: "ServiceAgreementTypeName",
        Type: "text",
        Caption: "Tên loại hợp đồng dịch vụ",
        DataSourceMember: "ServiceAgreementTypeName",
        Width: 250
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        //Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
        Width: 140
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserFullName",
        Width: 140
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ServiceAgreementTypeID",
        Width: 100,
        Link: "/ServiceAgreementType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
