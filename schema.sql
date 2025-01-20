-- CREATE TABLE demo (
--     id INT AUTO_INCREMENT PRIMARY KEY,       -- Unique identifier for each record
--     station_id INT NOT NULL,                 -- Station or location ID
--     recorded_at DATETIME NOT NULL,           -- Date and time of water level recording
--     water_level FLOAT NOT NULL,              -- Measured water level (in meters or relevant unit)
--     status ENUM('normal', 'warning', 'critical') DEFAULT 'normal', -- Status based on water level
--     notes VARCHAR(255) DEFAULT NULL          -- Additional notes or remarks
-- );

CREATE TABLE water_level_analysis (
    sl_no INT PRIMARY KEY,
    state_ut VARCHAR(255),
    number_of_wells_analysed INT,
    number_rise_0_2_m INT,
    percentage_rise_0_2_m FLOAT,
    number_rise_2_4_m INT,
    percentage_rise_2_4_m FLOAT,
    number_rise_4_m INT,
    percentage_rise_4_m FLOAT,
    number_fall_0_2_m INT,
    percentage_fall_0_2_m FLOAT,
    number_fall_2_4_m INT,
    percentage_fall_2_4_m FLOAT,
    number_fall_4_m INT,
    percentage_fall_4_m FLOAT,
    number_rise INT,
    percentage_rise FLOAT,
    number_fall INT,
    percentage_fall FLOAT,
    number_wells_showing_no_change INT,
    percentage_wells_showing_no_change FLOAT
);

