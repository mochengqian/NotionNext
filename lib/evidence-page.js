import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData, getPostBlocks } from '@/lib/db/SiteDataApi'
import {
  buildHomeFeedPosts,
  getStaticPageConfig
} from '@/themes/heo/evidence.helpers'

const RECOMMENDED_TAG = '推荐'
const GROWTH_TAGS = ['成长', '随笔']
const TECHNICAL_EXPLORATION_LABEL = '技术探索'

const includesTechnicalExploration = value =>
  String(value || '').includes(TECHNICAL_EXPLORATION_LABEL)

const isPublishedPost = page =>
  page?.type === 'Post' && page?.status === 'Published'

const postListConfigs = {
  recommendedReading: {
    from: 'recommended-reading',
    matches: page =>
      Array.isArray(page?.tags) && page.tags.includes(RECOMMENDED_TAG)
  },
  growthNotes: {
    from: 'growth-notes',
    matches: page =>
      Array.isArray(page?.tags) &&
      page.tags.some(tag => GROWTH_TAGS.includes(tag))
  },
  technicalExploration: {
    from: 'technical-exploration',
    matches: page =>
      includesTechnicalExploration(page?.category) ||
      (Array.isArray(page?.tags) &&
        page.tags.some(includesTechnicalExploration))
  }
}

const getPostListConfig = listKey => {
  const config = postListConfigs[listKey]
  if (!config) {
    throw new Error(`Unknown evidence post list: ${listKey}`)
  }
  return config
}

const buildEvidencePostList = ({ allPages, listKey }) => {
  const config = getPostListConfig(listKey)
  const publishedPosts = (allPages || []).filter(
    page => isPublishedPost(page) && config.matches(page)
  )

  return buildHomeFeedPosts(publishedPosts).filter(config.matches)
}

const withPreviewBlocks = async ({ posts, notionConfig }) => {
  if (!siteConfig('POST_LIST_PREVIEW', false, notionConfig)) {
    return
  }

  const POST_PREVIEW_LINES = siteConfig('POST_PREVIEW_LINES', 12, notionConfig)

  for (const i in posts) {
    const post = posts[i]
    if (post.password && post.password !== '') {
      continue
    }
    post.blockMap = await getPostBlocks(post.id, 'slug', POST_PREVIEW_LINES)
  }
}

export async function getEvidenceStaticProps({ locale, pageKey }) {
  const pageConfig = getStaticPageConfig(pageKey)
  const props = await fetchGlobalAllData({
    from: `evidence-${pageKey}`,
    locale
  })

  if (pageConfig) {
    props.post = {
      title: pageConfig.title,
      summary: pageConfig.description,
      slug: pageConfig.slug,
      type: 'Page',
      pageCoverThumbnail: props?.siteInfo?.pageCover || '/bg_image.jpg'
    }
  }

  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

export async function getEvidencePostListStaticProps({
  locale,
  listKey,
  page
}) {
  const config = getPostListConfig(listKey)
  const currentPage = Number(page || 1)
  const props = await fetchGlobalAllData({
    from: page ? `${config.from}-page-${page}` : config.from,
    locale
  })
  const filteredPosts = buildEvidencePostList({
    allPages: props.allPages,
    listKey
  })
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)

  props.posts = filteredPosts
  props.postCount = filteredPosts.length

  if (page || siteConfig('POST_LIST_STYLE') === 'page') {
    props.posts = filteredPosts.slice(
      POSTS_PER_PAGE * (currentPage - 1),
      POSTS_PER_PAGE * currentPage
    )
  }

  if (page) {
    props.page = page
  }

  await withPreviewBlocks({
    posts: props.posts || [],
    notionConfig: props?.NOTION_CONFIG
  })

  delete props.allPages

  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

export async function getEvidencePostListStaticPaths({ locale, listKey }) {
  const config = getPostListConfig(listKey)
  const { allPages, NOTION_CONFIG } = await fetchGlobalAllData({
    from: `${config.from}-page-paths`,
    locale
  })
  const filteredPosts = buildEvidencePostList({ allPages, listKey })
  const postsPerPage = siteConfig('POSTS_PER_PAGE', 12, NOTION_CONFIG) || 12
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  return {
    paths: Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
      params: { page: `${index + 2}` }
    })),
    fallback: true
  }
}
