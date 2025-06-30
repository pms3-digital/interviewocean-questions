import { getAllQuestionIds, getQuestionData } from '@/lib/questions';
import Link from 'next/link';

export async function generateStaticParams() {
    const paths = getAllQuestionIds();
    return paths;
}

export async function generateMetadata({ params }) {
    const questionData = await getQuestionData(params.slug);
    return {
        title: questionData.title,
        description: `An interview question about ${questionData.title}`,
        openGraph: {
            title: questionData.title,
            description: `An interview question about ${questionData.title}`,
        },
    }
}

export default async function Question({ params }) {
  const questionData = await getQuestionData(params.slug);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
        <Link href="/">
            ← Back to home
        </Link>
        <article className="prose lg:prose-xl mx-auto py-8">
            <h1>{questionData.title}</h1>
            <div className="text-gray-600 mb-4">
                <span className="capitalize">{questionData.category}</span> - <span className="capitalize">{questionData.difficulty}</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: questionData.contentHtml }} />
        </article>
    </div>
  );
} 