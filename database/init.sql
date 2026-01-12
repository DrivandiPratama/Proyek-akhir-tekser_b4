CREATE TABLE IF NOT EXISTS kategori (
    id_kategori INT AUTO_INCREMENT PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS buku (
    id_buku INT AUTO_INCREMENT PRIMARY KEY,
    judul_buku VARCHAR(255) NOT NULL,
    penulis VARCHAR(100) NOT NULL,
    stok_buku INT DEFAULT 0,
    id_kategori INT,
    FOREIGN KEY (id_kategori) REFERENCES kategori(id_kategori) ON DELETE SET NULL
);

INSERT INTO kategori (nama_kategori) VALUES ('Sains'), ('Novel'), ('Sejarah');
INSERT INTO buku (judul_buku, penulis, stok_buku, id_kategori) VALUES 
('Laskar Pelangi', 'Andrea Hirata', 10, 2),
('A Brief History of Time', 'Stephen Hawking', 5, 1);