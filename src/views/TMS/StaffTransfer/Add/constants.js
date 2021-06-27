export const APIHostName = "TMSAPI";
export const APILoadInfo = "api/StaffTransfer/LoadNew";

export const BackLink = "/StaffTransfer"

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/StaffTransfer", Title: "Danh sách loại hình thuyên chuyển nhân viên" },
    { Link: "", Title: "Thêm" }
];

export const MLObjectDefinition = [
    {
        Name: "StaffTransferID",
        DefaultValue: "",
        BindControlName: "txtStaffTransferID",
        DataSourceMember: "StaffTransferID"
    },
    {
        Name: "StaffTransferTypeID",
        DefaultValue: "",
        BindControlName: "cboStaffTransferTypeID",
        DataSourceMember: "StaffTransferTypeID"
    },
    {
        Name: "StaffTransferTitle",
        DefaultValue: "",
        BindControlName: "txtStaffTransferTitle",
        DataSourceMember: "StaffTransferTitle"
    },
    {
        Name: "RequestStoreID",
        DefaultValue: "",
        BindControlName: "cboRequestStore",
        DataSourceMember: "RequestStoreID"
    },
    {
        Name: "RequestDate",
        DefaultValue: "",
        BindControlName: "dtRequestDate",
        DataSourceMember: "RequestDate"
    },
    {
        Name: "RequestUser",
        DefaultValue: "",
        BindControlName: "RequestUser",
        DataSourceMember: "RequestUser"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    }
];