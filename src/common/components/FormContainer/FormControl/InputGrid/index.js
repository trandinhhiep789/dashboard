import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { showModal } from '../../../../../actions/modal';
import ModelContainer from "../../../../components/Modal/ModelContainer";
import { connect } from 'react-redux';
import { MessageModal } from "../../../Modal";
import InputGridCell from "./InputGridCell";
import { GetMLObjectData, GetMLObjectDataList } from "../../../../library/form/FormLib";
import { callGetCache } from "../../../../../actions/cacheAction";
import { DEFAULT_ROW_PER_PAGE } from "../../../../../constants/systemVars.js";
import InputGridPage from "./InputGridPage";
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../../../constants/functionLists";
import { ValidationField } from "../../../../library/validation.js";
import { MODAL_TYPE_CONFIRMATIONNEW, MODAL_TYPE_CONFICOMPONET } from '../../../../../constants/actionTypes';

class InputGridCom extends Component {
	static defaultProps = {
		componenttype: 'InputControl'
	}
	constructor(props) {
		super(props);
		this.onValueChange = this.onValueChange.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleInsertClick = this.handleInsertClick.bind(this);
		this.bindData = this.bindData.bind(this);
		this.renderInputGrid = this.renderInputGrid.bind(this);
		this.handleInsertClickEdit = this.handleInsertClickEdit.bind(this);
		this.checkAll = this.checkAll.bind(this);
		const gridData = this.bindData();
		const lstobjdelete = this.bindobjdelete(false);

		//check isSystem
		let isSystem = false;
		if (this.props.isSystem) {
			isSystem = true;
		}

		//auto close popup
		let autoCloseModal = false;
		if(this.props.autoCloseModal){
			autoCloseModal = true;
		}

		this.state = {
			GridData: gridData,
			IsCheckAll: false,
			lstobjDelete: lstobjdelete,
			listvalidationError: {},
			PageNumber: 1,
			IsSystem: isSystem,
			AutoCloseModal: autoCloseModal
		};
	}

	componentDidMount() {
		this.setState({ listvalidationError: this.props.listvalidationError })
	}
	handleCloseMessage() {
	}
	showMessage(message) {
		ModalManager.open(<MessageModal title="Thông báo"
			message={message} onRequestClose={() => true}
			onCloseModal={this.handleCloseMessage}
		/>);
	}

	//#region bind Data
	bindData() {
		const listColumn = this.props.listColumn;
		//const dataSource = this.props.dataSource;
		let dataSource = this.props.dataSource;
		if (this.props.value != null)
			dataSource = this.props.value;

		let gridData = {};
		if (dataSource == null)
			return gridData;
		dataSource.map((rowItem, rowIndex) => {
			let elementobject = {};
			listColumn.map((columnItem, index) => {
				const name = columnItem.Name;
				const value = rowItem[columnItem.DataSourceMember];
				const elementdata = { Name: name, Value: value, IsChecked: false };
				elementobject = Object.assign({}, elementobject, { [index]: elementdata });
			}
			);
			gridData = Object.assign({}, gridData, { [rowIndex]: elementobject });
		});
		//	 console.log("bindData gridData: ", gridData);
		return gridData;
	}
	bindobjdelete(Checked) {
		const listColumn = this.props.listColumn;
		const element = listColumn.filter(x => { return x.Name.toString().includes("chkSelect") })

		let listDataSourceMember = [];
		if (element && element.length > 0) {
			const dataSourceMember = element[0].DataSourceMember.split(',');
			listDataSourceMember = dataSourceMember.map(item => { return { key: item } });
		}

		let dataSource = this.props.dataSource;
		let lstobjdelete = {};
		dataSource.map((rowItem, rowIndex) => {
			let elementobject = { IsChecked: Checked };
			listDataSourceMember.map((obj, index) => {
				const elementdata = { [obj.key]: rowItem[obj.key] };
				elementobject = Object.assign(elementobject, elementdata);
			}
			);

			lstobjdelete = Object.assign({}, lstobjdelete, { [rowIndex]: elementobject });
		});
		return lstobjdelete;
	}
	bindobjdelete1(Checked, value) {
		const listColumn = this.props.listColumn;
		const element = listColumn.filter(x => { return x.Name.toString().includes("chkSelect") })
		let listDataSourceMember = [];
		if (element && element.length > 0) {
			const dataSourceMember = element[0].DataSourceMember.split(',');
			listDataSourceMember = dataSourceMember.map(item => { return { key: item } });
		}
		let lstobjdelete = {};
		value.map((rowItem, rowIndex) => {
			let elementobject = { IsChecked: Checked };
			listDataSourceMember.map((obj, index) => {
				const elementdata = { [obj.key]: rowItem[obj.key] };
				elementobject = Object.assign(elementobject, elementdata);
			}
			);

			lstobjdelete = Object.assign({}, lstobjdelete, { [rowIndex]: elementobject });
		});
		return lstobjdelete;
	}
	//#endregion bind Data

