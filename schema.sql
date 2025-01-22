USE pbl_data;

CREATE TABLE IF NOT EXISTS gwl (
    device_id VARCHAR(50) PRIMARY KEY,       -- Unique identifier for each DWLR device
    location_name VARCHAR(100) NOT NULL,    -- Name of the location
    district VARCHAR(100) NOT NULL,         -- District of the location
    state VARCHAR(100) NOT NULL,            -- State of the location
    river_name VARCHAR(100) NOT NULL,       -- River associated with the location
    latitude FLOAT(10, 6) NOT NULL,         -- Latitude coordinate
    longitude FLOAT(10, 6) NOT NULL,        -- Longitude coordinate
    water_level FLOAT(10, 2) NOT NULL,      -- Current water level
    normal_range FLOAT(10, 2) NOT NULL,     -- Normal range of water level
    device_status VARCHAR(50) NOT NULL,     -- Device status (e.g., ACTIVE, FAULTY)
    alert_level VARCHAR(50) NOT NULL        -- Alert level (e.g., NORMAL, WARNING, CRITICAL)
);
