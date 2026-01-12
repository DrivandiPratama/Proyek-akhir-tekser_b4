const express = require('express');
const router = express.Router();
const db = require('../config/database');

// (R) Read: Menampilkan daftar buku & kategori
router.get('/', async (req, res) => {
  try {
    const [books] = await db.query(`
      SELECT b.*, k.nama_kategori 
      FROM Buku b 
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
    await db.query('INSERT INTO Buku (judul_buku, penulis, stok_buku, id_kategori) VALUES (?, ?, ?, ?)', 
    [judul_buku, penulis, stok_buku, id_kategori]);
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// (D) Delete: Hapus buku
router.get('/delete/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM Buku WHERE id_buku = ?', [req.params.id]);
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;