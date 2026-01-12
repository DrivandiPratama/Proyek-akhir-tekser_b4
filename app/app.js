const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});