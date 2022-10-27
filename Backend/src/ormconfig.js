module.export = {
    'type': 'postgres',
    'url': 'postgres://postgres:test@localhost:5432/postgres',
    'entities': ['src/database/migrations/*{.js,.ts}'],
    'synchronize': true
}