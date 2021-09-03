export function transform1To2Column(inputArray) {

    let resultArray = [];
    const itemCount = parseInt(Math.floor(inputArray.length / 2));
    for (let i = 0; i < itemCount; i++) {
        const Item = {
            Item1: inputArray[i * 2],
            Item2: inputArray[i * 2 + 1]
        }
        resultArray[i] = Item;
    }
    if (itemCount * 2 < inputArray.length) {
        const Item = {
            Item1: inputArray[inputArray.length - 1],
            Item2: {}
        }
        resultArray[itemCount] = Item;

    }
    return resultArray;
}

export function transform1To3Column(inputArray) {

    let resultArray = [];
    const itemCount = parseInt(Math.floor(inputArray.length / 3));
    for (let i = 0; i < itemCount; i++) {
        const Item = {
            Item1: inputArray[i * 3],
            Item2: inputArray[i * 3 + 1],
            Item3: inputArray[i * 3 + 2]
        }
        resultArray[i] = Item;
    }
    if (itemCount * 3 < inputArray.length) {

        const Item = {
            Item1: inputArray[itemCount * 3],
            Item2: {},
            Item3: {}
        }

        if (itemCount * 3 + 1 < inputArray.length) {
            Item.Item2 = inputArray[itemCount * 3 + 1]
        }
        resultArray[itemCount] = Item;

    }
    return resultArray;
}

export function bindDataToControl(listElement, dataSource) {
    let listElement1 = listElement;

    if (typeof dataSource != "undefined") {
        listElement1 = listElement.map((elementItem) => {

            const elementvalue = dataSource[elementItem.DataSourceMember];
            if (typeof elementvalue != "undefined") {
                const newElementItem = Object.assign({}, elementItem, { value: elementvalue });
                return newElementItem;
            }
            return elementItem;
        });
    }

    return listElement1;
}

export function GetMLObjectData(mLObjectDefinition, formData, dataSource) {

    let MLObject = {};

    if (typeof dataSource != "undefined") {
        mLObjectDefinition.map((Item) => {
            if (dataSource[Item.DataSourceMember] != null) {
                MLObject = Object.assign({}, MLObject, { [Item.Name]: dataSource[Item.DataSourceMember] });
            }
        });
    }

    mLObjectDefinition.map((Item) => {
        const controlName = Item.BindControlName;

        if (controlName.length > 0) {
            if (formData[controlName] != null) {
                MLObject = Object.assign({}, MLObject, { [Item.Name]: formData[controlName] });
            }
            else {

            }
        }
    });

    return MLObject;
}
export function GetMLObjectObjData(mLObjectDefinition, formData, dataSource) {

    let MLObject = {};
    if (typeof dataSource != "undefined") {
        mLObjectDefinition.map((Item) => {
            if (dataSource[Item.DataSourceMember] != null) {
                MLObject = Object.assign({}, MLObject, { [Item.Name]: dataSource[Item.DataSourceMember] });
            }


        });
    }
    mLObjectDefinition.map((Item) => {
        const controlName = Item.BindControlName;
        if (controlName.length > 0) {
            if (formData[controlName] != null) {
                MLObject = Object.assign({}, MLObject, { [Item.Name]: formData[controlName].value });
            }
        }
    });

    return MLObject;
}


export function GetModalFormData(mLObjectDefinition, formData, dataSource) {

    let ModalForm = {};

    if (typeof dataSource != "undefined") {
        mLObjectDefinition.map((Item) => {

            if (dataSource[Item.DataSourceMember] != null) {

                ModalForm = Object.assign({}, ModalForm, { [Item.Name]: dataSource[Item.DataSourceMember] });
            }


        });
    }

    mLObjectDefinition.map((Item) => {
        const controlName = Item.BindControlName;

        if (controlName.length > 0) {
            if (formData[controlName] != null) {
                ModalForm = Object.assign({}, ModalForm, { [Item.Name]: formData[controlName] });
            }
            else {

            }

        }
    });

    return ModalForm;
}

export function GetMLObjectDataList(mLObjectDefinition, formData, dataSource) {

    let MLObjectList = [];
    let arrayLength = 0;
    Object.keys(formData).forEach(function (key) {
        if (formData[key]) {
            const templength = Object.keys(formData[key]).length;
            if (templength > arrayLength) {
                arrayLength = templength;
            }
        }

    });

    if (dataSource != null) {
        if (dataSource.length > arrayLength)
            arrayLength = dataSource.length;
    }

    for (let i = 0; i < arrayLength; i++) {
        let MLObject = {};
        mLObjectDefinition.map((Item) => {
            const controlName = Item.BindControlName;

            if (dataSource != null) {
                if (dataSource[i] != null) {
                    if (dataSource[i][Item.DataSourceMember] != null) {
                        MLObject = Object.assign({}, MLObject, { [Item.Name]: dataSource[i][Item.DataSourceMember] });
                    }
                }
            }
            if (controlName.length > 0) {


                if (formData[controlName] != null) {
                    if (formData[controlName][i] != null) {
                        MLObject = Object.assign({}, MLObject, { [Item.Name]: formData[controlName][i].Value });
                    }

                }
                else {

                }

            }
        });
        if (!isEmpty(MLObject))
            MLObjectList.push(MLObject);

    }



    return MLObjectList;
}

export function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}