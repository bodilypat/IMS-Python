/* Create Search table file */
itmeSearchTableCreatorFile = 'model/item/itemSearchTableCreator.php';
customerSearchTableCreatorFile = 'model/customer/customerSearchTableCreator.php';
saleSearchTableCreatorFile = 'model/sale/saleSearchTableCreator.php';
purchaseSearchTableCreatorFile = 'model/purchase/purchaseSearchTableCreator.php';
vendorSearchTableCreatorFile = 'model/vendor/vendorSeaarchTableCreator.php';

/* Create report table file */
itemReportTableCreatorFile = 'model/item/itemReportTableCreator.php';
customerReportTableCreatorFile = 'model/customer/itemReportTableCreator.php';
saleReportTableCreatorFile = 'model/sale/saleReportTableCreator.php';
purchasReportTableFile = 'model/purchase/purchaseReportTableCreator.php';
vendorReportTableCreatorFile = 'model/vendor/vendorReportTableCreatorFile';

/* Populate Last File */
itemLastInsertFile = 'model/item/populateLastItemProduct.php';
customerLastInsertFile = 'model/customer/populateLastCustomer.php';
saleLastInsertFile = 'model/sale/populateLastSale.php';
purchaseLastInsertFile = 'model/purchase/populateLastPurchase.php';
vendorLastInsertFile = 'model/vendor/populateLastVendor.php';

/* show Suggestion file */
showCustomerIDSuggestionFile = 'model/customer/showCustomerID.php';
showSaleCustomerIDSuggestionFile = 'model/sale/showSaleCustoemrID.PHP';
showSaleIDSuggestionFile = 'model/sale/showSaleID.php';
showPurchaseIDSuggestionFile = 'model/purchase/showPurchaseID.php';
showVendorIDSuggestionFile = 'model/vendor/showVendorID.php';

/* Show item file */
showItemNumberSuggestionFile = 'model/item/showItemNumberr.php';
showImageItemNumberSuggestionFile = 'model/item/showImageItemNumber.php';
showPurchaseItemNumberFile = 'model/purchase/showPurcahseItemNumber.php';
showSaleItemNumberFile = 'show/sale/showSaleItemNubmer.php';
showItemNameFile = 'model/item/showItemName.php';

/* get File */
getItemStockFile = 'model/item/getItemStock.php';
getItemNamefile = 'model/item/getItemName.php';

/* update item */
updateItemImageNameFile = 'model/item/updateItemImageName.php';
deleteItemImageFile = 'model/item/deleteItemImage.php';

saleFilterReportCreatorFile = 'model/sale/saleFilterReportTableCreator.php';
purchaseFilterReportCreatorFile = 'model/purchase/purchaseFilterReportTableCreator.php';

