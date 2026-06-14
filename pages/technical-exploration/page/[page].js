import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import {
  getEvidencePostListStaticPaths,
  getEvidencePostListStaticProps
} from '@/lib/evidence-page'
import { DynamicLayout } from '@/themes/theme'

export default function TechnicalExplorationPage(props) {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutPostList' {...props} />
}

export async function getStaticProps({ params: { page }, locale }) {
  return getEvidencePostListStaticProps({
    locale,
    listKey: 'technicalExploration',
    page
  })
}

export async function getStaticPaths({ locale }) {
  return getEvidencePostListStaticPaths({
    locale,
    listKey: 'technicalExploration'
  })
}
