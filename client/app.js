const navItems = document.querySelectorAll('.nav-item');
const panels = {
  upgrade: document.getElementById('upgrade-panel'),
  skills: document.getElementById('skills-panel'),
  info: document.getElementById('info-panel'),
};
const pvpModal = document.getElementById('pvp-modal');
const mapLines = document.getElementById('map-lines');
const mapNodes = document.getElementById('map-nodes');
const modeLabel = document.getElementById('mode-label');
const modeDetail = document.getElementById('mode-detail');
const statusPill = document.getElementById('status-pill');
const toast = document.getElementById('toast');
const roomList = document.getElementById('room-list');
const playerList = document.getElementById('player-list');
const hostTransfer = document.getElementById('host-transfer');
const lobbyName = document.getElementById('lobby-name');
const lobbyCode = document.getElementById('lobby-code');
const countdown = document.getElementById('countdown');
const countdownValue = document.getElementById('countdown-value');
const matchmakingText = document.getElementById('matchmaking-text');
const matchmakingBar = document.getElementById('matchmaking-bar');
const matchmakingDots = document.querySelectorAll('.matchmaking-dots .dot');
const switchMapBtn = document.getElementById('switch-map');
const startAttackBtn = document.getElementById('start-attack');
const copyRoomBtn = document.getElementById('copy-room');
const confirmCreateBtn = document.getElementById('confirm-create');
const confirmPasswordBtn = document.getElementById('confirm-password');
const leaveRoomBtn = document.getElementById('leave-room');
const startBattleBtn = document.getElementById('start-battle');
const toggleReadyBtn = document.getElementById('toggle-ready');
const quickJoinBtn = document.getElementById('quick-join');
const roomPasswordToggle = document.getElementById('room-password-toggle');
const roomPasswordField = document.getElementById('room-password-field');
const roomPasswordInput = document.getElementById('room-password');
const roomNameInput = document.getElementById('room-name');
const roomCodeInput = document.getElementById('room-code');
const quickCodeInput = document.getElementById('quick-code');
const joinPasswordInput = document.getElementById('join-password');

const closeTargets = document.querySelectorAll('[data-close]');
const openTargets = document.querySelectorAll('[data-open]');

const overlayIds = [
  'pvp-modal',
  'matchmaking',
  'create-room',
  'join-room',
  'password-modal',
  'room-lobby',
  'upgrade-panel',
  'skills-panel',
  'info-panel',
];

const state = {
  selectedNodeId: null,
  playerCount: 2,
  lobby: null,
  matchmakingCount: 1,
  mapLayout: null,
  ready: false,
};

