frappe.ui.form.on('Quotation', {
	refresh(frm) {
		// your code here
	}
})

frappe.ui.form.on('Optional', {
	item_code(frm,cdt,cdn) {
       let row = locals[cdt][cdn];
        // get item price list rate and set in rate field with validation date and price list
        if(row.item_code) {
            frappe.db.get_value("Item Price", {"item_code": row.item_code, "price_list": frm.doc.selling_price_list}, "price_list_rate").then(r => {
                if(r.message.price_list_rate) {
                    frappe.model.set_value(cdt, cdn, "selling_rate", r.message.price_list_rate);
                }
                else {
                    frappe.model.set_value(cdt, cdn, "selling_rate", 0);
                }
            });
        }
        else {
            frappe.model.set_value(cdt, cdn, "selling_rate", 0);
        }

	}
})

frappe.ui.form.on('Quotation Item', {
	items_add(frm,cdt,cdn) {
        console.log("items_add");
        let row = locals[cdt][cdn];
        if(row.idx >= 2) {
            frappe.model.set_value(cdt, cdn, "section",frm.doc.items[row.idx-2].section);
        }
    },
    item_code(frm,cdt,cdn) {
        let row = locals[cdt][cdn];
        // get item price list rate and set in rate field with validation date and price list
        if(row.item_code) {
            frappe.db.get_value("Company", frm.doc.company, "price_list").then(company => {
                if(company.message.price_list) {
                    frappe.db.get_value("Item Price", {"item_code": row.item_code, "price_list": company.message.price_list}, "price_list_rate").then(r => {
                        if(r.message.price_list_rate) {
                            frappe.model.set_value(cdt, cdn, "selling_price", r.message.price_list_rate);
                        }
                        else {
                            frappe.model.set_value(cdt, cdn, "selling_price", 0);
                        }

                    });
                }
                else {
                    frappe.model.set_value(cdt, cdn, "selling_price", 0);
                }

            });
           
        }
        else {
            frappe.model.set_value(cdt, cdn, "selling_price", 0);
        }
    },
})