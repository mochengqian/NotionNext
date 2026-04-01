import EVIDENCE_CONFIG from './evidence.config'

const normalizeText = value => String(value || '').toLowerCase().trim()

const postText = post =>
  normalizeText(
    [
      post?.title,
      post?.summary,
      post?.category,
      post?.slug,
      ...(post?.tags || [])
    ]
      .filter(Boolean)
      .join(' ')
  )

const hasTag = (post, tag) =>
  Array.isArray(post?.tags) &&
  post.tags.some(item => normalizeText(item) === normalizeText(tag))

export const buildPrimaryCategories = (categoryOptions = []) => {
  const categoryMap = new Map(
    categoryOptions.map(category => [category.name, category])
  )

  return EVIDENCE_CONFIG.primaryCategories.map(name => {
    const current = categoryMap.get(name)
    return {
      name,
      count: current?.count || 0
    }
  })
}

export const buildFocusTags = (tagOptions = []) => {
  const tagMap = new Map(tagOptions.map(tag => [tag.name, tag]))

  return EVIDENCE_CONFIG.focusTags.map(name => {
    const current = tagMap.get(name)
    return {
      name,
      count: current?.count || 0
    }
  })
}

const calculateMatchScore = (post, matcher = {}) => {
  const text = postText(post)
  let score = 0

  if (
    matcher.categories?.length &&
    matcher.categories.some(
      category => normalizeText(category) === normalizeText(post?.category)
    )
  ) {
    score += 5
  }

  if (matcher.tags?.length) {
    matcher.tags.forEach(tag => {
      if (hasTag(post, tag)) {
        score += 4
      }
    })
  }

  if (matcher.keywords?.length) {
    matcher.keywords.forEach(keyword => {
      if (text.includes(normalizeText(keyword))) {
        score += 2
      }
    })
  }

  return score
}

const buildPostHighlight = (post, role) => {
  const meta = [post?.category, ...(post?.tags || []).slice(0, 2)]
    .filter(Boolean)
    .join(' / ')

  return {
    title: post?.title,
    href: post?.href || `/${post?.slug}`,
    summary: post?.summary || role.fallback?.summary,
    meta: meta || role.fallback?.meta,
    label: role.label,
    isFallback: false
  }
}

export const buildEvidenceHighlights = posts => {
  const allPosts = Array.isArray(posts) ? posts : []
  const usedSlug = new Set()

  return EVIDENCE_CONFIG.featuredRoles.map(role => {
    if (role.type === 'page') {
      return {
        ...role.item,
        label: role.label,
        isFallback: false
      }
    }

    const matchedPost = allPosts
      .filter(post => post?.slug && !usedSlug.has(post.slug))
      .map(post => ({
        post,
        score: calculateMatchScore(post, role.match)
      }))
      .sort((left, right) => right.score - left.score)[0]

    if (matchedPost?.score > 0) {
      usedSlug.add(matchedPost.post.slug)
      return buildPostHighlight(matchedPost.post, role)
    }

    return {
      ...role.fallback,
      label: role.label,
      isFallback: true
    }
  })
}

const countSeriesMatches = (posts, matcher = {}) => {
  const allPosts = Array.isArray(posts) ? posts : []

  return allPosts.filter(post => calculateMatchScore(post, matcher) > 0).length
}

export const buildSeriesEntries = posts =>
  EVIDENCE_CONFIG.seriesEntries.map(entry => {
    const count = countSeriesMatches(posts, entry.match)
    return {
      ...entry,
      meta: count > 0 ? `${count} 篇可继续归档` : '入口已就绪，可继续补入文章'
    }
  })

export const getRouteDescription = pathname =>
  EVIDENCE_CONFIG.routeDescriptions[pathname] ||
  '围绕网关、服务治理、可观测性与稳定性持续积累'

export const getStaticPageConfig = pageKey =>
  EVIDENCE_CONFIG.pages[pageKey] || null