const mapLayouts = {
  2: {
    nodes: [
      { id: 'p1', type: 'core', owner: 'player', x: 20, y: 60, value: 50 },
      { id: 'n1', type: 'normal', owner: 'neutral', x: 40, y: 45, value: 16 },
      { id: 'r1', type: 'resource', owner: 'neutral', x: 50, y: 30, value: '◆' },
      { id: 'n2', type: 'normal', owner: 'neutral', x: 60, y: 45, value: 18 },
      { id: 'p2', type: 'core', owner: 'enemy', x: 80, y: 60, value: 45 },
    ],
    links: [
      ['p1', 'n1'],
      ['n1', 'r1'],
      ['r1', 'n2'],
      ['n2', 'p2'],
    ],
  },
  3: {
    nodes: [
      { id: 'p1', type: 'core', owner: 'player', x: 20, y: 65, value: 50 },
      { id: 'p2', type: 'core', owner: 'ally', x: 80, y: 65, value: 45 },
      { id: 'p3', type: 'core', owner: 'enemy', x: 50, y: 15, value: 42 },
      { id: 'n1', type: 'normal', owner: 'neutral', x: 35, y: 45, value: 12 },
      { id: 'n2', type: 'normal', owner: 'neutral', x: 65, y: 45, value: 14 },
      { id: 'n3', type: 'normal', owner: 'neutral', x: 50, y: 35, value: 20 },
      { id: 'r1', type: 'resource', owner: 'neutral', x: 50, y: 55, value: '◆' },
      { id: 'r2', type: 'resource', owner: 'neutral', x: 50, y: 25, value: '◆' },
      { id: 'n4', type: 'normal', owner: 'neutral', x: 50, y: 50, value: 16 },
    ],
    links: [
      ['p1', 'n1'],
      ['p2', 'n2'],
      ['p3', 'n3'],
      ['n1', 'r1'],
      ['n2', 'r1'],
      ['n3', 'r2'],
      ['r1', 'n4'],
      ['n4', 'r2'],
    ],
  },
  4: {
    nodes: [
      { id: 'p1', type: 'core', owner: 'player', x: 20, y: 70, value: 50 },
      { id: 'p2', type: 'core', owner: 'ally', x: 80, y: 70, value: 45 },
      { id: 'p3', type: 'core', owner: 'enemy', x: 20, y: 20, value: 44 },
      { id: 'p4', type: 'core', owner: 'enemy', x: 80, y: 20, value: 43 },
      { id: 'n1', type: 'normal', owner: 'neutral', x: 35, y: 50, value: 14 },
      { id: 'n2', type: 'normal', owner: 'neutral', x: 65, y: 50, value: 15 },
      { id: 'n3', type: 'normal', owner: 'neutral', x: 50, y: 35, value: 16 },
      { id: 'n4', type: 'normal', owner: 'neutral', x: 50, y: 65, value: 18 },
      { id: 'r1', type: 'resource', owner: 'neutral', x: 50, y: 50, value: '◆' },
      { id: 'r2', type: 'resource', owner: 'neutral', x: 35, y: 35, value: '◆' },
      { id: 'r3', type: 'resource', owner: 'neutral', x: 65, y: 35, value: '◆' },
      { id: 'n5', type: 'normal', owner: 'neutral', x: 50, y: 80, value: 12 },
      { id: 'n6', type: 'normal', owner: 'neutral', x: 50, y: 20, value: 12 },
    ],
    links: [
      ['p1', 'n1'],
      ['p2', 'n2'],
      ['p3', 'n3'],
      ['p4', 'n3'],
      ['n1', 'r1'],
      ['n2', 'r1'],
      ['r1', 'n3'],
      ['r1', 'n4'],
      ['n4', 'n5'],
      ['n3', 'n6'],
      ['r2', 'n1'],
      ['r3', 'n2'],
    ],
  },
};

const showToast = (message) => {
  toast.textContent = message;
  toast.hidden = false;
  setTimeout(() => {
    toast.hidden = true;
  }, 2000);
};

const hideAllOverlays = () => {
  overlayIds.forEach((id) => {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.add('hidden');
    }
  });
};

const renderMap = (count) => {
  const layout = mapLayouts[count];
  if (!layout) return;

  state.mapLayout = layout;
  mapLines.innerHTML = '';
  mapNodes.innerHTML = '';

  layout.links.forEach(([fromId, toId]) => {
    const from = layout.nodes.find((node) => node.id === fromId);
    const to = layout.nodes.find((node) => node.id === toId);
    if (!from || !to) return;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', from.x);
    line.setAttribute('y1', from.y);
    line.setAttribute('x2', to.x);
    line.setAttribute('y2', to.y);
    line.classList.add('active');
    line.dataset.from = fromId;
    line.dataset.to = toId;
    mapLines.appendChild(line);
  });

  layout.nodes.forEach((node) => {
    const nodeEl = document.createElement('div');
    nodeEl.className = `node ${node.type} ${node.owner}`;
    nodeEl.style.setProperty('--x', `${node.x}%`);
    nodeEl.style.setProperty('--y', `${node.y}%`);
    nodeEl.dataset.nodeId = node.id;
    nodeEl.innerHTML = `<span class="node-label">${node.value}</span>`;
    nodeEl.addEventListener('click', () => handleNodeClick(node.id));
    mapNodes.appendChild(nodeEl);
  });

  state.selectedNodeId = null;
  updateModeLabel();
};

const handleNodeClick = (nodeId) => {
  const nodes = mapNodes.querySelectorAll('.node');
  nodes.forEach((node) => node.classList.remove('selected'));
  mapLines.querySelectorAll('line').forEach((line) => line.classList.remove('highlight'));
  const selected = mapNodes.querySelector(`[data-node-id="${nodeId}"]`);
  if (selected) {
    selected.classList.add('selected');
    state.selectedNodeId = nodeId;
    mapLines.querySelectorAll('line').forEach((line) => {
      if (line.dataset.from === nodeId || line.dataset.to === nodeId) {
        line.classList.add('highlight');
      }
    });
  }
};

