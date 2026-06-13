const files = import.meta.glob('/src/content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    let value = line.slice(colon + 1).trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s =>
        s.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1')
      )
    } else {
      value = value.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1')
    }
    data[key] = value
  }

  return { data, content: match[2].trim() }
}

const articles = []
const events = []

for (const [filePath, raw] of Object.entries(files)) {
  const { data, content } = parseFrontmatter(raw)
  const parts = filePath.replace('/src/content/', '').split('/')
  const category = parts[0]
  const id = parts[1].replace('.md', '')

  const entry = { id, ...data, content }

  if (category === 'articles') {
    articles.push(entry)
  } else if (category === 'events') {
    events.push(entry)
  }
}

articles.sort((a, b) => new Date(b.date) - new Date(a.date))
events.sort((a, b) => new Date(b.date) - new Date(a.date))

export function getArticles() {
  return articles
}

export function getArticle(id) {
  return articles.find(a => a.id === id) || null
}

export function getEvents() {
  return events
}
