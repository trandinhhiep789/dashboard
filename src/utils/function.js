export const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",", symbolSign) => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";
        const currencySymbol = symbolSign ? symbolSign : ""
        let amountConvert = amount.toString().replace(new RegExp(thousands, 'g'), "")
        let i = parseInt(amountConvert = Math.abs(Number(amountConvert) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
        return currencySymbol + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amountConvert - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};

export const formatNumber = (num) => {
    if(num != undefined && num != ''){
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    else{
        return num
    }
    
}