const updateModeLabel = () => {
  modeLabel.textContent = `PVP 房间`;
  modeDetail.textContent = `${state.playerCount}人 · 房间号 897654`;
};

const renderRoomList = (rooms = []) => {
  roomList.innerHTML = '';
  const header = document.createElement('div');
  header.className = 'list-header';
  header.innerHTML = '<strong>可加入房间</strong><button class="action-button" id="refresh-rooms">刷新</button>';
  roomList.appendChild(header);
  rooms.forEach((room) => {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <div>
        <strong>${room.name}</strong>
        <p>房间号：${room.code}</p>
      </div>
      <div class="list-meta">${room.players}/4 ${room.hasPassword ? '🔒' : ''}</div>
      <button class="action-button primary" data-room="${room.code}">加入</button>
    `;
    item.querySelector('button').addEventListener('click', () => handleJoinRoom(room));
    roomList.appendChild(item);
  });
  roomList.querySelector('#refresh-rooms')?.addEventListener('click', fetchRooms);
};

const renderLobby = (room) => {
  lobbyName.textContent = room.name;
  lobbyCode.textContent = `房间号：${room.code} ${room.hasPassword ? '🔒' : ''}`;
  playerList.innerHTML = '';
  room.playersList.forEach((player) => {
    const item = document.createElement('div');
    item.className = `player-item ${player.isHost ? 'host' : ''}`;
    if (player.empty) {
      item.classList.add('empty');
      item.innerHTML = `
        <div class="player-avatar">+</div>
        <div class="player-status">
          <strong>等待加入</strong>
          <span>空位</span>
        </div>
      `;
    } else {
      item.innerHTML = `
        <div class="player-avatar">${player.id}</div>
        <div class="player-status">
          <strong>${player.isHost ? '房主' : player.ready ? '准备中' : '未准备'}</strong>
          <span>${player.name}</span>
        </div>
      `;
      if (room.isHost && !player.isHost) {
        const kickBtn = document.createElement('button');
        kickBtn.className = 'action-button danger small';
        kickBtn.textContent = '踢人';
        kickBtn.addEventListener('click', () => showToast('已将玩家踢出房间'));
        item.appendChild(kickBtn);
      } else if (player.isHost) {
        const tag = document.createElement('span');
        tag.className = 'player-tag';
        tag.textContent = '房主';
        item.appendChild(tag);
      }
    }
    playerList.appendChild(item);
  });
};

const updateMatchmaking = (count) => {
  matchmakingText.textContent = `${count}/4`;
  matchmakingBar.style.width = `${(count / 4) * 100}%`;
  matchmakingDots.forEach((dot, index) => {
    dot.classList.toggle('active', index < count);
  });
};

const apiFetch = async (path, options) => {
  try {
    const response = await fetch(path, options);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

const fetchRooms = async () => {
  const data = await apiFetch('/api/rooms');
  if (!data) {
    renderRoomList([
      { name: '好友对战1局', code: '897654', players: 2, hasPassword: true },
      { name: '随便玩玩', code: '123456', players: 1, hasPassword: false },
    ]);
    return;
  }
  renderRoomList(data.rooms);
};

const handleJoinRoom = async (room) => {
  if (room.hasPassword) {
    hideAllOverlays();
    document.getElementById('password-modal').classList.remove('hidden');
    return;
  }
  await loadLobby(room.code);
};

const loadLobby = async (code) => {
  const data = await apiFetch(`/api/rooms/${code}`);
  const fallback = {
    name: '好友对战1局',
    code,
    hasPassword: true,
    isHost: true,
    playersList: [
      { id: 1, name: '玩家1', ready: true, isHost: true },
      { id: 2, name: '玩家2', ready: false, isHost: false },
      { id: 3, name: '玩家3', ready: true, isHost: false },
      { empty: true },
    ],
  };
  state.lobby = data?.room ?? fallback;
  renderLobby(state.lobby);
  hideAllOverlays();
  document.getElementById('room-lobby').classList.remove('hidden');
};

const startCountdown = () => {
  let value = 3;
  countdown.hidden = false;
  countdownValue.textContent = value;
  statusPill.textContent = '即将开战';
  const timer = setInterval(() => {
    value -= 1;
    if (value <= 0) {
      clearInterval(timer);
      countdown.hidden = true;
      statusPill.textContent = '战斗中';
      showToast('已进入战斗地图');
      return;
    }
    countdownValue.textContent = value;
  }, 1000);
};

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navItems.forEach((nav) => nav.classList.remove('active'));
    item.classList.add('active');

    const panel = item.dataset.panel;
    if (panel === 'battle') {
      hideAllOverlays();
      pvpModal.classList.remove('hidden');
      return;
    }

    hideAllOverlays();
    if (panels[panel]) {
      panels[panel].classList.remove('hidden');
    }
  });
});

closeTargets.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.close;
    const element = document.getElementById(target);
    if (element) {
      element.classList.add('hidden');
    }
  });
});

openTargets.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.open;
    const element = document.getElementById(target);
    if (element) {
      hideAllOverlays();
      element.classList.remove('hidden');
      if (target === 'matchmaking') {
        updateMatchmaking(state.matchmakingCount);
      }
    }
  });
});

roomPasswordToggle?.addEventListener('change', (event) => {
  if (event.target.checked) {
    roomPasswordField.classList.remove('hidden');
  } else {
    roomPasswordField.classList.add('hidden');
  }
});

switchMapBtn?.addEventListener('click', () => {
  const next = state.playerCount === 4 ? 2 : state.playerCount + 1;
  state.playerCount = next;
  renderMap(next);
  showToast(`切换至 ${next} 人地图`);
});

startAttackBtn?.addEventListener('click', () => {
  if (!state.selectedNodeId) {
    showToast('请先选择己方节点');
    return;
  }
  const selected = mapNodes.querySelector(`[data-node-id="${state.selectedNodeId}"]`);
  if (selected) {
    selected.classList.add('attacking');
    setTimeout(() => selected.classList.remove('attacking'), 1200);
  }
  showToast('已派出兵力进行扩张');
});

copyRoomBtn?.addEventListener('click', () => {
  navigator.clipboard.writeText(roomCodeInput.value).then(() => {
    showToast('邀请码已复制');
  });
});

confirmCreateBtn?.addEventListener('click', async () => {
  const name = roomNameInput.value.trim();
  if (name.length < 2) {
    showToast('请输入2-10字房间名');
    return;
  }
  const payload = {
    name,
    password: roomPasswordToggle.checked ? roomPasswordInput.value : '',
  };
  const data = await apiFetch('/api/rooms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const code = data?.room?.code ?? roomCodeInput.value;
  await loadLobby(code);
});

confirmPasswordBtn?.addEventListener('click', async () => {
  if (!joinPasswordInput.value) {
    showToast('请输入房间密码');
    return;
  }
  await loadLobby('897654');
});

quickJoinBtn?.addEventListener('click', async () => {
  if (!quickCodeInput.value) {
    showToast('请输入房间号');
    return;
  }
  await loadLobby(quickCodeInput.value);
});

leaveRoomBtn?.addEventListener('click', () => {
  hostTransfer.hidden = false;
  setTimeout(() => {
    hostTransfer.hidden = true;
  }, 3000);
  hideAllOverlays();
  pvpModal.classList.remove('hidden');
});

startBattleBtn?.addEventListener('click', () => {
  startCountdown();
});

toggleReadyBtn?.addEventListener('click', () => {
  state.ready = !state.ready;
  toggleReadyBtn.textContent = state.ready ? '取消准备' : '准备';
  toggleReadyBtn.classList.toggle('success', state.ready);
  showToast(state.ready ? '已进入准备状态' : '已取消准备');
});

let matchmakingInterval = null;
const startMatchmakingTicker = () => {
  if (matchmakingInterval) return;
  matchmakingInterval = setInterval(() => {
    state.matchmakingCount = Math.min(4, state.matchmakingCount + 1);
    updateMatchmaking(state.matchmakingCount);
    if (state.matchmakingCount === 4) {
      clearInterval(matchmakingInterval);
      matchmakingInterval = null;
    }
  }, 1500);
};

const init = () => {
  renderMap(state.playerCount);
  fetchRooms();
  updateMatchmaking(state.matchmakingCount);
  startMatchmakingTicker();
  pvpModal.classList.remove('hidden');
};

init();
