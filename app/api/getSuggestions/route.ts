// app/api/getsuggestions/route.ts

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query')?.toLowerCase() || '';
  const type = searchParams.get('type'); // 'college' or 'branch'

  if (!query || !type) {
    return NextResponse.json({ suggestions: [] });
  }

  const csvFile = type === 'college' ? 'colleges.csv' : 'branches.csv';
  const filePath = path.join(process.cwd(),'app', 'data', csvFile);

  console.log("it is working")

  const suggestions: { code: string, name: string }[] = [];

  return new Promise((resolve) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const name = row[Object.keys(row)[2]]?.toLowerCase(); // Institute or branch_names
        const code = row[Object.keys(row)[1]];
        if (name?.includes(query)) {
          suggestions.push({ code, name: row[Object.keys(row)[2]] });
        }
      })
      .on('end', () => {
        resolve(NextResponse.json({ suggestions }));
      });
  });
}
