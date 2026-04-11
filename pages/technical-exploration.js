import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData, getPostBlocks } from '@/lib/db/SiteDataApi'
import { DynamicLayout } from '@/themes/theme'
import { buildHomeFeedPosts } from '@/themes/heo/evidence.helpers'

const TECHNICAL_EXPLORATION_LABEL = '技术探索'

const includesTechnicalExploration = value =>
  String(value || '').includes(TECHNICAL_EXPLORATION_LABEL)

const isTechnicalExplorationPost = page =>
  includesTechnicalExploration(page?.category) ||
  (Array.isArray(page?.tags) && page.tags.some(includesTechnicalExploration))

export default function TechnicalExplorationPage(props) {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutPostList' {...props} />
}

export async function getStaticProps({ locale }) {
  const from = 'technical-exploration'
  const props = await fetchGlobalAllData({ from, locale })
  const POST_PREVIEW_LINES = siteConfig(
    'POST_PREVIEW_LINES',
    12,
    props?.NOTION_CONFIG
  )

  const publishedPosts = (props.allPages || []).filter(
    page =>
      page.type === 'Post' &&
      page.status === 'Published' &&
      isTechnicalExplorationPost(page)
  )

  const filteredPosts = buildHomeFeedPosts(publishedPosts)
  props.posts = filteredPosts
  props.postCount = filteredPosts.length

  if (siteConfig('POST_LIST_STYLE') === 'page') {
    props.posts = props.posts?.slice(
      0,
      siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
    )
  }

  if (siteConfig('POST_LIST_PREVIEW', false, props?.NOTION_CONFIG)) {
    for (const i in props.posts) {
      const post = props.posts[i]
      if (post.password && post.password !== '') {
        continue
      }
      post.blockMap = await getPostBlocks(post.id, 'slug', POST_PREVIEW_LINES)
    }
  }

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
