export const APIHostName = "TMSAPI";
export const LoadInfoEdit = "api/StaffTransfer/LoadInfoEdit";
export const APIUpdate = "api/StaffTransfer/Update";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/StaffTransfer", Title: "Danh sách loại hình thuyên chuyển nhân viên" },
    { Link: "/", Title: "Cập nhật" }
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
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
]