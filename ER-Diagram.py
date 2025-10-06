# ER-Diagram

import graphviz

#Create a directional graph
er = graphviz.Digraph('ER Diagram', format='png')
er.attr(randir='LR') # Optional: horizontal layout

# Entities and attributes 
entities = {
    "Products":[
        "product_id (PK)",
        "sku",
        "name",
        "description",
        "category",
        "unit_price",
        "cost_price"
    ],
    "Suppliers":[
        "supplier_id (PK)",
        "name",
        "contact_email",
        "phone",
        "address"
    ],
    "Customers":[
        "customer_id (PK)",
        "name",
        "contact_email",
        "phone",
        "address"
    ],
    "PurchaseOrders":[
        "purchase_id (PK)",
        "supplier_id (FK)",
        "order_date",
        "status",
        "total_amount"
    ],
    "PurchaseOrderItems":[
        "item_id (PK)",
        "purchase_id (FK)",
        "product_id (FK)",
        "quantity", 
        "unit_price"
    ],
    "SaleOrders":[
        "sale_id (PK)",
        "customer_id (FK)",
        "order_date",
        "status"
    ],
    "SaleOrderItems":[
        "item_id (PK)",
        "sale_id (FK)",
        "product_id (FK)",
        "quantity",
        "unit_price"
    ],
    "InventoryMovement":[
        "inventory_id (PK)",
        "product_id (FK)",
        "location",
        "quantity",
        "last_updated"
    ],
    "InventoryTransactions":[
        "transaction_id (PK)",
        "product_id (FK)",
        "type",
        "quantity",
        "reference",
        "timestamp"
    ],
}

# Add entity nodes with record shape and multiline attributes
for entity, attributes in entities.items():
    label = f"{{{entity}|{'\\l'.join(attributes)}\\l}}"
    er.node(entity, label=label, shape='record')

# Define relationships (parent, child) based on FK
relationships = [
    ("Suppliers", "PurchaseOrders"),
    ("PurchaseOrders", "PurchaseOrderItems"),
    ("Products", "PurchaseOrderItems"),
    ("Customers", "SaleOrders"),
    ("SaleOrders", "SaleOrderItems"),
    ("Products", "SaleOrderItems"),
    ("Products", "InventoryMovement"),
    ("Products", "InventoryTransactions")
]

# Add edges to represent relationships
for parent, child in relationships:
    er.edge(parent, child)

# Render to a file 
er.render('Inventory_er_diagram', format='png', cleanup=True)
