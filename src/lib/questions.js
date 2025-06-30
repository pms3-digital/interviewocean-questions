import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const questionsDirectory = path.join(process.cwd(), 'questions');

function getAllQuestionIds() {
  const fileNames = fs.readdirSync(questionsDirectory, { recursive: true });

  return fileNames.map((fileName) => {
    if (fileName.endsWith('.md')) {
      return {
        slug: fileName.replace(/\.md$/, '').replace(/\//g, '-'),
      };
    }
  }).filter(Boolean);
}

async function getQuestionData(slug) {
  const fullPath = path.join(questionsDirectory, `${slug.replace(/-/g, '/')}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}

function getSortedQuestionsData() {
  // Get file names under /questions
  const fileNames = fs.readdirSync(questionsDirectory, { recursive: true });
  const allQuestionsData = fileNames.map((fileName) => {
    if (fileName.endsWith('.md')) {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, '').replace(/\//g, '-');

      // Read markdown file as string
      const fullPath = path.join(questionsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        slug,
        ...matterResult.data,
      };
    }
  }).filter(Boolean);
  // Sort posts by date
  return allQuestionsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export { getSortedQuestionsData, getAllQuestionIds, getQuestionData }; 