	//#region Delete
	checkAll = event => {
		if (event.target.checked) {
			const lstobjdelete = this.bindobjdelete(true);
			this.setState({ lstobjDelete: lstobjdelete, IsCheckAll: true });
		}
		else {
			const lstobjdelete = this.bindobjdelete(false);
			this.setState({ lstobjDelete: lstobjdelete, IsCheckAll: false });
		}
	};
	handleClick = (event, id) => {
		let elementobject = { IsChecked: event };
		elementobject = Object.assign({}, this.state.lstobjDelete[id], elementobject);
		let lstobjdelete = this.state.lstobjDelete;
		lstobjdelete = Object.assign({}, lstobjdelete, { [id]: elementobject });
		const temp = this.checkInput(lstobjdelete);
		this.setState({ lstobjDelete: lstobjdelete, IsCheckAll: temp });
	};

	checkInput(formValidation) {
		for (const key in formValidation) {
			if (!formValidation[key].IsChecked) {
				return false;
			}
		}
		return true;
	}
	checkInput1(formValidation) {
		for (const key in formValidation) {
			if (formValidation[key].IsChecked) {
				return false;
			}
		}
		return true;
	}
	handleDeleteClick() {
		let lstobjdelete = this.state.lstobjDelete;
		const temp = this.checkInput1(lstobjdelete);
		if (temp == true) {
			this.showMessage("Vui lòng chọn ít nhất một dòng cần xóa!");
			return;
		}
		let confir = 1;
		if ((typeof this.props.isUseConfirmMessage === "undefined") ||
			(typeof this.props.isUseConfirmMessage !== "undefined" && this.props.isUseConfirmMessage == true)) {
			confir = confirm("Bạn có chắc rằng muốn xóa ?");
		}
		if (confir == 1) {

			let dataSource = this.props.dataSource;
			if (this.props.value != null) {
				dataSource = this.props.value;
			}
			let dataSourcenew = dataSource.filter((person, index) => {
				if (lstobjdelete[index].IsChecked == false) { return person; }
			});
			if (this.props.onValueChange != null) {

				const mLObjectDefinition = this.props.MLObjectDefinition;
				const MLObjectList = GetMLObjectDataList(mLObjectDefinition, dataSourcenew, dataSourcenew);
				this.props.onValueChange(this.props.name, MLObjectList, this.props.controltype);
				const lstobjdelete = this.bindobjdelete1(false, dataSource);
				this.setState({ GridData: dataSourcenew, lstobjDelete: lstobjdelete, IsCheckAll: false });
			}
			if (this.props.onDeleteClick) {
				const aa = Object.assign([], lstobjdelete);
				this.props.onDeleteClick(aa.filter(n => n.IsChecked == true));
			}
		}

	}
	//#endregion Delete

