import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export async function POST(req: NextRequest) {
  try {
    const {
      rank,
      percentile,
      gender,
      category,
      branch,
      college,
      capRound,
      defence,
      orphan,
      pwd,
      homeUniversity,
      quota,
    } = await req.json();

    const userRank = rank ? parseInt(rank, 10) : -1;
    const userPercentile = percentile ? parseFloat(percentile) : null;
    const userCategory = category.toUpperCase() +'S';
    const userGender = gender.toLowerCase();

    const branchFilter = branch?.toLowerCase() == 'all' ? null :branch?.toLowerCase();
    const collegeFilter = college?.toLowerCase() == 'all' ? null : college?.toLowerCase();
    const roundFilter = capRound?.toLowerCase();

    // Load order CSV
    const orderPath = path.join(process.cwd(), 'app', 'data', 'sorted_output.csv');
    const orderCsv = fs.readFileSync(orderPath, 'utf-8');
    const orderRecords: any[] = parse(orderCsv, {
      columns: true,
      skip_empty_lines: true,
    });

    // Load CAP CSVs
    const capFiles = ['cap1.csv', 'cap2.csv', 'cap3.csv'];
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

    // Determine columns to consider
    const suffix = userPercentile !== null ? '_Percentile' : '_Rank';
    const defSuffix = 'DEF';
    const pwdSuffix = 'PWD';
    const categoryHomeUniversitySuffix = homeUniversity =='yes'? 'H': 'O' ;
    const columnSet: Set<string> = new Set();
    columnSet.add(`GOPENS${suffix}`);
    columnSet.add(`G${userCategory.slice(0,-1)}${categoryHomeUniversitySuffix}${suffix}`);
    if(orphan == 'yes'){
        columnSet.add(`ORPHAN${suffix}`);
    }

    if (userCategory === 'EWS') {
      columnSet.add(`EWS${suffix}`);
      if (userGender === 'female') {
        columnSet.add(`LOPENS${suffix}`);
      }
    } else {
      if (userGender === 'female') {
        columnSet.add(`L${userCategory}${suffix}`);
        columnSet.add(`G${userCategory}${suffix}`);
        columnSet.add(`LOPENS${suffix}`);
        columnSet.add(`LOPEN${categoryHomeUniversitySuffix}${suffix}`);
        columnSet.add(`L${userCategory.slice(0,-1)}${categoryHomeUniversitySuffix}${suffix}`);
        if(defence == 'yes'){
            columnSet.add(`${defSuffix}${userCategory}${suffix}`); 
            columnSet.add(`${defSuffix + 'R'}${userCategory}${suffix}`);       
            columnSet.add(`${defSuffix}${userCategory.slice(0,-1)}${categoryHomeUniversitySuffix}${suffix}`);
        }
        if(pwd == 'yes'){
            columnSet.add(`${pwdSuffix}${userCategory}${suffix}`); 
            columnSet.add(`${pwdSuffix + 'R'}${userCategory}${suffix}`); 
            columnSet.add(`${pwdSuffix}${userCategory.slice(0,-1)}${categoryHomeUniversitySuffix}${suffix}`);
        }
      } else {
        columnSet.add(`G${userCategory}${suffix}`);
        if(defence == 'yes'){ 
            columnSet.add(`${defSuffix}${userCategory}${suffix}`); 
            columnSet.add(`${defSuffix + 'R'}${userCategory}${suffix}`);  
            columnSet.add(`${defSuffix}${userCategory.slice(0,-1)}${categoryHomeUniversitySuffix}${suffix}`);   
        }
        if(pwd == 'yes'){
            columnSet.add(`${pwdSuffix}${userCategory}${suffix}`); 
            columnSet.add(`${pwdSuffix + 'R'}${userCategory}${suffix}`); 
            columnSet.add(`${pwdSuffix}${userCategory.slice(0, -1)}${categoryHomeUniversitySuffix}${suffix}`);

        }
      }
    }

    console.log(columnSet);

    const valueColumns = Array.from(columnSet);
    const orderedMap = new Map<string, number>();
    for (const row of orderRecords) {
      orderedMap.set(row['Institute'], parseInt(row['order'], 10));
    }

    const matched: any[] = [];

    for (const row of cutoffRecords) {
      const order = orderedMap.get(row['Institute']);
      if (!order) continue;

      // Optional filters
      if (branchFilter && !row['Branch']?.toLowerCase().includes(branchFilter)) continue;
      if (collegeFilter && !row['Institute']?.toLowerCase().includes(collegeFilter)) continue;

      let bestMatch: any = null;

      for (const col of valueColumns) {
        const val = parseFloat(row[col]);
        if (isNaN(val)) continue;

        const isEligible = userPercentile !== null
          ? val <= userPercentile
          : val >= userRank;

        if (isEligible) {
          if (!bestMatch || val > bestMatch.value) {
            const altCol = col.replace(suffix, suffix === '_Rank' ? '_Percentile' : '_Rank');
            bestMatch = {
              round: row['CAP_Round'],
              name: row['Institute'],
              branch: row['Branch'],
              location: row['City'] || 'Maharashtra',
              order,
              seatType: col.replace(suffix, ''),
              rank: suffix === '_Rank' ? val : row[altCol] || 'NA',
              percentile: suffix === '_Percentile' ? val : row[altCol] || 'NA',
            };
          }
        }
      }

      if (bestMatch) {
        matched.push(bestMatch);
      }
    }

    // Sort and limit results
    matched.sort((a, b) => a.order - b.order);

    const chunkSize = 50;
    const targetCount = 15;
    const finalResults: any[] = [];

    for (let i = 0; i < matched.length; i += chunkSize) {
      const chunk = matched.slice(i, i + chunkSize);
      finalResults.push(...chunk);
      if (finalResults.length >= targetCount) break;
    }

    return NextResponse.json({ colleges: finalResults.slice(0, targetCount) });
  } catch (err) {
    console.error('Starter Plan API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
