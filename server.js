const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data', 'games.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readGames() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function writeGames(games) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(games, null, 2));
}

app.get('/api/games', (req, res) => res.json(readGames()));

app.post('/api/games', (req, res) => {
  const games = readGames();
  const game = { id: Date.now(), ...req.body };
  games.push(game);
  writeGames(games);
  res.status(201).json(game);
});

app.put('/api/games/:id', (req, res) => {
  const games = readGames();
  const idx = games.findIndex(g => g.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  games[idx] = { ...games[idx], ...req.body };
  writeGames(games);
  res.json(games[idx]);
});

app.delete('/api/games/:id', (req, res) => {
  let games = readGames();
  const len = games.length;
  games = games.filter(g => g.id != req.params.id);
  if (games.length === len) return res.status(404).json({ error: 'Not found' });
  writeGames(games);
  res.status(204).end();
});

app.listen(3000, '0.0.0.0', () => console.log('Server running on port 3000'));