	//#region onValueChange
	onValueChange(elementdata, index) {
		//	console.log("onValueChange  elementdata index", elementdata, index);
		const elementobject = Object.assign({}, this.state.GridData[elementdata.Name], { [index]: elementdata });
		//console.log("InputGridCom  elementobject ", elementobject);
		const gridData = Object.assign({}, this.state.GridData, { [elementdata.Name]: elementobject });
		//	console.log("InputGridCom  gridData ", gridData);
		let listvalidation = {};
		this.setState({
			GridData: gridData, IsCheckAll: false
		});

		if (typeof elementdata.validatonList != "undefined") {
			const validation = ValidationField(elementdata.validatonList, elementdata.Value, elementdata.cation)
			//console.log("validation ", validation);
			const validationObject = { IsValidatonError: validation.IsError, ValidationErrorMessage: validation.Message };
			let listvalidationrow = {};
			listvalidationrow = Object.assign({}, this.props.listvalidationError[index], { [elementdata.Name]: validationObject });
			listvalidation = Object.assign({}, this.props.listvalidationError, { [index]: listvalidationrow });
			//	console.log("validation ", listvalidation);
		}

		let dataSource = this.props.dataSource;
		if (this.props.value != null) {
			dataSource = this.props.value;
		}
		//	console.log("dataSource ", dataSource);
		if (this.props.onValueChange != null) {
			const mLObjectDefinition = this.props.MLObjectDefinition;
			const MLObjectList = GetMLObjectDataList(mLObjectDefinition, gridData, dataSource);
			//console.log("InputGridCom  onValueChange ", MLObjectList);
			//console.log("InputGridCom  mLObjectDefinition ", mLObjectDefinition);
			//	console.log("InputGridCom  onValueChange ", this.props.name, MLObjectList, this.props.controltype);
			this.props.onValueChange(this.props.name, MLObjectList, this.props.controltype, listvalidation);

		}
		//console.log("InputGrid onValueChange: ", gridData);

	}
	//#endregion onValueChange

	handleInsertClick() {
		if (this.props.Ispopup === undefined || this.props.Ispopup == false) {

			//#region Thêm trực tiếp 1 row
			let dataSource = this.props.dataSource;
			if (this.props.value != null) {
				dataSource = this.props.value;
			}
			if (typeof this.props.ObjectDefault != "undefined") {
				dataSource.push(this.props.ObjectDefault)
			}
			if (this.props.onValueChange != null) {
				const mLObjectDefinition = this.props.MLObjectDefinition;
				const MLObjectList = GetMLObjectDataList(mLObjectDefinition, dataSource, dataSource);
				//console.log("InputGridCom  onValueChange ", MLObjectList, dataSource);
				//console.log("InputGridCom  mLObjectDefinition ", mLObjectDefinition);
				//console.log("InputGridCom  onValueChange ", this.props.name, MLObjectList, this.props.controltype);
				this.props.onValueChange(this.props.name, MLObjectList, this.props.controltype, undefined);
			}

			const lstobjdelete = this.bindobjdelete1(false, dataSource);
			this.setState({ lstobjDelete: lstobjdelete, IsCheckAll: false });
			//#endregionThêm trực tiếp 1 row
		}
		else {

			if (this.props.onInsertClick === undefined) {
				let listColumnNew = this.props.listColumn.filter((person, index) => {
					if (this.props.listColumn[index].iputpop == true || this.props.listColumn[index].iputpop === undefined) { return person; }
				});

				this.props.showModal(MODAL_TYPE_CONFIRMATIONNEW, {
					title: 'Cập nhật ' + this.props.title,
					autoCloseModal: this.state.AutoCloseModal,
					onConfirm: (isConfirmed, formData) => {
						let dataSource = this.props.dataSource;
					
						if (this.props.onValueChange != null) {
							dataSource.push(formData)
							const mLObjectDefinition = this.props.MLObjectDefinition;
							const MLObjectList = GetMLObjectDataList(mLObjectDefinition, dataSource, dataSource);
							this.props.onValueChange(this.props.name, MLObjectList, this.props.controltype, undefined);
						}
					},
					modalElementList: listColumnNew,
					modalElementOl: this.props.MLObjectDefinition
				});

			}
			else {
				this.props.onInsertClick();
			}

		}
	}

