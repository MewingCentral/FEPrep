import https from "https";
import PDFMerger from "pdf-merger-js";
import { PdfReader } from "pdfreader";
import { UTApi } from "uploadthing/server";

import type { SECTIONS, SEMESTERS, TOPICS } from "@feprep/consts";
import { db, questions } from "@feprep/db";

interface FEQuestion {
  pdf: string;
  section: (typeof SECTIONS)[number];
  topic: (typeof TOPICS)[number];
  semester: (typeof SEMESTERS)[number];
  averageScore: number;
  points: number;
  questionNumber: number;
  userId: string;
}

const getPDFBufferFromURL = (url: URL): Promise<Buffer> =>
  new Promise((resolve, reject) =>
    https
      .get(url, (res) => {
        const data: Buffer[] = [];
        res
          .on("data", (chunk: Buffer) => data.push(chunk))
          .on("end", () => resolve(Buffer.concat(data)));
      })
      .on("error", reject),
  );

interface TextLine {
  y: string;
  text: string;
}

function addTextToLines(textLines: TextLine[], item: TextLine): void {
  const existingLine = textLines.find(({ y }) => y === item.y);
  if (existingLine) {
    existingLine.text += " " + item.text;
  } else {
    textLines.push(item);
  }
}

function getPointsAndTopicFromLine(
  line: string,
): [number, (typeof TOPICS)[number]] {
  const match = line.match(/(\d+)\)\((\d+)pts\)([A-Z]{3})\(([^)]+)\)/);
  if (!match) {
    throw new Error(`Could not parse line: ${line}`);
  }

  const points = parseInt(match[2]!);

  let topic = match[4]!.split(/(?=[A-Z])/).join(" ");

  // Handle special case
  if (topic === "Dynamic Memory Managementin C")
    topic = "Dynamic Memory Management";
  else if (topic === "Triesand A V L Trees") topic = "Tries and AVL Trees";

  return [points, topic as (typeof TOPICS)[number]];
}

function getSemesterAndTopicFromLine(
  line: string,
): [(typeof SEMESTERS)[number], (typeof SECTIONS)[number]] {
  const match = line.match(/(Spring|Fall|Summer)(\d{4})Section([A-Z]):(.+)/);
  if (!match) {
    throw new Error(`Could not parse line: ${line}`);
  }

  const termYear = `${match[1]} ${parseInt(match[2]!, 10)}`; // Increment the year by one
  const section = `Section ${match[3]}: ${match[4]!.split(/(?=[A-Z])/).join(" ")}`;

  // Create an array with the formatted elements

  return [
    termYear as (typeof SEMESTERS)[number],
    `${section}` as (typeof SECTIONS)[number],
  ];
}

async function mergeQuestionWithSolution(
  pdfName: string,
  questionsURL: string,
  solutionsURL: string,
  pageNumber: number,
) {
  const utapi = new UTApi();
  const pdfMerger = new PDFMerger();
  await pdfMerger.add(questionsURL, pageNumber);
  await pdfMerger.add(solutionsURL, pageNumber);
  const blob = await pdfMerger.saveAsBuffer();
  const pdf = new File([blob], pdfName, { type: "application/pdf" });
  return (await utapi.uploadFiles(pdf)).data?.url;
}

