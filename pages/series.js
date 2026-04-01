import EvidencePage from '@/themes/heo/components/EvidencePage'
import { getEvidenceStaticProps } from '@/lib/evidence-page'

export default function SeriesPage() {
  return <EvidencePage pageKey='series' />
}

export async function getStaticProps({ locale }) {
  return getEvidenceStaticProps({ locale, pageKey: 'series' })
}