	handleInsertClickEdit(index) {
		let listColumnNew = this.props.listColumn.filter((person, index) => {
			if ((this.props.listColumn[index].iputpop == true || this.props.listColumn[index].iputpop === undefined) && this.props.listColumn[index].forbiddenUpdate === undefined) { return person; }
		});

		let dataSourcenew = this.props.dataSource[index];
		if (this.props.value != null) {
			dataSourcenew = this.props.value[index];
		}

		this.props.showModal(MODAL_TYPE_CONFIRMATIONNEW, {
			title: 'Chỉnh sửa ' + this.props.title,
			autoCloseModal: this.state.AutoCloseModal,
			onConfirm: (isConfirmed, formData) => {
				let dataSource = this.props.dataSource;
				if (this.props.value != null) {
					dataSource = this.props.value;
				}
				if (this.props.onValueChange != null) {
					const formDatanew = Object.assign({}, dataSource, { [index]: formData });
					const mLObjectDefinition = this.props.MLObjectDefinition;
					const MLObjectList = GetMLObjectDataList(mLObjectDefinition, formDatanew, formDatanew);
					this.props.onValueChange(this.props.name, MLObjectList, this.props.controltype, undefined);
				}
				//lưu trực tiếp vào database
				if (this.props.onUpdatePermanently) {
					this.props.onUpdatePermanently(formData);
				}
				const lstobjdelete = this.bindobjdelete1(false, dataSource);
				this.setState({ lstobjDelete: lstobjdelete, IsCheckAll: false });
			},
			modalElementList: listColumnNew,
			modalElementOl: this.props.MLObjectDefinition,
			dataSource: dataSourcenew
		});

	}
	//#region get Page
	clearData() {
		this.setState({
			GridData: {}, IsCheckAll: false
		});
	}
	getPageCount(dataSource) {

		if (dataSource == null)
			return 1;
		let rowsPerPage = DEFAULT_ROW_PER_PAGE;
		if (this.props.RowsPerPage != null)
			rowsPerPage = this.props.RowsPerPage;
		let pageCount = parseInt(Math.ceil(dataSource.length / rowsPerPage));
		if (pageCount < 1)
			pageCount = 1;
		return pageCount;
	}
	getDisplayData(dataSource) {
		if (!this.props.IsAutoPaging)
			return dataSource;
		let resultData = [];
		if (dataSource == null)
			return resultData;
		let rowsPerPage = DEFAULT_ROW_PER_PAGE;
		if (this.props.RowsPerPage != null)
			rowsPerPage = this.props.RowsPerPage;

		let startRowIndex = (this.state.PageNumber - 1) * rowsPerPage;
		let endRowIndex = startRowIndex + rowsPerPage;
		if (endRowIndex > dataSource.length)
			endRowIndex = dataSource.length;
		for (let i = startRowIndex; i < endRowIndex; i++) {
			resultData.push(dataSource[i]);
		}
		return resultData;
	}

