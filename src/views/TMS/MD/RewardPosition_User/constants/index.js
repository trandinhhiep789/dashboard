export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/User_RewardPosition/Search";
export const SearchAPISearchUser = "api/User_RewardPosition/SearchUser";
export const LoadAPIPath = "api/User_RewardPosition/Load";
export const AddAPIPath = "api/User_RewardPosition/Add";
export const AddByFileAPIPath = "api/User_RewardPosition/AddByFile";
export const UpdateAPIPath = "api/User_RewardPosition/Update";
export const DeleteAPIPath = "api/User_RewardPosition/Delete";
export const DeleteUserAPIPath = "api/User_RewardPosition/DeleteUser";
export const GetAllByUserNameAPIPath = "api/User_RewardPosition/GetAllByUserName";
export const GetAllAPIPath = "api/User_RewardPosition/GeAllUserRewardPosition";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Vị trí thưởng của một nhân viên" }
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

