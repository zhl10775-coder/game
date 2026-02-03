const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

const rooms = new Map();

const createRoomCode = () => String(Math.floor(100000 + Math.random() * 900000));

const ensureRoom = (code) => {
  if (!rooms.has(code)) {
    rooms.set(code, {
      code,
      name: `房间${code}`,
      hasPassword: false,
      password: '',
      players: [
        { id: 1, name: '玩家1', ready: true, isHost: true },
        { id: 2, name: '玩家2', ready: false, isHost: false },
      ],
    });
  }
  return rooms.get(code);
};

const serializeRoom = (room) => ({
  code: room.code,
  name: room.name,
  hasPassword: room.hasPassword,
  players: room.players.length,
});

app.get('/api/rooms', (req, res) => {
  if (rooms.size === 0) {
    ensureRoom('897654');
    ensureRoom('123456');
  }
  const list = Array.from(rooms.values()).map(serializeRoom);
  res.json({ rooms: list });
});

app.post('/api/rooms', (req, res) => {
  const { name, password } = req.body;
  const code = createRoomCode();
  const room = {
    code,
    name: name || `房间${code}`,
    hasPassword: Boolean(password),
    password: password || '',
    players: [{ id: 1, name: '房主', ready: true, isHost: true }],
  };
  rooms.set(code, room);
  res.json({ room: serializeRoom(room) });
});

app.get('/api/rooms/:code', (req, res) => {
  const room = ensureRoom(req.params.code);
  const playersList = [...room.players];
  while (playersList.length < 4) {
    playersList.push({ empty: true });
  }
  res.json({
    room: {
      code: room.code,
      name: room.name,
      hasPassword: room.hasPassword,
      isHost: true,
      playersList,
    },
  });
});

app.post('/api/rooms/:code/join', (req, res) => {
  const room = ensureRoom(req.params.code);
  if (room.players.length >= 4) {
    return res.status(400).json({ error: 'room_full' });
  }
  const id = room.players.length + 1;
  room.players.push({ id, name: `玩家${id}`, ready: false, isHost: false });
  res.json({ room: serializeRoom(room) });
});

app.post('/api/rooms/:code/leave', (req, res) => {
  const room = ensureRoom(req.params.code);
  room.players.pop();
  if (room.players.length === 0) {
    rooms.delete(room.code);
  }
  res.json({ ok: true });
});

app.use(express.static(path.join(__dirname, '..', 'client')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
