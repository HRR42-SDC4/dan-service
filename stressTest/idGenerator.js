module.exports = {
    generateId: generateId
  }

function generateId(context, events, done) {
  context.vars['id'] = Math.floor(Math.random() * (100) + 1);
  return done()
}
