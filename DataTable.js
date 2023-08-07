import React from "react";



import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";



/**
 * @template {Object<string,*>} T
 * @typedef {{
 * item_id: string,
 * item_column: string,
 * item: T,
 * }} DataCellProps
 */

/**
 * @template {Object<string,*>} T
 * @param {DataCellProps<T>} props 
 */
export const DataCell = (props) => {
	const item_column = props.item_column;

	return <TableCell
		data-column={item_column}
	>{
		props.item[item_column]
	}</TableCell>;
};

/**
 * @typedef {{
 * columns: string[]|Object<string,string>,
 * }} ColumnsProp
 */

/**
 * @typedef {ColumnsProp & {
 * label: string,
 * }} DataColumnsProps
 */

/**
 * @param {DataColumnsProps} props 
 */
export const DataColumns = (props) => {
	const Row = [];
	const columns = props.columns;


	if (Array.isArray(columns)) {
		let item_column = 0;
		for (const value of columns) {
			Row.push(
				<TableCell
					data-column={item_column}
					key={`column_${item_column}`
				}>{
					value
				}</TableCell>
			);

			item_column++;
		}
	} else {
		let value;
		for (const item_column in columns) {
			value = columns[item_column];

			Row.push(
				<TableCell
					data-column={item_column}
					key={`column_${item_column}`}
				>{
					value
				}</TableCell>
			);
		}
	}

	return <TableHead>
		<TableRow>{
			Row
		}</TableRow>
	</TableHead>;
};

/**
 * @typedef {ColumnsProp & {
* label: string,
* }} DataFooterProps
*/
/**
 * Dummy component to not render a footer.
 *
 * @param {DataFooterProps} props 
 * @returns {null}
 */
// eslint-disable-next-line no-unused-vars
export const DataFooter = (props) => {
	return null;
};

/**
 * @typedef {ColumnsProp & {
* label: string,
* }} DataPaginationProps
*/
/**
 * Dummy component to not render pagination.
 * 
 * @param {DataPaginationProps} props 
 */
// eslint-disable-next-line no-unused-vars
export const DataPagination = (props) => {
	return null;
};

/**
 * @template {Object<string,*>} T
 * @typedef {ColumnsProp & {
 * item_id: number|string,
 * item: T,
 * CellComponent: function(DataCellProps<T>) : JSX.Element | React.Component<DataCellProps<T>>,
 * CellProps: Object<string,*>,
 * }} DataRowProps
 */

/**
 * @template T
 * @param {DataRowProps<T>} props 
 */
export const DataRow = (props) => {
	const Row = [];

	const columns = props.columns;
	const item_id = props.item_id;
	const item = props.item;
	const CellComponent = props.CellComponent;

	if (Array.isArray(columns)) {
		for (const item_column of columns) {
			Row.push(
				<CellComponent
					item_column={item_column}
					item_id={item_id}
					key={`${item_id}_${item_column}`}
					item={item}
				/>
			);
		}
	} else {
		for (const item_column in columns) {
			Row.push(
				<CellComponent
				item_column={item_column}
					item_id={item_id}
					key={`${item_id}_${item_column}`}
					item={item}
				/>
			);
		}
	}

	return <TableRow>{
		Row
	}</TableRow>;
};



/**
 * @template {Object<string,*>} T
 * @param {ColumnsProp & {
 * label: string,
 * data: T[]|Object<string,T>,
 * CellComponent?: function(DataCellProps<T>) : JSX.Element | React.Component<DataCellProps<T>>,
 * CellProps: Object<string,*>,
 * HeadComponent?: function(DataColumnsProps) : JSX.Element | React.Component<DataColumnsProps>,
 * HeadProps: Object<string,*>,
 * FooterComponent?: function(DataFooterProps) : JSX.Element | React.Component<DataFooterProps>,
 * FooterProps: Object<string,*>,
 * PaginationComponent?: function(DataPaginationProps) : JSX.Element | React.Component<DataPaginationProps>,
 * PaginationProps: Object<string,*>,
 * RowComponent?: function(DataRowProps<T>) : JSX.Element | React.Component<DataRowProps<T>>,
 * RowProps: Object<string,*>,
* }} props 
 */
const DataTable = (props) => {
	if (props.data === null) {
		return null;
	}

	const columns = props.columns;
	const data = props.data;
	const label = props.label;

	const Rows = [];

	let RowComponent;
	if ("RowComponent" in props) {
		RowComponent = props.RowComponent;
	} else {
		RowComponent = DataRow;
	}
	let CellComponent;
	if ("CellComponent" in props) {
		CellComponent = props.CellComponent;
	} else {
		CellComponent = DataCell;
	}
	
	const RowProps = props.RowProps || {};
	const CellProps = props.CellProps || {};
	if (Array.isArray(data)) {
		let item_key = 0;
		for (const value of data) {
			Rows.push(
				<RowComponent
					columns={columns}
					item_id={item_key}
					key={item_key}
					item={value}
					CellComponent={CellComponent}
					CellProps={CellProps}
					{... RowProps}
				/>
			);

			item_key++;
		}
	} else {
		let value;
		for (const item_key in data) {
			value = data[item_key];

			Rows.push(
				<RowComponent
					columns={columns}
					item_id={item_key}
					key={item_key}
					item={value}
					CellComponent={CellComponent}
					{... RowProps}
				/>
			);
		}
	}

	let HeadComponent;
	if ("HeadComponent" in props) {
		HeadComponent = props.HeadComponent;
	} else {
		HeadComponent = DataColumns;
	}
	const HeadProps = props.HeadProps || {};

	let FooterComponent;
	if ("FooterComponent" in props) {
		FooterComponent = props.FooterComponent;
	} else {
		FooterComponent = DataFooter;
	}
	const FooterProps = props.FooterProps || {};

	let PaginationComponent;
	if ("PaginationComponent" in props) {
		PaginationComponent = props.PaginationComponent;
	} else {
		PaginationComponent = DataPagination;
	}
	const PaginationProps = props.PaginationProps || {};

	return <TableContainer
		component={Paper}
	>{[
		<Table
			aria-label={label}
			stickyHeader
			key={`table_${label}`}
		>{[
			<HeadComponent
				columns={columns}
				label={label}
				key={`header_table_${label}`}
				{... HeadProps}
			/>,

			<TableBody key={`body_table_${label}`}>{
				Rows
			}</TableBody>,

			<FooterComponent
				columns={columns}
				label={label}
				key={`footer_table_${label}`}
				{... FooterProps}
			/>
		]}</Table>,

		<PaginationComponent
			columns={columns}
			label={label}
			key={`pagination_table_${label}`}
			{... PaginationProps}
		/>
	]}</TableContainer>;
};

export default DataTable;