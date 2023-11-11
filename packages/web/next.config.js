// Importe o dotenv
const { config } = require('dotenv')

// Configure o dotenv
const dotEnv = config().parsed

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ...dotEnv,
  },
}

module.exports = nextConfig