
const extensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
extensions.forEach(ext => {
  require.extensions[ext] = (module, filename) => {
    module.exports = filename;
  };
});
