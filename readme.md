# Material DataTable

Stateless and extensible Table component to display a list of plain javascript objects.  
It's main focus is to simplify/standadize code for tables.



## Dependencies

* ReactJS  
    Back-bone of the project  
* **Material UI**  
    For the Material UI Table-related components


## Data Format

```js
/**
* @template {Object<string,*>} Row
* @type {Row[] | Object<string, Row>} Data 
*/
```

Every Row of Data is assumed to be a plain javascript object (`Object<string, *>`), while the Data can be either an array of Rows or an object containing Rows as values.




## DataTable Component

Encapsulates all the boring table logic in a single component, with the following basic props:

* `columns`: string[] | Object<string, string>
List of columns that should be displayed on the Table. May be used to filter the displayed data.

* `data`: Row[] | Object<string, Row>  
Data that sould be displayed on the table, following the structure previously described.

* `label`: string
Acessibility label for the table.

### Example

```js
import React from "react";
import DataTable from "./DataTable";

const CustomComponent = (props) => {
	// Could come from props or context
    const Columns = {
        id: "User ID",
        name: "User Name"
    };
    const Data = [
        {
            id: "1",
            name: "Admin"
        },
        {
            id: "2",
            name: "Test"
        }
    ];
	/// ...

	return [
		/// Rest of the component layout
        <DataTable
            columns={Columns}
            data={Data}
            key="arbitrary_example_table"
            label="acessible_table_label"
        />
	];
};
export CustomComponent;
```



##  Extending the component

Using the default DataTable component, the Data will be displayed with only a standard Header and Body, with no pagination or footer.  
To customize the layout, there are 5 optional props:

### `HeadComponent` Custom Header

Component, Class or Functional, used to create a custom header for the table.  
The component will receive the following props:

* `columns`: string[] | Object<string, string>
List of columns that should be displayed.

* `label`: string
Acessibility label for the table.



### `FooterComponent` Custom Footer

Component, Class or Functional, used to create a custom footer for the table. It's required to have a footer on the table.  
The component will receive the following props:

* `columns`: string[] | Object<string, string>
List of columns that should be displayed.

* `label`: string
Acessibility label for the table.



### `PaginationComponent` Custom Pagination

Component, Class or Functional, used to create a custom pagination for the table. It's required to have a pagination on the table.  
The component will receive the following props:

* `columns`: string[] | Object<string, string>
List of columns that should be displayed.

* `label`: string
Acessibility label for the table.



### `CellComponent` Custom Cells

Component, Class or Functional, used to create a cell on the table. 
The component will receive the following props:

* `item_id`: string
ID of the row. Repeated for all columns.

* `item_column`: string
Column to be shown in this cell.

* `item`: Row
Current Row of que Data.



### `RowComponent` Custom Row

Component, Class or Functional, to be used to create a cell on the table. 
The component will receive the following props:

* `item_id`: string
ID of the row. Repeated for all columns.

* `item`: Row
Current Row of que Data.

* `CellComponent`: Component
The component used to create a cell on the table.  
If a custom CellComponent is provided to the DataTable, it will be the same here, otherwise it will be the default component.