$(document).ready(function(){
	$('.chosenSelect').chosen({ width: "95%"});

	/* Initiate tooltips */
	$('.invTooltip').tooltip();

	/* Listen to add button */
	$('#addItem').on('click', function(){
		addItem();
	});

	$('#addCustomer').on('click', function(){
		addCustomer();
	});

	$('#addSale').on('click', function(){
		addSale();
	});

	$('#addPurchase').on('click', function(){
		addPurchase();
	});

	$('#addVendor').on('click', function(){
		addVendor();
	});

	/* update button */
	$('#updateItem').on('click', function(){
		updateItem();
	});

	$('#updateCustomer').on('click', function(){
		updateCustomer();
	});

	$('#updateSale').on('click', function(){
		updateSale();
	});

	$('#updatePurchase').on('click', function(){
		updatePurchase();
	});

	$('#updateVendor').on('click', function(){
		updateVendor();
	});

	/* Listen delete button */
	$('#deleteItem').on('click', function(){
		/* confirm deleting */
		bootbox.confirm('are you sure you want to delete?', function(result){
			if(result){
				deleteItem();
			}
		});
	});

	$('#deleteCustomer').on('click', function(){
		/* confirm delete */
		bootbox.confirm('Are you sure want to delete?', function(result){
			if(result) {
				deleteCustomer();
			}
		});
	});

	$('#deleteVendor').on('click', function(){
		/* confirm delete */
		bootbox.confirm('Are you sure you want to delete?', function(result) {
			if(result) {
				deleteVendor();
			}
		});
	});

	/* Listen to item name text box in item objects  */
	$('#itemNumber').keyup(function(){
		showSuggestions('itemNumber', showItemNameFile,'itemNameSuggestion');
	});

	/* remove the item names suggestions dropdown in the item objects */
	/* select item form list */
	$(document).on('click', '#itemNameSuggestionList li', function(){
		$('#itemName').val($(this).text());
		$('#itemNameSuggestionList').fadeOut();
	});

	/* Listen to item Number text box in item objects */
	$('#itemNumber').keyup(function(){
		showSuggestion('itemNumber', showItemNumberSuggestionFile,'itemItemNumberSuggestion')
	});

	/* remove the item numbers suggestions dropdown in the item objects */
	/* select item list */
	$(document).on('click', '#itemNumberSuggestionList li', function(){
		$('#itemItemNumber').val($(this).text());
		$('#itemNumberSuggestionList').fadeOut();
		getPopulateItemNumber();
	});

	/* Listen item Number text box in sale objects */
	$('#saleItemNumber').keyup(function(){
		showSuggestion('saleItemNumber', showSaleItemNumberFile,'saleItemNumberSuggestion');
	});

	/* Remove the item numbers suggestions dropdown in the sale objects */
	/* select an sale list */
	$(document).on('click', '#saleItemNumberSuggestionList li', function(){
		$('#saleItemNubmer')val($(this).text());
		$('#saleItemNumberSuggestionList').fadeOut();
		getPopulateSaleItemNumber();
	});

	/* Listen to item Nubmer text box in item image */
	$('#itemImageNubmer').keyup(function() {
		showSuggestion('itemImageNumber', showItemImageNubmerSuggestionFile,'itemImageNumberSuggestion');
	});

	/* Remove the item number suggestion dropdown in the item image */
	/* select item list */
	$(document).on('click', '#itemImageNumberSuggestionList li', function(){
		$('#itemImageNumber').val($(this).text());
		$('#itemImageNumberSuggestionList').fadeOut();
		getItemName('itemImageNumber', getItemImageNameFile,'itemImageName');
	});

	/* Clear button, clear image form list */
	$('#itemClear').on('click', function() {
		$('#imageContainer').empty();
	});

	/* Clear button, clear image from sale  */
	$('#saleClear').on('click', function(){
		$('#saleImageContainer').empty();;
	});

	/* refresh purchase report database in purchase report , clear button  */
	$('#purchaseFilterClear').on('click', function(){
		reportPurchaseTableCreator('purchaseReportTableDiv', purchaseReportTableCreatorFile,'purchaseReportTable');
	});

	/* refresh sale report database, clear sale report button */
	$('#saleFilterClear').on('click', function(){
		reportFilterTableCreator('saleReportTableDiv', saleReportTableCreatorFile,'saleReportTable');
	});

	/* Listen to purchase item Number text box in purchase objects */
	$('#purchaseItemNubmer').keyup(function(){
		showSuggestion('purchaseItemNumber', showPurchaseItemNubmerFile,'purchaseItemNumberSuggestions');
	});

	/* remove the purchase itemNumber suggestion dropdown in the purchase Objects  */
	/* select purchase Item list */
	$(document).on('click', '#purchaseItemNumberSuggestionList li', function(){
		$('#purchaseItemNumber').val($(this).text());
		$('#purchaseItemNumberSuggestionList').fadeOut();

		/* show item name for select item number */
		getItemName('purchaseItemNumber', getPurchaseItemNameFile,'purchaseItemName');

		/* show CustomerID text box in customer objects */
		getPopulateItemStock('purchaseItemNumberr', getItemStockFile,'purchaseCurrentStock');
	});

	/* Listen to CustomerID text box in customer Objects */
	$('#customerID').keyup(function(){
		showSuggestion('customerID', showCustomerIDSuggestionFile,'customerIDSuggestion');
	});

	/* remove the customerID suggestions dropdown in the customer objects */
	/* select customer list */
	$(document).on('click', '#customerIDSuggestionList li', function(){
		$('#customerID').val($(this).text());
		$('#customerIDSuggestionList').fadeOut();
		getPopulateCustomerObject()
	});

	/* Listen to CustomerID text box in sale objects */
	$('#saleCustomerID').keyup(function() {
		showSuggestion('saleCustomerID', showSaleCustomerIDSuggestionFile,'saleCustomerIDSuggestion');
	});

	/* remove the customerID suggestions dropdown in sale objects  */
	/* select item from sale list */
	$(document).on('click', '#saleCustomerIDSuggestionList li', function(){
		$('#saleCustomerID').val($(this).text());
		$('#saleCustomerIDSuggestionList').fadeOut();
		getPopulateSaleCustomer();
	});

	/* Listen to vendorID text box in vendor objects */
	$('#vendorID').keyup(function(){
		showSuggestion('vendorID', showVendorIDSuggestionFile,'vendorIDSuggestion');
	});

	/* remove the vendorID suggestion dropdown in vendor objects */
	/* select item form vendor list */
	$(document).on('click', '#vendorIDSuggestionList li', function(){
		$('#vendorID').val($(this).text());
		$('#vendorIDSuggestionList').fadeOut();
		getPopulateVendorObject();
	});

	/* Listen to purchaseID tex box in purchase objects */
	$('#purchaseID').keyup(function(){
		showSuggestion('purchaseID', showPurchaseIDSuggestionFile,'purchaseIDSuggestion');
	});

	/* remove the purchaseID suggestion dropdown in the customer objects */
	/* select item from purchase list */
	$(document).on('click', '#purchaseIDSuggestionList li', function(){
		$('#purchaseID').val($(this).text());
		$('#purchaseIDSuggestionList').fadeOut();
		getPopulatePurchase();
	});

	/* Listen to saleID text box in sale objects */
	$('#saleID').keyup(function(){
		showSuggestion('saleID', showSaleIDSuggestionFile,'saleIDSuggestion');
	});

	/* remove the saleID suggestions dropdown in the objects */
	/* select item form sale list */
	$(document).on('click','$saleIDSuggestionList li', function(){
		$('#saleID').val($(this).text());
		$('#saleIDSuggestionList').fadeOut();
		getPopulateSaleObject();
	});

	/* Listen to image delete button */
	$('#updateImage').on('click', function(){
		processImage('imageForm', updateImageFile,'itemImageMessage');
	});

	/* Listen to image delete */
	$('#deleteImage').on('click', function(){
		processImage('imageForm', deleteItemImageFile,'itemImageMessage');
	});

	/* Initiate datepicker */
	$('.datepicker').datepicker({
		format : 'yyyy-mm-dd',
		todayHightlight : true,
		todayBtn : 'linked',
		orientation : 'bottom left'
	});

	/* Calculate total in sale tab */
	$('#saleDiscount, #saleQuantity,#saleUnitPrice' ).change(function(){
		calculateTotalSale();
	});

	/* Calculate Total in purchase */
	$('#purchaseQuantity, #pruchaseUnitPrice').change(function(){
		calculateTotalPurchase();
	});

	/* close any suggestions lists from the page when a user clicks on the page */
	$(document).on('click', function(){
		$('.suggestionList').fadeOut();
	});

	/* Load searchable dataable for item, customer, sale, purchase, vendor */
	searchTableCreator('itemSearchTableDiv', itemSearchTableCreatorFile,'itemSearchTable');
	searchTableCreator('customerSearchTableDiv', customerSearchTableCreatorFile,'customerSearchTable');
	searchTableCreator('saleSearchTableDiv', saleSearchTableCreatorFile,'saleSearchTable');
	searchTableCreator('purchaseSearchTableDiv', pruchaseSearchTableCreatorFile,'purchaseSearchTable');
	searchTableCreator('vendorSearchTableDiv', vendorSearchTableCreatorFile,'vendorSearchTable');

	/* Load report datatables for item, customer, sale, purchase, vendor */
	reportTableCreator('itemReportTableDiv', itemReportTableCreatorFile,'itemReportTable');
	reportTableCreator('customerReportTableDiv', customerReportTableCreatorFile,'customerReportTable');
	reportSaleTableCreator('saleReportTableDiv', saleReportTableCreatorFile,'saleReportTable');
	reportPurchaseTableCreator('purchaseReportTableDiv', purchaseReportTableCreatorFile,'purchaseReportTable');
	reportTableCreator('vendorReportTableDiv', vendorReportTableCreatorFile,'vendorReportTable');

	/* Initiate popover */
	$(document).on('mouseover', '.itemHover', function(){
		/* create item object popover boxes */
		$('.itemHover').popover({
			container : 'body',
			title : 'item Objects',
			trigger : 'hover',
			html : true,
			placement : 'right',
			content : fetchData
		});
	});

	/* Listen to refresh buttons */
	$('#searchTableRefresh, #reportTableRefresh').on('click', function(){
		searchTableCreator('itemSearchTableDiv', itemSearchTableCreatorFile,'itemSearchTable');
		searchTableCreator('customerSearchTableDiv', customerSearchTableCreatorFile,'customerSearchTable');
		searchTableCreator('saleSearchTableDiv', saleSearchTableCreatorFile,'saleSearchTable');
		searchTableCreator('purchaseSearchTableDiv', purchaseSearchTableCreatorFile,'purchaseSearchTable');
		searchTableCreator('vendorSearchTableDiv', vendorSearchTableCreatorFile,'vendorSearchTable');

		reportTableCreator('itemReportTableDiv', itemReportTableCreatorFile,'itemReportTable');
		reportTableCreator('customerReportTableDiv', customerTableCreatorFile,'customerReportTable');
		reportSaleTableCreator('saleReportTableDiv', saleTableCreatorFile,'saleReportTable');
		reportPurchaseTableCreator('purchaseReportTableDiv', purchaseReportTableCreatorFile,'purchaseReportTable');
		reportTableCreator('vendorReportTableDiv', vendorReportTableCreatorFile,'vendorReportTable');
	});

	/* Listen to sale report show button */
	$('#showSaleReport').on('click', function(){
		filterSaleReportTableCreator('saleStartDate', 'saleEndDate', saleFilterReportCreatorFile,' saleReportTableDiv', 'saleFilterReportTable');
	});

	/* Listen to purchase show button */
	$('#showSaleReport').on('click', function(){
		fitlerSaleReportTableCreator('purchaseStartDate','purchaseEndDate', purchaseReportCreatorFile,'purchaseReportTableDiv','purchaseFilterReportTable');
	});
});

/* Function to fetch data to show in popovers */
function fetchData(){
	var fetch_data = '';
	var element = $(this);
	var id = element.attr('id');

	$.ajax({
		url : 'model/item/getItemPopover.php',
		method : 'POST',
		async : false,
		data : {id:id},
		success : function(data) {
			fetch_data = data;
		}
	});
	return fetch_data;
}

/* Function to call the script that process imageURL in db */
function processImage(imageFormID, scriptPath, messageDivID){
	var form = $('#', + imageFormID)[0];
	var formDate = new FormData(form);

	$.ajax({
		url : scriptPath,
		method : 'POST',
		contentType : false,
		processData : false,
		success : function(data) {
			$('#' + messageDivID).html(data);
		};
	});
}

