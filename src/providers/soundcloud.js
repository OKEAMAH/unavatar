'use strict'

const PCancelable = require('p-cancelable')
const cheerio = require('cheerio')

const getHTML = require('../util/html-get')

module.exports = PCancelable.fn(async function soundcloud (
  { input },
  onCancel
) {
  const promise = getHTML(`https://soundcloud.com/${input}`)
  onCancel(() => promise.onCancel())
  const { html } = await promise
  const $ = cheerio.load(html, { xmlMode: true })
  return $('meta[property="og:image"]').attr('content')
})

module.exports.supported = {
  email: false,
  username: true,
  domain: false
}
