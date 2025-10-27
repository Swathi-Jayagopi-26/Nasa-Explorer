const store = new Map();

function set(key, value, ttlSec = 60) {
  const expires = Date.now() + ttlSec * 1000;
  store.set(key, { value, expires });
}

function get(key) {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    store.delete(key);
    return null;
  }
  return entry.value;
}

module.exports = { set, get };
