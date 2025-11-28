-- Inventory Management System Database Schema for PostgreSQL
-- Notes: use timestamptz for timestamps, fix nullable FK columns, add inventory uniqueness,
-- add trigger to maintain updated_at, and add common indexes for FKs.

-- Trigger function to keep updated_at current
CREATE OR REPLACE FUNCTION ims_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = CURRENT_TIMESTAMP;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Users
CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	full_name VARCHAR(100) NOT NULL,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	status VARCHAR(20) NOT NULL DEFAULT 'Active',
	role VARCHAR(20) NOT NULL DEFAULT 'Employee',
	last_login_at TIMESTAMPTZ NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_at TIMESTAMPTZ DEFAULT NULL,
	CONSTRAINT chk_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
	CONSTRAINT chk_user_status CHECK (status IN ('Active', 'Inactive', 'Suspended')),
	CONSTRAINT chk_user_role CHECK (role IN ('Admin', 'Manager', 'Employee'))
);

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION ims_set_updated_at();


-- Suppliers
CREATE TABLE suppliers (
	supplier_id SERIAL PRIMARY KEY,
	supplier_name VARCHAR(255) NOT NULL,
	email VARCHAR(150) UNIQUE,
	phone VARCHAR(20),
	address VARCHAR(255) NOT NULL,
	status VARCHAR(10) NOT NULL DEFAULT 'Active',
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_at TIMESTAMPTZ DEFAULT NULL,
	CONSTRAINT chk_supplier_status CHECK (status IN ('Active', 'Inactive'))
);

CREATE TRIGGER trg_suppliers_updated_at
BEFORE UPDATE ON suppliers FOR EACH ROW EXECUTE FUNCTION ims_set_updated_at();


-- Vendors
CREATE TABLE vendors (
	vendor_id SERIAL PRIMARY KEY,
	vendor_name VARCHAR(255) NOT NULL,
	email VARCHAR(150) UNIQUE,
	phone VARCHAR(20),
	address VARCHAR(255),
	status VARCHAR(10) NOT NULL DEFAULT 'Active',
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_at TIMESTAMPTZ DEFAULT NULL,
	CONSTRAINT chk_vendor_status CHECK (status IN ('Active', 'Inactive'))
);

CREATE TRIGGER trg_vendors_updated_at
BEFORE UPDATE ON vendors FOR EACH ROW EXECUTE FUNCTION ims_set_updated_at();


-- Categories
CREATE TABLE categories (
	category_id SERIAL PRIMARY KEY,
	category_name VARCHAR(255) NOT NULL UNIQUE,
	description TEXT,
	status VARCHAR(20) NOT NULL DEFAULT 'Active',
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_at TIMESTAMPTZ DEFAULT NULL,
	CONSTRAINT chk_category_status CHECK (status IN ('Active', 'Inactive'))
);

CREATE TRIGGER trg_categories_updated_at
BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION ims_set_updated_at();


-- Products
CREATE TABLE products (
	product_id SERIAL PRIMARY KEY,
	sku VARCHAR(100) NOT NULL UNIQUE,
	product_name VARCHAR(255) NOT NULL,
	description TEXT,
	cost_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
	sale_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
	quantity INTEGER NOT NULL DEFAULT 0,
	category_id INTEGER NULL REFERENCES categories(category_id) ON DELETE SET NULL,
	vendor_id INTEGER NULL REFERENCES vendors(vendor_id) ON DELETE SET NULL,
	status VARCHAR(20) NOT NULL DEFAULT 'Available',
	product_image_url VARCHAR(255),
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_at TIMESTAMPTZ NULL DEFAULT NULL,
	CONSTRAINT chk_product_status CHECK (status IN ('Available', 'Out of Stock', 'Discontinued'))
);

CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION ims_set_updated_at();


-- Customers
CREATE TABLE customers (
	customer_id SERIAL PRIMARY KEY,
	full_name VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE,
	mobile VARCHAR(15) UNIQUE NOT NULL,
	phone VARCHAR(15),
	address VARCHAR(255) NOT NULL,
	city VARCHAR(50),
	state VARCHAR(50) NOT NULL,
	status VARCHAR(10) NOT NULL DEFAULT 'Active',
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_at TIMESTAMPTZ DEFAULT NULL,
	CONSTRAINT chk_customer_status CHECK (status IN ('Active', 'Inactive'))
);

CREATE TRIGGER trg_customers_updated_at
BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION ims_set_updated_at();