/* Function to create searchable data for item, customer,vendor */
function searchTableCreator(tableContainerDiv, tableCreatorFileUrl, table) {
	var tableContainerDivID = '#' + tableContainerDiv;
	var tableID = '#' + table;
	$(tableContainerDivID).load(tableCreatorFileUrl, function() {
		/* Initiate the datatable plugin once the table is added to the DOM */
		$(tableID).DataTable();
	});
}

/* Function to create reports datatable for item, customer, vendor */
function reportTableCreator(tableContainerDiv, tableCreatorFileUrl, table) {
	var tableContainerDivID = '#' + tableContainerDiv;
	var tableDiv = '#' + table;
	$(tableContainerDivID).load(tableCreatorFileUrl, function(){
		/* Initiate the datatable plugin once the table is added to the DOM */
		$(tableID).DataTable({
			dom : 'lBfrtip',
			button : [
				'copy',
				'csv', 'excel',
				{extend: 'pdf', orientation : 'landscape', pageSize : 'LEGAL'},
				'print'
			]
		});
	});
}

/* Function to create reports datatable for sale */
function reportSaleTableCreator(tableContainerDiv, tableCreatorFileUrl, table){
	var tableContainerDivID = '#' + tableContainerDiv;
	var tableID = '#' + table;
	$(tableContainerDivID).load(tableCreatorFileUrl, function(){
		/* initate the datatable plugin once the table is add to the DOM */
		$(tableID).DataTable({
			dom : 'lBfrtip',
			buttons :[
				'copy',
				{extend : 'csv', footer : true, title : 'Sale Report'},
				{extend : 'excel', footer : true, title : 'Sale Report'},
				{extend : 'pdf', footer : true, orientation : 'landscape', pageSize: 'LEGAL', title : 'Sale Report'},
				{extend : 'print',footer : true, title : 'Sale Report'},
			],
			"footerCallback " : function( row, data, start, end, display) {
				var api = this.api(), data;
				/* remove the formatting to get integer data for summation */
				var intVal = function( i ) {
					return typeof i === 'string' ?
						i.replace(/[\$,]/g, '')*1 :
						typeof i === 'number' ?
							i : 0;
				};
				/* Quantity total over all pages */
				quantityTotal = api
					.column ( 6 )
					.data ()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				/* quantity for current page */
				quantityFilterTotal = api
					.column(6 , { page : 'current'} )
					.data()
					.reduce( function(a, b) {
						return intVal(a) + intVal(b);
					}, 0);
				/* Unit price total over all page */
				unitPriceTotal = api
					.column( 7 )
					.data()
					.reduce( function(a, b) {
						return intVal(a) + intVal(b);
					}, 0);
				/* unit price for current page */
				unitPriceFilterTotal = api
					.column( 7, { page : 'current'} )
					.data()
					.reduce( function(a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				/* Full price total ovar all pages */
				fullPriceTotal = api
					.column( 8 )
					.data()
					.reduce( function(a, b) {
						return intVal(a) + intVal(b);
					}, 0);
				/* Full price for current page */
				fullPriceFilterTotal = api
					.column(8, { page : 'current'} )
					.data()
					.reduce( function(a, b) {
						return intVal(a) + intVal(b);
					},0 );
				/* update footer columns */
				$(api.column( 6 ).footer() ).html(quantityFilterTotal + ' (' + quantityTotal + 'total)');
				$(api.column( 7 ).footer() ).html(unitPriceFilterTotal + '(' + unitPriceTotal + 'total)');
				$(api.column( 8 ).footer() ).html(fullPriceFilterTotal + '(' + fullPriceTotal + 'total)');
			}		
		});
	});
}

/* Function to create reports datatable for purchae */
function reportPurchaseTableCreator(tableContainerDiv, tableCreatorFileUrl , table) {
	var tableContainerDivID = '#' + tableContainerDiv;
	var tableID = '#' + table;
	$(tableContainerDivID).load(tableCreatorFileUrl , function() {
		/* Initiate the datatable plugin once the table is added to the DOM */
		$(tableID).DataTable({
			dom : 'lBfrtip',
			button : [
				'copy',
				{extend : 'csv', footer : true, title : 'Purchase Report'},
				{extend : 'excel', footer : true, title : 'Purchase Report'},
				{extend : 'pdf', footer : true, title : 'Purchase Report'},
				{extend : 'print', footer : true, title : 'Purchase Report'},
			],
			"footerCallback" : function (row, data, start, end, display) {
				var api = this.api(), data;
				/* remove the formatting to get integer data for summation */
				var intVal = function( i ) {
					return typeof i === 'string' ?
					i.replace(/[\$,]/g, '')*1 :
					typeof i === 'number' ?
						i : 0;
				};
				/* Qauntity total over all pages */
				var intVal = api
					.column( 6 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0);
				/* Unit price total over all pages */
				unitPriceTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0);
				/* Unit price for current page */
				unitPriceFilterTotal = api 
					.column( 7, { page : 'current'} )
					.data()
					.reduce ( function(a, b) {
						return intVal(a) + intVal(b);
					}, 0);
				/* Full price total over all pages */
				fullPriceTotal = api
					.column( 8 )
					.data()
					.reduce( function(a, b) {
						return intVal(a) + intVal(b);
					}, 0);
				/* update footer column */
				$(api.column( 6 ).footer() ).html(quantityFilterTotal + '(' + quantityTotal + 'total)');
				$(api.column( 7 ).footer() ).html(unitPriceFilterTotal + '(' + unitPriceTotal + 'total)');
				$(api.column( 8 ).footer() ).html(fullPriceFilterTotal + '( ' + fullPriceTotal + 'total)');
			}
		});
	});
}

/* Function to create filtered datatable for sale object with total values */
function filterSaleReportTableCreator(startDate, endDate, scriptPath, tableDIV, tableID) {
	var startDate = $('#' + startDate).val();
	var endDate = $('#' + endDate).val();

	$.ajax({
		url : scriptPath,
		method : 'POST',
		data : {
			startDate : startDate,
			endDate : endDate,
		},
		success : function(data) {
			$('#' + tableDIV).empty();
			$('#' + tableDIV).html(data);
		},
		complete : function() {
			/* Initiate the datatable plugin once the table is added to the DOM */
			$('#' + tableID).DataTable({
				dom : 'lBfrtip',
				buttons : [
					'copy',
					{extend : 'csv', footer : true, title : 'Sale Report'},
					{extend : 'excel', footer : true, title : 'Sale Report'},
					{extend : 'pdf', footer : true, orientation : 'landscape', pageSize : 'LEGAL', title : 'Sale Report'},
					{extend : 'print', footer : true, title : 'Sale Report'},
				],
				"footerCallback" : function(row , data, start, end, display){
					var api = this.api(),  data;
					/* remove the formatting to get integer data for summation */
					var intVal = function( i ) {
						return typeof i === 'string' ?
						i.replace(/[\$,]/g, '')*1 :
						typeof i === 'number' ?
						   i : 0;
					};
					/* Total over all pages */
					quantityTotal = api
						.column( 7 )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0);
					/* Total over all pages */
					quantityFilterTotal = api
						.column(7, { page : 'current'} )
						.data()
						.reduce( function (a, b){
							return intVal(a) + intVal(b);
						}, 0 );
					/* Total over all pages */
					unitPriceTotal = api 
						.column( 8 )
						.data()
						.reduce(  function(a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
					/* Quantity total */
					unitPriceFilterTotal = api
						.column( 8, { page : 'current'} )
						.data()
						.reduce( function(a, b){
							return intVal(a) + intVal(b);
						}, 0 );
					/* Full total over all pages */
					fullPriceTotal = api
						.column( 9, { page : 'current'} )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0);
					/* Full total over current page */
					fullPriceFilterTotal = api
						.column( 9, { page : 'current'} )
						.data()
						.reduce( function(a, b) {
							return intVal(a) + intVal(b);
						}, 0);
					/* update footer columns */
					$(api.column( 7 ).footer() ).html(quantityFilterTotal + '(' + quantityTotal + 'total)');
					$(api.column( 8 ).footer() ).html(unitPriceFilterTotal + '(' + unitPriceTotal + 'total)');
					$(api.column( 9 ).footer() ).html(fullPriceFilterTotal + '(' + fullPriceTotal + 'total)');
				}
			});
		}
	});
}

/* Function to create filter datatable for purchase details with total values */
function filterPurchaseReportTableCreator(startDate, endDate, scriptPath, tableDIV, tableID) {
	var startDate = $('#' + startDate).val();
	var endDate = $('#' + endDate).val();

	$.ajax({
		url : scriptPath,
		method : 'POST',
		data : {
			startDate:startDate,
			endDate:endDate,
		},
		success : function(data) {
			$('#' + tableDIV).empty();
			$('#' + tableDIV).html(data);
		},
		complete : function() {
			/* Initiate the Datatable plugin once the table is added to the DOM */
			$('#' + tableID).DataTable({
				dom : 'lBfrtip',
				buttons : [
					'copy',
					{extend : 'csv', footer : true, title : 'Purchase Report'},
					{extend : 'excel', footer : true, title : 'Purchase Report'},
					{extend : 'pdf', footer : true, orientation : 'landscape', pageSize : 'LEGAL', title : 'Purchase Report'},
					{extend : 'print', footer : true, title : 'Purchase Report'}
				],
				"footerCallback" : function(row, data, start, end, display) {
					var api = this.api(), data;
					/* remove the formatting to get integer data form summation */
					var intVal = function( i ) {
						return typeof i === 'string' ?
						i.replace(/[\$,]/g,'')*1 :
						typeof i === 'number' ?
							i : 0;
					};
					/* Quantity total over all pages */
					quantityTotal = api
						.column ( 6 )
						.data()
						.reduce( function(a , b) {
							return intVal(a) + intVal(b);
						}, 0 );
					/* Quantity for current page */
					quantityFilterTotal = api
						.column(6, { page : 'current'} )
						.data()
						.reduce( function(a, b) {
							return intVal(a) + intVal(b);
						}, 0);
					/* Unit price total over all pages */
					unitPriceTotal = api 
						.column( 7 )
						.data() 
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
					/* Unit price total over all pages */
					unitPriceTotal = api
						.column( 7 )
						.data()
						.reduce( function(a, b) {
							return intVal(a) + intVal(b);
						}, 0);
					/* Unit price for current page */
					unitPriceFilterTotal = api 
						.column( 7, { page : 'current'} )
						.data()
						.reduce( function(a, b) {
							return intVal(a) + intVal(b);
						}, 0);
					/* Full price for current page */
					fullPriceFilterTotal = api
						.column( 8, { page : 'current'} )
						.data()
						.reduce( function(a, b) {
							return intVal(a) intVal(b);
						} , 0);
					/* Update footer columns */
					$(api.column( 6 ).footer() ).html(quantityFilterTotal + '(' + quantityTotal + 'total)');
					$(api.column( 7 ).footer() ).html(unitPriceFilterTotal + '(' + unitPriceTotal + 'total)');
					$(api.column( 8 ).footer() ).html(fullPriceFilterTotal + '(' + fullPriceTotal + 'total)');
				}
			});
		}
	});
}

/* Calculate total purchase value in purchase objects */
function calculateTotalSale() {
	var quantitySale = $('saleQuantity').val();
	var unitPriceSale = $('saleUnitPrice').val();
	var discountSale = $('saleDiscount').val();
	$('#saleTotal').val(Number(unitPriceSale)*((100 - Number(discountSale)) / 100) * Number(quantitySale));
}

/* Calculate Total purchase value in purchase objects  */
function calculateTotalPurchase() {
	var quantityPurch = $('#purchaseQuantity').val();
	var unitPricePurch = $('#purchaseUnitPrice').val();
	$('#purchaseTotal').val(Number(quantityPurch)* Number(unitPricePurch));
}

/* Function to call the insertItem.php script to insert item data to database */
function addItem()
{
	var itemNumber = $('#itemNumber').val();
	var itemName = $('#itemName').val();
	var itemDiscount = $('#itemDiscount').val();
	var itemQuantity = $('#itemQuantity').val();
	var itemUnitPrice = $('#itemUnitPrice').val();
	var itemStatus = $('#itemStatus').val();
	var itemDescription = $('#itemDiscription').val();

	$.ajax({
		url : 'model/item/insertItemObjects.php',
		method : 'POST',
		data : {
			itemNumber : itemNumber,
			itemName : itemName,
			itemDiscount : itemDiscount,
			itemQuantity : itemQuantity,
			itemUnitPrice : itemUnitPrice,
			itemStatus : itemStatus,
			itemDescription : itemDescription,
		},
		success : function(data) {
			$('#itemMessage').fadeIn();
			$('#itemMessage').html(data);
		},
		complete : function() {
			populateLastInsert(itemLastInsertFile,'itemProductID');
			getPopulateItemStock('itemNumber', getItemStockFile,'itemTotalStock');
			searchTableCreator('itemSearchTableDiv', itemSearchTableCreatorFile,' itemSearchTable');
			reportTableCreator('itemReportTableDiv', itemReportTableCreatorFile,'itemReportTable');
		}
	});
}

/* Function to call insertCustomer.php script to insert customer data to database */
function addCustomer(){
	var customerFullName = $('#customerFullName').val();
	var customerEmail = $('#customerEmail').val();
	var customerMobile = $('#customerMobile').val();
	var customerPhone = $('#customerPhone').val();
	var customerAddress = $('#customerAddress').val();
	var customerAddress2 = $('#customerAddress2').val();
	var customerCity = $('#customerCity').val();
	var customerDistrict = $('#customerDistrict').val();
	var customerStatus = $('#customerStatus').val();

	$.ajax({
		url : 'model/customer/insertCustomerObjects.php',
		method : 'POST',
		data : {
			customerFullName : customerFullName,
			customerEmail : customerEmail,
			customerMobile : customerMobile,
			customerPhone : customerPhone,
			customerAddress : customerAddress,
			customerAddress2 : customerAddress2,
			customerCity : customerCity,
			customerDistrict : customerDistrict,
			customerStatus : customerStatus,
		},
		success : function(data) {
			$('#customerMessage').fadeIn();
			$('#customerMessage').html(data);
		},
		complete : function(data) {
			populateLastInsert(customerLastInsertFile,'customerID');
			searchTableCreator('customerSearchTableDiv', customerSearchTablecCreatorFile,'customerSearchTable');
			reportTableCreator('customerReportTableDiv', customerReportTableCreatorFile,'customerReprotTable');
		}
	});
}

/* Functiion to call the insertSale.php script to insert sale data to database */
function addSale() {
	var saleItemNumber = $('#saleItemNumber').val();
	var saleItemNumber = $('#saleItemName').val();
	var saleDiscount = $('#saleDiscount').val();
	var saleQuantity = $('#saleQuantity').val();
	var saleUnitPrice = $('#saleUnitPrice').val();
	var saleCustomerID = $('#saleCustomerID').val();
	var saleCustomerName = $('#saleCustomerID').val();
	var saleDate = $('#saleDate').val();

	$.ajax({
		url : 'model/sale/insertSale.php',
		method : 'POST',
		data : {
			saleItemNumber : saleItemNumber,
			saleItemName : saleItemName,
			saleDiscount : saleDiscount,
			saleQuantity : saleQuantity,
			saleUnitPrice : saleUnitPrice,
			saleCustomerID : saleCustomerID,
			saleCustomerName : saleCustomerName,
			saleDate : saleDate,
		}, 
		success :  function(data) {
			$('#saleMessage').fadeIn();
			$('#saleMessage').html(data);
		}
		complete : function() {
			getPopulateItemStock('saleItemNumber', getItemStockFile,'saleTotalStock');
			populateLastInsert(saleLastInsertFile, 'saleID');
			searchTableCreator('saleSearchTableDiv', saleSearchTableCreatorFile,'saleSearchTable');
			reportSaleTableCreator('saleReportTableDiv', saleReportTableCreatorFile,'saleReportTable');
			searchTableCreator('itemSearchTableDiv', itemSearchTableCreatorFile,'itemSearchTable');
			reportTableCreator('itemReportTableDiv', itemReportTableCreatorFile,'itemReportTable');
		}
	});
}

/* Function to all insertPurchase.php script to insert purchase data to database */
function addPurchase() {
	var purchaseItemNumber = $('#purchaseItemNumber').val();
	var purchaseDate = $('#purchaseDate').val();
	var purchaseItemName = $('#purchaseItemName').val();
	var purchaseQuantity = $('#purchaseQuantity').val();
	var purchaseUnitPrice = $('#purchaseUnitPrice').val();
	var purchaseVendorName = $('#purchaseVendorName').val();

	$.ajax({
		url : 'model/purchase/insertPurchase.php',
		method : 'POST',
		data : {
			purchaseItemNumber:purchaseItemNumber,
			purchaseDate:purchaseDate,
			purchaseItemName:purchaseItemName,
			purchaseQuantity:purchaseQuantity,
			purchaseUnitPrice:purchaseUnitPrice,
			PurchaseVendorName:purchaseVendorName,
		},
		success : function(data) {
			$('#purchaseMessage').fadeIn();
			$('#purchaseMessage').html(data);
		},
		complete : function() {
			getPopulateItemStock('purchaseItemNumber', getItemStockFile,'purchaseCurrentStock');
			populateLastInsert(purchaseLastInsertFile,'purchaseID');
			searchTableCreator('purchaseSearchTablediv', purchaseSearchTableCreatorFile,'purchaseSearchTable');
			reportPurchaseTableCreator('purchaseReportTableDiv', purchaseReportTableCreatorFile,'purchaseReportTable');
			searchTableCreator('itemSearchtableDiv', itemSearchTableCreatorFile,'itemSearchTable');
			reportTableCreator('itemReportTableDiv', itemReportTableCreatorFile,'itemReprotTable');
		}
	});
}

/* Function to call the insertVendor.php script to insert sale data to database */
function addVendor() {
	var vendorFullName = $('#vendorFullName').val();
	var vendorEmail = $('#vendorEmail').val();
	var vendorMobile = $('#vendorMobile').val();
	var vendorPhone = $('#vendorPhone').val();
	var vendorAddress = $('#vendorAddress').val();
	var vendorAddress2 = $('#vendorAddress2').val();
	var vendorCity = $('#vendorCity').val();
	var vendorDistrict = $('#vendorDistrict option:selected').text();
	var vendorStatus = $('#vendorStatus option:selected').text();

	$ajax({
		url : 'model/vendor/insertVendor.php',
		method : 'POST',
		data : {
			vendorFullName : vendorFullName,
			vendorEmail : vendorEmail,
			vendorMobile : vendorMobile,
			vendorPhone : vendorPhone,
			vendorAddress : vendorAddress,
			vendorAddress2 : vendorAddress2,
			vendorCity : vendorCity,
			vendorDistrict : vendorDistrict,
			vendorStatus : vendorStatus,
		},
		success : function(data) {
			$('#vendorMessage').fadeIn();
			$('#vendorMessage').html(data);
		},
		complete : function(data) {
			populateLastInsert(vendorLastInsertFile,'vendorID');
			searchTableCreator('vendorSearchTableDiv', vendorSearchTableCreatorFile,'vendorSearchTable');
			reportTableCreator('vendorReportTableDiv', vendorReportTableCreatorFile,'vendorReportTable');
			$('#purchaseVendorName').load('model/vendor/getVendorName.php');
		}
	});
}

/* Function to send itemNumber so that item objects can be pulled from database */
/* display on item object tab */
function getPopulateItem(){
	/* get ItemNumber entered in the text box */
	var itemNubmer = $('#itemNumber').val();
	var defaultImgUrl = 'data/item_images/imageNotAvailable.jpg';
	var defaultImageDate = '<img class="img-fluid" src="data/item_images/imageNotAvailavble.jpg';

	/* Call the populateitemObject.php script to get item details */
	/* relevant to the itemNubmer which the user entered */

	$.ajax({
		url : 'model/item/populateItemObjects.php',
		method : 'POST',
		data : {itemNumber:itemNumber},
		dataType : 'json',
		success : function(data) {
			$('#itemProductID').val(data.productID);
			$('#itemName').val(data.itemName);
			$('#itemDiscount').val(data.discount);
			$('#itemTotalStock').val(data.stock);
			$('#itemUnitPrice').val(data.unitPrice);
			$('#itemDescription').val(data.unitPrice);
			$('#itemStatus').val(data.status).trigger("chosen:updated");

			newImgUrl = 'data/item_images/' + data.itemNumber + '/' + data.imageURL;
			/* set the item image */
			if(data.imageURL == 'imageAvailable.jpg' || data.imageURL == ''){
				$('#imageContainer').html(defaultImageData);
			} else {
				$('#imageContainer')html('<img class="img-fluid" src="' + newImgUrl + '">');
			}
		}
	});
}

/* Function to send itemNumber so that item object can be pulled from database */
/* to be display on sale details tab */
function getPopulateSaleItem() {
	var itemNumber = $('#saleItemNumber').val();
	var defaultImgUrl = 'data/item_images/imageNotAvailable.jpg';
	var defaultImageData = '<img class="img-fluid" src="data/item_images/imageNotAvailable.jpg';

	/* call the populateItemObject.php script to get item objects */
	/* relevant to the itemNubmer which the user entered */
	$.ajax({
		url : 'model/item/populateSaleObjects.php';
		method : 'POST',
		data :  {itemNumber:itemNubmer},
		dataType : 'json',
		success : function(data) {
			$('#saleItemName').val(data.itemName);
			$('#saleDiscount').val(data.discount);
			$('#saleTotalStock').val(data.stock);
			$('#saleUnitPrice').val(data.unitPrice);

			newImgUrl = 'data/item_images/' + data.itemNubmer + '/'+ data.imageURL;

			/* Set the item image */
			if(data.imageURL == 'imageNotAvailable.jpg' || data.imageURL == '' ){
				$('#saleImageContainer').html(defaultImageData);				
			} else {
				$('#saleImageContainer').html('<img class="img-fluid" src="' + newImgUrl + '">');
			}
		},
		complete : function() {
			calculateTotalSale();
		}
	});
}

/* Function tp send itemNumber so that item Name can be pulled from database */
function getItemName(itemNumberTextBoxID, scriptPath, itemNameTextbox) {
	/* Get the itemNumber entered in the text box */
	var itemNumber = $('#' + tiemNumberTextBoxID).val();

	/* Call the script to get item object */
	$.ajax({
		url : scriptPath,
		method : 'POST',
		data : {itemNubmer:itemNumber},
		dataType : 'json',
		success : function(data) {
			$('#' + itemNameTextbox).val(data.itemName);
		},
		error : function (xhr, ajaxOptions, thrownError){
		}
	});
}

/* Function to send itemNumber so that item stock can be pulled from database */
function getPopulateItemStock(itemNumberTextbox, scriptPath, stockTextbox) {
	/* GEt the itemNumber entered in the text box */
	var itemNumber = $('#' + itemNubmerTextbox).val();
	/* Call the script to get stock objects */
	$.aajx({
		url : scriptPath,
		method : 'POST',
		data : {itemNumber:itemNubmer},
		dataType : 'json',
		success :  function(data) {
			$('#' + stockTexbox).val(data.stock);
		},
		error : function (xhr, ajaxOptions, thrownError) {
		}
	});
}

/* Function to populate last inserted ID */
function populateLastInsert(scriptPath, textboxID) {
	$.ajax({
		url :  scriptPath,
		method : 'POST',
		dataType :  'json',
		success : function(data) {
			$('#' + textBoxID).val();
		}
	});
}

/* Function to show suggestions */
function showSuggestions(textBoxID, scriptPath, suggestionDivID){
	/* Get the value entered by the user */
	var textBoxValue = $('#' + textBoxID).val();

	/* call the showPurchaseID.PHP script only if there is a valude in the  */
	/* purchase ID textbox */
	if(textBoxValue != '') {
		$.ajax({
			url : scriptPath,
			method : 'POST',
			data : {textBoxValue:textBoxValue},
			success : function(data) {
				$('#' + suggestionDivID).fadeIn();
				$('#' + suggestionDivID).html(data);
			}
		});
	}
}

/* Function to send customerID so that customer object can be pulled from database */
/* display on customer objects tab */
function getPopulateCustomerObject() {
	/* Get the customerID entered in the text box */
	var customerID = $('#customerID').val();

	/* call the populateCustomerObject.php script to get customer objects */
	/* relavant to the CustomerID which the user Entered */
	$.ajax({
		url : 'model/customer/populateCustomerObjects.php',
		method : 'post',
		data : {customerID:custmerID},
		dataType : 'json',
		success : function(data) {
			$('#customerFullName').val(data.fulllName);
			$('#customerMobile').val(data.mobile);
			$('#customerPhone').val(data.phone);
			$('#customerEmail').val(data.email);
			$('#customerAddress').val(data.address);
			$('#customerAddress2').val(data.address2);
			$('#customerCity').val(data.city);
			$('#customerDistrict').val(data.district).trigger('Chosen:updated');
			$('#customerStatus').val(data.status).trigger("chosen:upload");
		}
	});
}

/* Function to send customerID so that customer objects can be pulled from database to be display on sale object tab */
function getPopulateSaleCustomer(){
	/* Get the custoemrID entered in the text box */
	var customerID = $('#saleCustomerid').val();

	/* Call the populateCustomerObject.php script to get customer details */
	/* relevant to the customerID which the user entered */
	$.ajax({
		url : 'model/customer/populateCustomerObjects.php',
		method : 'POST',
		data : {customerID:customerID},
		dataType : 'json',
		success : function(data) {
			$('#saleCustomerName').val(data.fullName);
		}
	});
}

/* Function to send vendorID so that vendor objects can be pulled from database */
/* to be displayed on vendor objects tab */
function getPopulateVendor(){
	/* Get the vendorID entered in the text box */
	var vendorID = $('#vendorID').val();

	/* Call the populateVendorObjects.php script to get vendor objects */
	/* relavant to the vendorID with the user entered */
	$.ajax({
		url : 'model/vendor/populateVendorObjects.php',
		method : 'POST',
		data : {vendorID:vendorID},
		datatype : 'json',
		success : function(data){
			$('#vendorFullName').val(data.fullName);
			$('#vednorMobile').val(data.mobile);
			$('#vendorPhone').val(data.phone);
			$('#vendorEmail').val(data.email);
			$('#vendorAddress').val(data.address);
			$('#vendorAddress2').val(data.address2);
			$('#vendorCity').val(data.city);
			$('#vendorDistrict').val(data.district).trigger("chosen:updated");
			$('#vendorStatus').val(data.status).trigger("chosen:updated");
		}
	});
}

/* Function to send purchaseID so that purchase objects can be pulled from database */
/* to be displayed on purchase objects tab */
function getPopulatePurchase() {
	/* Get the purchaseID entered in the text box */
	var purchaseID = $('#purchaseID').val();

	/* Call the populatePurchaseObjects.php script to get item Objects */
	/* relevant to the itemNumber which the user entered */

	$.ajax({
		url : 'model/purchase/populatePurchaseObjects.php',
		method : 'POST',
		dataType : 'json',
		success : function(data) {
			$('#purchaseItemNumber').val(data.itemNumber);
			$('#purchaseDate').val(data.purchaseDate);
			$('#purchaseItemName').val(data.itemName);
			$('#purchaseQuantity').val(data.quantity);
			$('#purchaseUnitPrice').val(data.unitPrice);
			$('#purchaseVendorName').val(data.vendorName).trigger("chosen:updated");
		}
	});
}

/* Functiion to send saleID so that sale objects can be pulled from database */
/* to be displayed on this sale objects tab */
function getPopulateSale(){
	/* Get the saleID entered in the text box */
	var saleID = $('#saleID').val();

	/* Call the populateSaleObjects.php script to get item objects */
	/* relevant to the itemNumber which the user entered */
	$.ajax({
		url : 'model/sale/populateSaleObjects.php',
		method : 'POST',
		data : {itemNumber:itemNumber},
		dataType : 'json',
		success : function(data){
			$('#' + itemNubmerTextbox).val(data.itemName);
		},
		error : function(xhr, ajaxOptions, throwError){
		}
	});
}

/* Function to send itemNumber so that item stock can be pulled from database */
function getPopulateItemStock(itemNumberTextbox, scriptPath, stockTextbox){
	/* Get the  itemNumber entered in the text box */
	var itemNumber = $('#' + itemNumberTextbox).val();

	/* Call the script to get stock details */
	$.ajax({
		url : scriptPath,
		method : 'POST',
		data : {itemNumber:itemNumber},
		dataType : 'json',
		success : function(data) {
			$('#' + stockTextbox).val(data.stock);
		},
		error : function(xhr, ajaxOptions, thrownError) {
		}
	});
}

/* Function to populate last inserted ID */
function populateLastInsert(scriptPath, textBoxID){
	$.ajax({
		url : scriptPath,
		method : 'POST',
		dataType : 'json',
		success : function(data) {
			$('#' + textBoxID).val(data);
		}
	});
}

/* Function to show suggestions */
function showSuggestions(textBoxID, scriptPath, suggestionsDivID){
	/* Get the value entered by the user */
	var textBoxValue = $('#' + textBoxID).val();

	/* Call the showPurchaseID.php script only if there is a value in the  purchase ID textbox */
	if(textBoxValue != '') {
		$.ajax({
			url : scriptPath,
			method : 'POST',
			data : {textBoxValue:textBoxValue},
			success : function(data) {
				$('#' + suggestionDivID).fadeIn();
				$('#' + suggestionDivID).html(data);
			}
		});
	}
}

/* Function to delete item from database */
function deleteItem(){
	/* Get the item number entered by the user */
	var itemNumber = $('#itemNumber').val();

	/* Call the deleteItem.php script only if there is a value in the item number textbox */
	if(itemNumber != '') {
		$.ajax({
			url : 'model/item/deleteItem.php',
			method : 'POST',
			data : {itemNumber:itemNumber},
			success : function(data) {
				$('#itemMessage').fadeIn();
				$('#itemMessage').html(data);
			},
			complete : function(){
				searchTableCreator('itemSearchTableDiv', itemSearchTableCreatorFile,'itemSearchTable');
				reportTableCreator('itemReportTableDiv', itemReportTableCreatorFile,'itemReportTable');
			}
		});
	}
}

/* Function to delete item from database */
function deleteCustomer() {
	/* Gt the customerID entered by the user */
	var customerID = $('#customerID').val();
	/* Call the deleteCustomer.php script only if there is a value in the item number textbox */
	if(customerID != '') {
		$.ajax({
			usrl : 'model/customer/deleteCustomer.php',
			method : 'POST',
			data : {customerID:customerID},			success : function(data) {
				$('#customerMessage').fadeIn();
				$('#customerMessage').html(data);
			},
			complete : function() {
				searchTableCreator('customerSearchTableDiv', customerSearchTableCreatorFile,'customerSearchTable');
				reportTableCreator('customerReportTableDiv', customerReportTableCreatorFile,'customerReportTable');
			}
		});
	}
}

/* Function to delete vendor from database */
function deleteVendor(){
	/* Get the vendorID entered by user */
	var vendorID = $('#vendorID').val();
	/* Call the deleteVendor.php script only if there is a value in the vendor ID textbox */
	if(vendorID != '') {
		$.ajax({
			url : 'model/vendor/deleteVendor.php',
			method : 'POST',
			data : {vendorID:vendorID},
			success : function(data) {
				$('#vendorMessage').fadeIn();
				$('#vendorMessage').html(data);
			},
			complete : function() {
				searchTableCreator('vendorSearchTableDiv', vendorSearchTableCreatorFile,'vendorSearchTable');
				reportTableCreator('vendorReportTableDiv', vendorReportTableCreatorFile,'vendorReportTable');
			}
		});
	}
}

/* Function to send customerID so that customer objects can be pulled form database */
/* to be displayed on customer objects tab */
function getPopulateCustomer(){
	/* Get the customerID entered in the text box */
	var customerID = $('#customerID').val();
	/* Call the populateItemObjects.php script to get item objects */
	//relevant to teh itemNubmer which the user entered
	$.ajax({
		url : 'model/customer/populateCustomerObjects.php',
		method : 'POST',
		data :  {customerID:customerID},
		dataType : 'json',
		success : function(data) {
			$('#customerFullName').val(data.fullName);
			$('#customerMobile').val(data.mobile);
			$('#customerPhone').val(data.mobile);
			$('#customerEmail').val(data.email);
			$('#customerAddress').val(data.address);
			$('#customerAddress2').val(data.address2);
			$('#customerCity').val(data.city);
			$('#customerDistrict').val(data.district).trigger("chosen:updated");
			$('#custoemrStatus').val(data.status).trigger("chosen:updated");
		}
	});
}

/* Function to send customerID so that  customer object can be pulled form database */
/* to be displayed on sale objects tab */
function getPopulateSaleCustomer(){
	/* Get the customerID entered in the text box */
	var customerID = $('#saleCustomerID').val();
	/* Call the populateCustomerObjects.php script to get customer object */
	/* relevant to the customerID which the user entered */
	$.ajax({
		url : 'model/customer/populateCustomerObjects.php',
		method : 'POST',
		data : {customerID:customerID},
		dataType : 'json',
		success : function(data) {
			$('#saleCustomerName').val(data.fullName);
		}
	});
}

/* Function to send vendorID so that vendor objects can be pulled from database */
//to be displayed on vendor objects tab
function getPopulateVendor(){
	/* Get the vendorID entered in the text box */
	var vendorID = $('#vendorID').val();

	/* Call the populateVendorObjects.php script to get vendor object */
	// relevant to the vendorID which the user entered
	$.ajax({
		url : 'model/vendor/populateVendorObjects.php',
		method : 'POST',
		data : {vendorID:vendorID},
		dataType : 'json',
		success : function(data) {
			$('#vendorFullName').val(data.fullName);
			$('#vendorMobile').val(data.mobile);
			$('#vendorPhone').val(data.phone);
			$('#vendorEmail').val(data.email);
			$('#vendorAddress').val(data.email);
			$('#vendorAddress2').val(data.address);
			$('#vendorCity').val(data.city);
			$('#vendorDistrict').val(data.district).trigger("chosen:updated");
			$('#vendorStatus').val(data.status).trigger("chosen:updated");
		}
	});
}

/* Function to send purchaseID so that purchase objects can be pulled from database */
// to be displyed on purchase objects tab
function getPopulatePurchase() {
	/* Get the purchaseID entered in text box */
	var purchaseID = $('#purchaseID').val();

	/* Call the populatePurchaseObjects.php script to get item objects */
	// relevant to the itemNumber which the user entered
	$.ajax({
		url : 'model/purchase/populatePurchaseObjects.php',
		method : 'POST',
		data : {purchaseID:purchaseID},
		dataType : 'json',
		success : function(data) {
			$('#purchaseItemNumber').val(data.itemNumber);
			$('#purchaseDate').val(data.date);
			$('#purchaseItemName').val(data.itemName);
			$('#purchaseQuantity').val(data.Quantity);
			$('#purchaseUnitPrice').val(data.unitPrice);
			$('#purchaseVendor').val(data.vendorNme).trigger("chosen:updated");
		},
		complete : function() {
			calculateTotalPurchase();
			getPopulateItemStock('purchaseItemNumber', getItemStockFile,'purchaseCurrentStock');
		}
	});
}

/* Function to send saleID so that sale objects can be pulled from database */
// to be displayed on sale objects tab
function getPopulateSale() {
	/* Get the saleID entered in the text box */
	var saleID = $('#saleID').val();

	/* Call the populateSaleObjectsf.php script to get item objects */
	// relevant tot he itemNubmer which the user entered
	$.ajax({
		url : 'model/sale/populateSaleObjects.php',
		method : 'POST',
		dataType : 'json',
		success : function(data) {
			$('#saleItemNumber').val(data.itemNumber);
			$('#saleCustomerID').val(data.customerID);
			$('#saleCustomerName').val(data.customerName);
			$('#saleItemName').val(data.itemName);
			$('#saleDate').val(data.Date);
			$('#saleDiscount').val(data.discount);
			$('#saleQuantity').val(data.quanity);
			$('#saleUnitPrice').val(data.unitPrice);
		},
		complete : function() {
			calculateTotalSale();
			getPopulateItemStock('saleItemNumber', getItemStockFile,'saleTotalStock');
		}
	});
}

/* Function to call the updateItemObjects.php script to update item data in database */
function updateItem(){
	/* get field by form */
	var itemNumber = $('#itemNumber').val();
	var itemName = $('#itemName').val();
	var itemDiscount = $('#itemDiscount').val();
	var itemQuantity = $('#itemQuantity').val();
	var itemUnitPrice = $('#itemUnitPrice').val();
	var itemStatus = $('#itemStatus').val();
	var itemDescription = $('#itemDescription').val();

	$.ajax({
		url : 'model/item/updateItem.php',
		method : 'POST',
		data : {
			itemNumber:itemNumber,
			itemName:itemName,
			itemDiscount:itemDiscount,
			itemQuantity:itemQuantity,
			itemUnitPrice:itemUnitPrice,
			itemStatus:itemStatus,
			itemDescription:itemDescription,
		},
		success : function(data) {
			var result = $.parseJSON(data);
			$('#itemMessage').fadeIn();
			$('#itemMessage').html(result.alertMessage);
			if(result.newStok != null ) {
				$('#itemTotalStock').val(result.newStock);
			}
		},
		complete : function() {
			searchTableCreator('itemSearchTableDiv', itemSearchTableCreatorFile,'itemSearchTable');
			searchTableCreator('purchaseSearchTableDiv', purchaseSearchTableCreatorFile,'purchaseSearchTable');
			searchTableCreator('saleSearchTableDiv', saleSearchTableCreatorFile,'saleSearchTable');
			reportTableCreator('itemReportTableDiv', itemReportTableCreatorFile,'itemReportTable');
			reportPurchaseTableCreator('purchaseReportTableDiv', purchaseReportTableFile,'purchaseReportTable');
			reportSaleTableCreator('saleReportTableDiv', saleReportTableCreatorFile,'saleReportTable');
		}
	});
}

/* Function call updateCustomerObject.php script to update customer data in database */
function updateCustomer(){
	var customerID = $('#customerID').val();
	var customerFullName = $('#customerFullName').val();
	var customerMobile = $('#customerMobile').val();
	var customerPhone = $('customerPhone').val();
	var customerAddress = $('customerAddress').val();
	var customerAddress2 = $('customerAddress').val();
	var customerEmail = $('#customerEmail').val();
	var customerCity = $('customerCity').val();
	var customerDistrict = $('customerDistrict').val();
	var customerStatus = $('customerStatus').val();

	$.ajax({
		url : 'model/customer/updateCustomerObjects.php',
		method : 'POST',
		data : {
			customerID:customerID,
			customerFullName:customerFullName,
			customerMobile:customerMobile,
			customerPhone:customerPhone,
			customerAddress:customerAddress,
			customerAddress2:customerAddress2,
			customerEmail:customerEmail,
			customerCity:customerCity,
			customerDistrict:customerDistrict,
			customerStatus:customerStatus,
		},
		success : function(data) {
			$('#customerMessage').fadeIn();
			$('customerMessage').html();
		},
		complete : function() {
			searchTableCreator('customerSearchTableDiv', customerSearchTableCreatorFile,'custonerSearchTable');
			reportTableCreatpr('customerReportTableDiv', customerReportTableCreatorFile,'customerReportTable');
			searchTableCreator('saleSearchTableDiv', saleSearchTableCreatorFile,'saleSearchTable');
			reportSaleTableCreator('saleReportTableDiv', saleReportTableCreatorFile,'saleReportTable');
		}
	});
}

/* function to call the updateSale.php script to update sale data to database */
function updateSale(){
	var saleItemNumber = $('#saleItemNumber').val();
	var saleDate = $('#saleDate').val();
	var saleItemName = $('#saleItemName').val();
	var saleQuantity = $('#saleQuantity').val()
	var saleUnitPrice = $('#saleUnitPrice').val();
	var saleID = $('#saleID').val();
	var saleCustomerName = $('#saleCustomerName').val();
	var saleDiscount = $('#saleDiscount').val();
	var saleCustomerID = $('#saleCustomerID').val()

	$.ajax({
		url : 'model/sale/updateSaleObjects.com',
		method : 'POST',
		data : {
			saleItemNumber:saleItemNumber,
			saleDate:saleDate,
			saleItemName:saleItemName,
			saleQuantity:saleQuantity,
			saleUnitPrice:saleUnitPrice,
			saleID:saleID,
			saleCustomerName:saleCustomerName,
			saleDiscount:saleDiscount,
			saleCustomerID:saleCustomerID,
		},
		success : function(data) {
			$('#saleMessage').fadeIn();
			$('#saleMessage').html(data);
		},
		complete : function(){
			getPopulateItemStock('saleItemNumber', getItemStockFile,'saleTotalStock');
			searchTableCreator('saleSearchTableDiv', saleSearchTableCreatorFile,'saleSearchTable');
			reportSaleTableCreator('saleReportTableDiv', saleReportTableCreatorFile,'saleReportTable');
			searchTableCreator('itemSearchTableDiv', itemSearchTableCreatorFile,'itemSearchTable');
			reportTableCreator('itemReportTableDiv', itemReportTableCreatorFile,'itemReportTable');
		}
	});
}

/* Function to call the updatePurchase.php script to update purchase data the database */
function updatePurchase() {
	var purchaseItemNumber = $('#purchaseItemNumber').val();
	var purchaseDate = $('#purchaseDate').val();
	var purchaseItemName = $('purchaseItemName').val();
	var purchaseQuantity = $('purchaseQuntity').val();
	var purchaseUnitPrice = $('purchaseUnitPrice').val();
	var purchaseID = $('purchaseID').val();
	var purchaseVendorName = $('#purchaseVendorName').val();

	$.ajax({
		url : 'model/purchase/updatePurchaseObjects.php',
		method : 'POST',
		data : {
			purchaseItemNumber:purchaseItemNumber,
			purchaseDate:purchaseDate,
			purchaseItemName:purchaseItemName,
			purchaseQuantity:purchaseQuantity,
			purchaseUnitPrice:purchaseUnitPrice,
			purchaseID:purchaseID,
			purchaseVendorName:purchaseVendorName,
		},
		success : function(data){
			$('#purchaseMessage').fadeIn();
			$('#purcahseMessage').html(data);
		},
		complete : function() {
			getPopulateItemStock('purchaseItemNumber', getItemStockFile,'purchaseCurrentStock');
			searchTableCreator('purchaseReportTableDiv',purchaseSearchTableCreatorFile,'purchaseSearchTable');
			reportPurchaseTableCreator('purchaseReportTableDiv', purchaseReportTableCreatorFile,'purchaseReportTable');
			searchTableCreator('itemSearchTableDiv', itemSearchTableCreatorFile,'itemSearchTable');
			reportTableCreator('itemReportTableDiv', itemReportSearchTableCreatorFile,'itemReportTable');
		}
	});
}

/* Function to call the updateVendor.php script to UPDATE vendor data in database */
function updateVendor(){
	var vendorID = $('#vendorID').val();
	var vendorFullName = $('#vendorFullName').val();
	var vendorMobile = $('#vendorMobile').val();
	var vendorPhone = $('#vendorPhone').val();
	var vendorAddress = $('#vendorAddress').val();
	var vendorAddress = $('#vendorAddress2').val();
	var vendorCity = $('#vendorCity').val();
	var vendorDistrict = $('#vendorDistrict').val();
	var vendorStatus = $('#vendorStatus options:selected').text();

	$.ajax({
		url : 'model/vendor/updateVendorObjects.php',
		method : 'POST',
		data : {
			vendorID:vendorID,
			vendorFullName:vendorFullName,
			vendorMobile:vendorMobile,
			vendorPhone:vendorPhone,
			vendorAddress:vendorAddress,
			vendorAddress2:vendorAddress,
			vendorCity:vendorCity,
			vendorDistrict:vendorDistrict,
			vendorStatus:vendorStatus,
		},
		success : function(data) {
			$('#vendorMessage').fadeIn();
			$('#vendorMessage').html(data);
		},
		complete : function(){
			searchTableCreator('purchaseSearchTableDiv', purchaseSearchTableCreatorFile,'purchaseSearchTable');
			searchTableCreator('vendorSearchTableDiv', vendorSearchTableCreatorFile,'vendorSearchTable');
			reportPurchaseTableCreator('purchaseReportTableDiv', purchaseReportTableCreatorFile,'purchaseReportTable');
			reportTableCreator('vendorReportTableDiv', vendorReportTableCreatorfile,' vendorReportTable');
		}
	});
}
