export const DataGridColumnList = [

    {
        Name: "ContentTypeName",
        Type: "text",
        Caption: "Loại nội dung",
        readonly: true,
        DataSourceMember: "ContentTypeName",
        Width: 300
    },
    {
        Name: "LanguageName",
        Type: "text",
        readonly: true,
        Caption: "Ngôn ngữ",
        DataSourceMember: "LanguageName",

        Width: 300
    },
    {
        Name: "txtContentDescription",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "ContentDescription",
        Width: 250
    },
];