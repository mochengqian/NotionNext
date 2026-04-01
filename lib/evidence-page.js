import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { getStaticPageConfig } from '@/themes/heo/evidence.helpers'

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