const parseExamBuffer = (
  buffer: Buffer,
  percentages: number[],
): Promise<FEQuestion[]> => {
  return new Promise((resolve, reject) => {
    const feQuestions: FEQuestion[] = [];
    const linesPerPage: TextLine[][] = [];
    let pageNumber = 0;
    new PdfReader(null).parseBuffer(buffer, (error, item) => {
      if (error) reject(error);
      else if (!item) {
        // Process last page
        const currentPageLines = linesPerPage[pageNumber]?.map((line) =>
          line.text.split(" ").join(""),
        );

        if (currentPageLines === undefined) {
          return;
        }

        const [points, topic] = getPointsAndTopicFromLine(currentPageLines[2]!);
        const [semester, section] = getSemesterAndTopicFromLine(
          currentPageLines[0]!,
        );

        const averageScore = percentages[feQuestions.length]!;
        const pdfTitle = `${semester} ${section} ${topic} ${(feQuestions.length % 3) + 1}.pdf`;
        feQuestions.push({
          pdf: pdfTitle,
          section: section,
          topic: topic,
          semester,
          averageScore: averageScore,
          points,
          questionNumber: (feQuestions.length % 3) + 1,
          userId: "mi32acfu8hmok3g",
        });

        resolve(feQuestions);
      } else if (item.page) {
        if (item.page % 4 === 1) return;

        const currentPageLines = linesPerPage[pageNumber]?.map((line) =>
          line.text.split(" ").join(""),
        );

        if (currentPageLines === undefined) {
          pageNumber = item.page - 1;
          linesPerPage[pageNumber] = [];
          return;
        }

        const [points, topic] = getPointsAndTopicFromLine(currentPageLines[2]!);
        const [semester, section] = getSemesterAndTopicFromLine(
          currentPageLines[0]!,
        );
        const averageScore = percentages[feQuestions.length]!;
        const questionNumber = (feQuestions.length % 3) + 1;
        const pdfTitle = `${semester} ${section} ${topic} ${questionNumber}.pdf`;

        feQuestions.push({
          pdf: pdfTitle,
          section: section,
          topic: topic,
          semester,
          averageScore: averageScore,
          points,
          questionNumber,
          userId: "mi32acfu8hmok3g",
        });

        pageNumber = item.page - 1;
        linesPerPage[pageNumber] = [];
      } else if (item.text) {
        addTextToLines(linesPerPage[pageNumber] ?? [], item as TextLine);
      }
    });
  });
};

const parseExamResultsBuffer = (buffer: Buffer): Promise<number[]> => {
  return new Promise((resolve, reject) => {
    const percentages: number[] = [];
    const linesPerPage: TextLine[][] = [];
    let pageNumber = 0;
    new PdfReader(null).parseBuffer(buffer, (error, item) => {
      if (error) reject(error);
      else if (!item) {
        const lastFourStrings = linesPerPage
          .map((page) => page.map((line) => line.text.split(" ").join("")))[0]
          ?.slice(-4);
        const regex = /(\d+\.\d+)%/g;

        lastFourStrings?.forEach((line) => {
          line.match(regex)!.forEach((match) => {
            percentages.push(parseFloat(match.replace("%", "")));
          });
        });

        resolve(percentages);
      } else if (item.page) {
        pageNumber = item.page - 1;
        linesPerPage[pageNumber] = [];
      } else if (item.text) {
        addTextToLines(linesPerPage[pageNumber] ?? [], item as TextLine);
      }
    });
  });
};

const examResultsBuffer = await getPDFBufferFromURL(
  new URL("https://www.cs.ucf.edu/registration/exm/spr2023/Info-Jan23.pdf"),
);

const percentages = await parseExamResultsBuffer(examResultsBuffer);

const examBuffer = await getPDFBufferFromURL(
  new URL("https://www.cs.ucf.edu/registration/exm/spr2023/FE-Jan23.pdf"),
);

const newQuestions = await parseExamBuffer(examBuffer, percentages);

for (const question of newQuestions) {
  const numbers = [2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15, 16];
  const url = await mergeQuestionWithSolution(
    question.pdf,
    "https://www.cs.ucf.edu/registration/exm/spr2023/FE-Jan23.pdf",
    "https://www.cs.ucf.edu/registration/exm/spr2023/FE-Jan23-Sol.pdf",
    numbers[question.questionNumber - 1]!,
  );
  if (!url) {
    throw new Error("Failed to merge question with solution");
  }

  await db.insert(questions).values({
    ...question,
    pdf: url,
  });
}
