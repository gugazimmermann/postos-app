const listeners = {};

export const on = (ev, cb) => {
  if (!listeners[ev]) {
    listeners[ev] = [];
  }
  listeners[ev].push(cb);
};

export const off = (ev, cb) => {
  const idx = listeners[ev].indexOf(cb);
  if (idx !== -1) {
    listeners[ev].splice(idx, 1);
  }
};

export const trigger = (ev, data) => {
  if (listeners[ev]) {
    listeners[ev].forEach((cb) => {
      cb(data);
    });
  }
};