-- Inventories
CREATE TABLE inventories (
	inventory_id SERIAL PRIMARY KEY,
	product_id INT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
	quantity INT NOT NULL DEFAULT 0 CHECK (quantity >= 0),
	min_stock_level INT NOT NULL DEFAULT 0 CHECK (min_stock_level >= 0),
	max_stock_level INT NOT NULL DEFAULT 1000 CHECK (max_stock_level >= min_stock_level),
	last_updated TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT uq_inventories_product UNIQUE (product_id)
);


-- Stock movements
CREATE TABLE stock_movements (
	movement_id SERIAL PRIMARY KEY,
	product_id INT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
	movement_type VARCHAR(10) NOT NULL,
	quantity INT NOT NULL CHECK (quantity > 0),
	source_reference VARCHAR(100),
	movement_reason TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT chk_movement_type CHECK (movement_type IN ('IN', 'OUT'))
);


-- Purchase orders
CREATE TABLE purchase_orders (
	purchase_order_id SERIAL PRIMARY KEY,
	supplier_id INTEGER NOT NULL REFERENCES suppliers(supplier_id) ON DELETE RESTRICT,
	order_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	expected_delivery_date TIMESTAMPTZ,
	status VARCHAR(20) NOT NULL DEFAULT 'Pending',
	total_amount NUMERIC(12,2) NOT NULL DEFAULT 0.00 CHECK (total_amount >= 0),
	note TEXT,
	currency VARCHAR(10) NOT NULL DEFAULT 'USD',
	is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
	deleted_at TIMESTAMPTZ DEFAULT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT chk_po_status CHECK (status IN ('Pending', 'Approved', 'Shipped', 'Delivered', 'Cancelled')),
	CONSTRAINT chk_expected_delivery_date CHECK (expected_delivery_date IS NULL OR expected_delivery_date >= order_date)
);

CREATE TRIGGER trg_purchase_orders_updated_at
BEFORE UPDATE ON purchase_orders FOR EACH ROW EXECUTE FUNCTION ims_set_updated_at();


-- Purchase order items
CREATE TABLE purchase_order_items (
	purchase_order_item_id SERIAL PRIMARY KEY,
	purchase_order_id INT NOT NULL REFERENCES purchase_orders(purchase_order_id) ON DELETE CASCADE,
	product_id INT NOT NULL REFERENCES products(product_id) ON DELETE RESTRICT,
	quantity INT NOT NULL CHECK (quantity > 0),
	unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
	discount NUMERIC(5,2) DEFAULT 0 CHECK (discount >= 0 AND discount <= 100),
	tax NUMERIC(5,2) DEFAULT 0 CHECK (tax >= 0 AND tax <= 100),
	total_price NUMERIC(16,2) GENERATED ALWAYS AS (quantity * unit_price * (1 - discount/100) * (1 + tax/100)) STORED,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT uq_po_product UNIQUE (purchase_order_id, product_id)
);

CREATE TRIGGER trg_purchase_order_items_updated_at
BEFORE UPDATE ON purchase_order_items FOR EACH ROW EXECUTE FUNCTION ims_set_updated_at();


-- Sale orders
CREATE TABLE sale_orders (
	sale_order_id SERIAL PRIMARY KEY,
	customer_id INT REFERENCES customers(customer_id) ON DELETE SET NULL,
	order_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled')),
	total_amount NUMERIC(12,2) DEFAULT 0.00 CHECK (total_amount >= 0),
	note TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_sale_orders_updated_at
BEFORE UPDATE ON sale_orders FOR EACH ROW EXECUTE FUNCTION ims_set_updated_at();


-- Sale order items
CREATE TABLE sale_order_items (
	id SERIAL PRIMARY KEY,
	sale_order_id INT REFERENCES sale_orders(sale_order_id) ON DELETE CASCADE,
	product_id INT NOT NULL REFERENCES products(product_id) ON DELETE RESTRICT,
	quantity INT NOT NULL CHECK (quantity > 0),
	unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
	total_price NUMERIC(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- Indexes for common lookups (FKs and soft-delete)
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_vendor_id ON products(vendor_id);
CREATE INDEX idx_inventories_product_id ON inventories(product_id);
CREATE INDEX idx_purchase_orders_supplier_id ON purchase_orders(supplier_id);
CREATE INDEX idx_purchase_order_items_purchase_order_id ON purchase_order_items(purchase_order_id);
CREATE INDEX idx_sale_orders_customer_id ON sale_orders(customer_id);

-- Optional: partial indexes to accelerate "WHERE deleted_at IS NULL" queries
CREATE INDEX idx_active_products ON products(product_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_active_categories ON categories(category_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_active_suppliers ON suppliers(supplier_id) WHERE deleted_at IS NULL;
