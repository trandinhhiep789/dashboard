export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/UserDebtLimit/Search";
export const SearchAPISearchUser = "api/UserDebtLimit/SearchUser";
export const LoadAPIPath = "api/UserDebtLimit/Load";
export const AddAPIPath = "api/UserDebtLimit/Add";
export const AddByFileAPIPath = "api/UserDebtLimit/AddByFile";
export const UpdateAPIPath = "api/UserDebtLimit/Update";
export const DeleteAPIPath = "api/UserDebtLimit/Delete";
export const DeleteUserAPIPath = "api/UserDebtLimit/DeleteUser";
export const GetAllByUserNameAPIPath = "api/UserDebtLimit/GetAllByUserName";
export const GetAllAPIPath = "api/UserDebtLimit/GeAllUserRewardPosition";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Hạn mức công nợ theo nhân viên" }
];



export const schema = {
    'Mã người dùng': {
        prop: 'UserName',
        type: String,
        required: true
    },
    'Mã vị trí thưởng': {
        prop: 'RewardPositionID',
        type: Number
    },
    'Hệ thống': {
        prop: 'IsSystem',
        type: Number
    },
}

export const DataTemplateExport = [
    {
        "Mã người dùng": '98138',
        "Mã vị trí thưởng": 1,
        "Hệ thống": 0
    }
];

