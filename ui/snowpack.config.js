module.exports = {
  mount: {
    public: '/',
    src: '/_dist_'
  },
  plugins: [
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-vue',
    ['@snowpack/plugin-build-script', { cmd: 'postcss', input: ['.css'], output: ['.css'] }]
  ]
}
