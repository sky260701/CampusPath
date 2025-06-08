import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export async function POST(req: NextRequest) {
  try {
    const { rank, gender, category } = await req.json();
    const userRank = parseInt(rank, 10);
    const userCategory = category.toUpperCase();
    const userGender = gender.toLowerCase();

    // Load order CSV
    const orderPath = path.join(process.cwd(), 'app', 'data', 'sorted_output.csv');
    const orderCsv = fs.readFileSync(orderPath, 'utf-8');
    const orderRecords: any[] = parse(orderCsv, {
      columns: true,
      skip_empty_lines: true,
    });

    // Load CAP round CSVs
    const capFiles = ['cap1.csv','cap2.csv','cap3.csv']; // you can add 'cap2.csv', 'cap3.csv' later
    let cutoffRecords: any[] = [];

    for (const file of capFiles) {
      const filePath = path.join(process.cwd(), 'app', 'data', file);
      const csv = fs.readFileSync(filePath, 'utf-8');
      const records: any[] = parse(csv, {
        columns: true,
        skip_empty_lines: true,
      });
      cutoffRecords.push(...records);
    }

    // Determine the rank columns to consider
    const columnSet: Set<string> = new Set();
    columnSet.add('GOPENS_Rank');

    if (userCategory === 'EWS') {
      columnSet.add('EWS_Rank');
      if (userGender === 'female') {
        columnSet.add('LOPENS_Rank');
      }
    } else {
      if (userGender === 'female') {
        columnSet.add(`L${userCategory}_Rank`);
        columnSet.add(`G${userCategory}_Rank`);
        columnSet.add('LOPENS_Rank');
      } else {
        columnSet.add(`G${userCategory}_Rank`);
      }
    }

    const rankColumns = Array.from(columnSet);

    // Merge by Institute order
    const orderedMap = new Map<string, number>();
    for (const row of orderRecords) {
      orderedMap.set(row['Institute'], parseInt(row['order'], 10));
    }

    const merged: any[] = [];

    for (const row of cutoffRecords) {
      const order = orderedMap.get(row['Institute']);
      if (!order) continue;
    
      let bestMatch: any = null;
    
      for (const column of rankColumns) {
        const rankValue = parseInt(row[column], 10);
        if (isNaN(rankValue)) continue;
    
        if (rankValue >= userRank) {
          if (!bestMatch || rankValue > bestMatch.rank) {
            const percentileCol = column.replace('_Rank', '_Percentile');
            bestMatch = {
              round: row['CAP_Round'],
              name: row['Institute'],
              branch: row['Branch'],
              location: row['City'] || 'Maharashtra',
              order,
              rank: rankValue,
              percentile: row[percentileCol] || 'NA',
              seatType: column.replace('_Rank', ''),
            };
          }
        }
      }
    
      if (bestMatch) {
        merged.push(bestMatch);
      }
    }
    

    // Sort by order
    merged.sort((a, b) => a.order - b.order);

    // Chunk and return top 5 eligible
    const chunkSize = 50;
    const targetCount = 5;
    const finalColleges: any[] = [];

    for (let i = 0; i < merged.length; i += chunkSize) {
      const chunk = merged.slice(i, i + chunkSize);
      finalColleges.push(...chunk);
      if (finalColleges.length >= targetCount) break;
    }

    return NextResponse.json({ colleges: finalColleges.slice(0, targetCount) });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
