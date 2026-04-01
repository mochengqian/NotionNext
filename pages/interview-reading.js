import EvidencePage from '@/themes/heo/components/EvidencePage'
import { getEvidenceStaticProps } from '@/lib/evidence-page'

export default function InterviewReadingPage() {
  return <EvidencePage pageKey='interviewReading' />
}

export async function getStaticProps({ locale }) {
  return getEvidenceStaticProps({ locale, pageKey: 'interviewReading' })
}
