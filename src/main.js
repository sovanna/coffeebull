const spawn = require('child_process').spawn;
const path = require('path');

const {
  app,
  Menu,
  Tray
} = require('electron');

const _pathIcon0 = `${path.join(__dirname, 'images', 'InactiveTemplate.png')}`;
const _pathIcon1 = `${path.join(__dirname, 'images', 'ActiveTemplate.png')}`;

const _contextMenu = Menu.buildFromTemplate([
  {
    label: 'Coffeebull',
    type: 'normal'
  },
  {
    type: 'separator'
  },
  {
    label: 'deactivated',
    type: 'checkbox',
    checked: true,
    click: (menuItem) => {
      caffeinate(menuItem, false);
    }
  },
  {
    type: 'separator'
  },
  {
    label: '15 shorts',
    type: 'checkbox',
    click: (menuItem) => {
      caffeinate(menuItem, 15 * 60);
    }
  },
  {
    label: '30 shorts',
    type: 'checkbox',
    click: (menuItem) => {
      caffeinate(menuItem, 30 * 60);
    }
  },
  {
    type: 'separator'
  },
  {
    label: '1 long',
    type: 'checkbox',
    click: (menuItem) => {
      caffeinate(menuItem, 60 * 60);
    }
  },
  {
    label: '3 longs',
    type: 'checkbox',
    click: (menuItem) => {
      caffeinate(menuItem, 3 * 60 * 60);
    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Unlimited',
    type: 'checkbox',
    click: (menuItem) => {
      caffeinate(menuItem, -1);
    }
  },
  {
    type: 'separator'
  },
  {
    type: 'normal',
    label: 'Quit',
    role: 'quit',
    accelerator: 'Command+Q'
  }
]);

const _child_process = [];

let _tray;

function spawn_caffeinate(time) {
  if (time === -1) {
    return spawn('nice', ['-n', '20', 'caffeinate', '-d']);
  }

  return spawn('nice', ['-n', '20', 'caffeinate', '-d', '-t', time]);
}

function unCheckedItems(items, itemUnChange) {
  items.map((item) => {
    if (item.type === 'checkbox') {
      item.checked = !(item.label !== itemUnChange.label);
    }

    return item;
  });
}

function caffeinate(menuItem, time) {
  let _cp;

  unCheckedItems(_contextMenu.items, menuItem);

  _child_process.forEach((_child) => {
    _child.kill();
  });

  if (!time) {
    return _tray.setImage(_pathIcon0);
  }

  _cp = spawn_caffeinate(time);

  _cp.on('close', (code) => {
    if (code === 0) {
      unCheckedItems(_contextMenu.items, _contextMenu.items[2]);

      _tray.setImage(_pathIcon0);
    }
  });

  _child_process.push(_cp);

  _tray.setImage(_pathIcon1);
}

function appOnReadyCreateTray() {
  _tray = new Tray(_pathIcon0);

  _tray.setToolTip('Coffeebull');
  _tray.setContextMenu(_contextMenu);

  // unlimited by default
  caffeinate(_contextMenu.items[10], -1);
}

function onExit() {
  _child_process.forEach((_child) => {
    _child.kill();
  });
}

process.on('exit', onExit);
process.on('SIGINT', onExit);
process.on('uncaughtException', onExit);

app.on('ready', appOnReadyCreateTray);
