const express = require('express');
const router = express.Router();
const db = require('../config/database');

// (R) Read: Menampilkan daftar buku & kategori
router.get('/', async (req, res) => {
  try {
    const [books] = await db.query(`
      SELECT b.*, k.nama_kategori 
      FROM buku b 
      JOIN kategori k ON b.id_kategori = k.id_kategori
    `);
    const [categories] = await db.query('SELECT * FROM kategori');
    res.render('index', { books, categories });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// (C) Create: Tambah buku baru
router.post('/add', async (req, res) => {
  const { judul_buku, penulis, stok_buku, id_kategori } = req.body;
  try {
    // Diubah menjadi 'buku' (huruf kecil)
    await db.query('INSERT INTO buku (judul_buku, penulis, stok_buku, id_kategori) VALUES (?, ?, ?, ?)', 
    [judul_buku, penulis, stok_buku, id_kategori]);
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// (D) Delete: Hapus buku
router.get('/delete/:id', async (req, res) => {
  try {
    // Diubah menjadi 'buku' (huruf kecil)
    await db.query('DELETE FROM buku WHERE id_buku = ?', [req.params.id]);
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// (U) Update: Edit buku
router.post('/update/:id', async (req, res) => {
  const { judul_buku, penulis, stok_buku, id_kategori } = req.body;
  try {
    // Diubah menjadi 'buku' (huruf kecil)
    await db.query(
      'UPDATE buku SET judul_buku=?, penulis=?, stok_buku=?, id_kategori=? WHERE id_buku=?', 
      [judul_buku, penulis, stok_buku, id_kategori, req.params.id]
    );
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});
  
module.exports = router;