	renderInputGrid() {
		const listColumn = this.props.listColumn;
		let listColumnNew = listColumn.filter((person, index) => {
			if (listColumn[index].hideInput == true || listColumn[index].hideInput === undefined) { return person; }
		});
		let dataSource = this.props.dataSource;
		if (this.props.value != null) {
			dataSource = this.props.value;
		}

		if (this.props.IsAutoPaging) {
			dataSource = this.getDisplayData(dataSource);
		}
		const idSelectColumnName = this.props.IDSelectColumnName;
		return (
			<table className="table table-bordered">
				<thead>
					<tr className="jsgrid-header-row">
						{
							listColumnNew.map((elementItem, index) => {
								let cellStyle = {
									width: elementItem.Width
								};
								let columHeader = elementItem.Caption;
								if (elementItem.Type == "checkbox" && elementItem.Caption == "") {
									const className = "form-control form-control-sm";
									columHeader = <input type="checkbox" className={className} onChange={this.checkAll} checked={this.state.IsCheckAll} />
								}
								else if (elementItem.Type == "checkboxAll" && elementItem.Caption == "") {
									const className = "form-control form-control-sm";
									if (this.props.IsPermisionDelete == true || this.props.IsPermisionDelete == undefined) {
										columHeader = <input type="checkbox" className={className} onChange={this.checkAll} checked={this.state.IsCheckAll} />
									}
									else {
										columHeader = <input type="checkbox" disabled={true} className={className} />

									}
								}
								if (elementItem.Type == "checkbox") {
									cellStyle = {
										width: elementItem.Width,
										textAlign: "center"
									};
								}
								return (
									<th key={elementItem.Name} className="jsgrid-header-cell" style={cellStyle}>{columHeader}</th>
								);
							})
						}
					</tr>
				</thead>
				<tbody>
					{dataSource != null &&
						dataSource.map((rowItem, rowIndex) => {
							let rowClass = "jsgrid-row";
							if (index % 2 != 0) {
								rowClass = "jsgrid-alt-row";
							}
							let isChecked = false;
							const checkList = this.state.GridData[idSelectColumnName];
							//  console.log("checkList :", checkList, this.state.GridData);
							if (checkList != null) {
								if (checkList[rowIndex] != null) {
									isChecked = checkList[rowIndex].IsChecked;
								}
							}
							// console.log("RowNum :", rowIndex);
							// console.log("isChecked :", isChecked);
							return (<tr key={rowIndex}>
								{
									listColumnNew.map((columnItem, index) => {
										const cellStyle = {
											width: columnItem.Width,
											verticalAlign: "middle"
										};
										let isChecked = false;
										const checkList = this.state.GridData[idSelectColumnName];
										//  console.log("dataSource checkList :", checkList,columnItem.Name,idSelectColumnName);
										if (checkList != null) {
											if (checkList[rowIndex] != null && columnItem.Name == idSelectColumnName) {
												//console.log("dataSource checkList[rowIndex].IsChecked :", checkList[rowIndex].IsChecked,);
												isChecked = checkList[rowIndex].IsChecked;
											}
										}
										if (columnItem.Type == "checkbox" && columnItem.Name != idSelectColumnName) {
											isChecked = rowItem[columnItem.DataSourceMember];

										}
										// console.log("rowItem[columnItem.DataSourceMember]:",rowItem[columnItem.DataSourceMember]);
										if (columnItem.Type == "checkboxAll" && columnItem.Name != idSelectColumnName) {
											//	console.log("this.state.lstobjDelete",this.state.lstobjDelete);
											if (this.state.lstobjDelete[rowIndex])
												isChecked = this.state.lstobjDelete[rowIndex].IsChecked;

										}
										//    console.log("columnItem Type isChecked :", columnItem.Name,columnItem.Type,this.state.selected);
										//  console.log("rowItem[columnItem.IsAutoLoadItemFromCache]:", columnItem.IsAutoLoadItemFromCache);
										let validationErrorMessage = "";
										let listerror = this.props.listvalidationError[rowIndex];
										// console.log("listvalidationError",this.props.listvalidationError,rowIndex,listerror);
										if (listerror != undefined) {
											if (listerror[columnItem.Name] != null) {
												validationErrorMessage = listerror[columnItem.Name].ValidationErrorMessage;
											}
										}
										let DataSourceMember = columnItem.DataSourceMember;
										if (columnItem.Type === "combobox" && this.props.Ispopup === true) {
											DataSourceMember = columnItem.ID;
										}
										let ovjvalue = rowItem[DataSourceMember] === undefined ? "" : rowItem[DataSourceMember];


										//console.log("{rowItem[columnItem.DataSourceMember]}", columnItem.Type, columnItem.DataSourceMember, columnItem);
										const cellData = <InputGridCell type={columnItem.Type}
											text={ovjvalue}
											value={ovjvalue}
											to={columnItem.Link}
											linkText={columnItem.LinkText}
											name={columnItem.Name}
											listoption={columnItem.listoption}
											IsAutoLoadItemFromCache={columnItem.IsAutoLoadItemFromCache}
											LoadItemCacheKeyID={columnItem.LoadItemCacheKeyID}
											ValueMember={columnItem.ValueMember}
											NameMember={columnItem.NameMember}
											onInsertClickEdit={this.handleInsertClickEdit}
											onValueChange={this.onValueChange}
											index={rowIndex}
											isChecked={isChecked}
											IsFilterData={columnItem.IsFilterData}
											KeyFilter={columnItem.KeyFilter}
											ValueFilter={rowItem[columnItem.KeyFilter]}
											onHandleEditClick={this.handleEditClick}
											onValueChangeALL={this.handleClick}
											validationErrorMessage={validationErrorMessage}
											label={columnItem.label}
											cation={columnItem.Caption}
											validatonList={columnItem.validatonList}
											isDisabled={this.props.isDisabled}
											isCategory={columnItem.isCategory}
											CategoryTypeID={rowItem[columnItem.rowCategoryType]}
											IsPermisionAdd={this.props.IsPermisionAdd}
											IsPermisionEdit={this.props.IsPermisionEdit}
											IsPermisionDelete={this.props.IsPermisionDelete}
											isSystem={this.state.IsSystem}
											Ispopup={this.props.Ispopup === undefined ? false : this.props.Ispopup}
										/>;
										return (
											<td key={columnItem.Name} style={cellStyle}  >{cellData}</td>
										);
									}
									)
								}
							</tr>);
						}
						)
					}
				</tbody>
			</table>
		);
	}
	//#endregion get Page

