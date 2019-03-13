module.exports = function (api) {

    api.cache(true)
  
    return {
      presets: [
        '@babel/preset-react',
        '@babel/preset-env'
      ],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-async-generators',
        '@babel/plugin-transform-regenerator',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-optional-chaining' 
      ]
    }
  }
  