	render() {
		let searchTextbox = <div></div>;
		if (this.props.hasSearch) {
			searchTextbox = <div className="lookup">
				<input className="w-200px" type="text" name="txtKeyword" placeholder="Search" onKeyPress={this.handleKeyPress} />
			</div>;
		}
		const pageCount = this.getPageCount(this.props.dataSource);
		let hasHeaderToolbar = true;
		if (this.props.isHideHeaderToolbar)
			hasHeaderToolbar = false;
		return (
			<div className="card">
				<div className="card-body">
					{hasHeaderToolbar &&
						<div className="flexbox mb-10 ">
							{searchTextbox}
							<div className="btn-toolbar">
								<div className="btn-group btn-group-sm">

									{(this.props.IsPermisionAdd == true || this.props.IsPermisionAdd == undefined) && this.state.IsSystem == false ?
										(
											<button type="button" className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm" onClick={this.handleInsertClick}>
												<span className="fa fa-plus ff"> Thêm </span>
											</button>
										)
										: (
											<button type="button" className="btn btn-info" disabled title="Bạn Không có quyền xử lý!" data-provide="tooltip" data-original-title="Thêm">
												<span className="fa fa-plus ff"> Thêm </span>
											</button>
										)
									}
								</div>
							</div>
						</div>
					}
					{
						this.renderInputGrid()
					}
					{this.props.IsAutoPaging &&
						<InputGridPage numPage={pageCount} currentPage={this.state.PageNumber} onChangePage={this.onChangePageHandle} />
					}
				</div>
			</div>
		);
	}
}
//#region Map
const mapStateToProps = state => {
	return {
		AppInfo: state,
		FetchAPIInfo: state.FetchAPIInfo
	}
}

const mapDispatchToProps = dispatch => {
	return {
		showModal: (type, props) => {
			dispatch(showModal(type, props));
		},
		hideModal: () => {
            dispatch(hideModal());
        },
		callGetCache: (cacheKeyID) => {
			return dispatch(callGetCache(cacheKeyID));
		}
	}
}
//#endregion End Map

const InputGrid = connect(mapStateToProps, mapDispatchToProps)(InputGridCom);
export default InputGrid;