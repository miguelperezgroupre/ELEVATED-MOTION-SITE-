// ── Market Intelligence Service ─────────────────────────────────
// Live Miami MLS condo-market statistics via BridgeData OData.
// Computes per-neighborhood: months of inventory, avg $/sqft,
// list/close ratio, days on market, sold/active counts, YoY value.


interface NeighborhoodStats {
  name: string;
  active: number;
  sold90: number;
  soldYoY: number;
  avgPpsf: number;       // avg $/sqft on 90-day closed sales
  yoYPpsf: number;       // avg $/sqft same window last year
  listClosePct: number;  // avg (ClosePrice/ListPrice - 1) * 100
  dom: number;           // avg days on market
  monthsInventory: number;
  valueIncreasePct: number;
  buyers: boolean;       // months inventory > 6 => buyers market
}

// MLS requests go through the server-side proxy (api/idx.js); no token in client code.
const PROXY = '/api/idx';
const CONDO = "contains(PropertySubType,'Condominium')";

const NEIGHBORHOODS: { name: string; filter: string }[] = [
  { name: 'Aventura', filter: "City eq 'Aventura'" },
  { name: 'Bal Harbour', filter: "City eq 'Bal Harbour'" },
  { name: 'Brickell', filter: "City eq 'Miami' and MIAMIRE_Area eq '41'" },
  { name: 'Coconut Grove', filter: "City eq 'Coconut Grove'" },
  { name: 'Coral Gables', filter: "City eq 'Coral Gables'" },
  { name: 'Downtown Miami', filter: "City eq 'Miami' and MIAMIRE_Area eq '40'" },
  { name: 'Edgewater', filter: "City eq 'Miami' and MIAMIRE_Area eq '12'" },
  { name: 'Miami Beach', filter: "City eq 'Miami Beach'" },
  { name: 'Sunny Isles Beach', filter: "City eq 'Sunny Isles Beach'" },
  { name: 'Las Olas', filter: "City eq 'Fort Lauderdale' and MIAMIRE_Area eq '3800'" },
  { name: 'Victoria Park', filter: "City eq 'Fort Lauderdale' and MIAMIRE_Area eq '3240'" },
  { name: 'Wilton Manors', filter: "City eq 'Wilton Manors'" },
];

function iso(d: Date): string { return d.toISOString().replace(/\.\d{3}Z$/, 'Z'); }

async function odata(path: string, params: Record<string, string>): Promise<any> {
  const qs = new URLSearchParams({ ...params, resource: path });
  const res = await fetch(`${PROXY}?${qs}`, {
    headers: { 'Accept': 'application/json' },
  });
  if (!res.ok) throw new Error(`ODATA ${res.status}`);
  return res.json();
}

async function countAll(filters: string): Promise<number> {
  const d = await odata('Property', { $filter: filters, $top: '1', $count: 'true' });
  return Number(d['@odata.count'] || 0);
}

async function fetchClosed(filters: string, top: number): Promise<any[]> {
  const d = await odata('Property', {
    $filter: filters,
    $top: String(top),
    $select: 'ClosePrice,ListPrice,LivingArea,DaysOnMarket,CloseDate,City,BuildingName',
    $orderby: 'CloseDate desc',
  });
  return d.value || [];
}

function avg(nums: number[]): number {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export async function getNeighborhoodStats(): Promise<NeighborhoodStats[]> {
  const now = new Date();
  const d90 = new Date(now); d90.setDate(d90.getDate() - 90);
  const yEnd = new Date(d90);
  const yStart = new Date(d90); yStart.setDate(yStart.getDate() - 365);

  const results: NeighborhoodStats[] = [];

  // Fetch in small batches to be gentle on rate limits
  for (let i = 0; i < NEIGHBORHOODS.length; i += 4) {
    const batch = NEIGHBORHOODS.slice(i, i + 4);
    await Promise.all(batch.map(async (nh) => {
      try {
        const [active, sold90Cnt, soldYoYCnt, closed, closedYoY] = await Promise.all([
          countAll(`StandardStatus eq 'Active' and ${nh.filter} and ${CONDO}`),
          countAll(`StandardStatus eq 'Closed' and ${nh.filter} and ${CONDO} and CloseDate ge ${iso(d90)}`),
          countAll(`StandardStatus eq 'Closed' and ${nh.filter} and ${CONDO} and CloseDate ge ${iso(yStart)} and CloseDate lt ${iso(d90)}`),
          fetchClosed(`StandardStatus eq 'Closed' and ${nh.filter} and ${CONDO} and CloseDate ge ${iso(d90)}`, 60),
          fetchClosed(`StandardStatus eq 'Closed' and ${nh.filter} and ${CONDO} and CloseDate ge ${iso(yStart)} and CloseDate lt ${iso(d90)}`, 60),
        ]);

        const ppsfs = closed
          .filter((p: any) => !!p.LivingArea && p.LivingArea > 100 && !!p.ClosePrice)
          .map((p: any) => p.ClosePrice / p.LivingArea);
        const yoYppsfs = closedYoY
          .filter((p: any) => !!p.LivingArea && p.LivingArea > 100 && !!p.ClosePrice)
          .map((p: any) => p.ClosePrice / p.LivingArea);

        const ratios = closed
          .filter((p: any) => !!p.ListPrice && !!p.ClosePrice)
          .map((p: any) => (p.ClosePrice / p.ListPrice - 1) * 100);
        const doms = closed
          .filter((p: any) => p.DaysOnMarket != null)
          .map((p: any) => p.DaysOnMarket);

        const curPpsf = avg(ppsfs);
        const lastPpsf = avg(yoYppsfs);
        const soldPerMonth = sold90Cnt / 3;
        const monthsInventory = soldPerMonth > 0 ? active / soldPerMonth : 0;

        results.push({
          name: nh.name,
          active,
          sold90: sold90Cnt,
          soldYoY: soldYoYCnt,
          avgPpsf: Math.round(curPpsf),
          yoYPpsf: Math.round(lastPpsf),
          listClosePct: Math.round(avg(ratios) * 100) / 100,
          dom: Math.round(avg(doms)),
          monthsInventory: Math.round(monthsInventory * 100) / 100,
          valueIncreasePct: lastPpsf > 0 ? Math.round(((curPpsf / lastPpsf) - 1) * 1000) / 10 : 0,
          buyers: monthsInventory > 6,
        });
      } catch {
        results.push({
          name: nh.name, active: 0, sold90: 0, soldYoY: 0, avgPpsf: 0, yoYPpsf: 0,
          listClosePct: 0, dom: 0, monthsInventory: 0, valueIncreasePct: 0, buyers: false,
        });
      }
    }));
  }

  return results;
}

// ── Closing-data dashboard (KPI + charts) ──────────────────────
export interface ClosingData {
  closedCount: number;
  avgPpsf: number;
  avgClosePrice: number;
  avgListPrice: number;
  discountPct: number;
  byYear: { year: number; count: number }[];
  buildings: { name: string; closePpsf: number; listPpsf: number }[];
}

export async function getClosingData(city = 'Miami'): Promise<ClosingData> {
  const d90 = new Date(); d90.setDate(d90.getDate() - 90);
  const closed = await fetchClosed(
    `StandardStatus eq 'Closed' and City eq '${city}' and ${CONDO} and CloseDate ge ${iso(d90)}`,
    200
  );

  const ppsfs = closed.filter((p: any) => !!p.LivingArea && p.LivingArea > 100 && !!p.ClosePrice)
    .map((p: any) => p.ClosePrice / p.LivingArea);
  const closes = closed.filter((p: any) => !!p.ClosePrice).map((p: any) => p.ClosePrice);
  const lists = closed.filter((p: any) => !!p.ListPrice).map((p: any) => p.ListPrice);
  const ratios = closed.filter((p: any) => !!p.ListPrice && !!p.ClosePrice)
    .map((p: any) => (p.ClosePrice / p.ListPrice - 1) * 100);

  // Closings by year from the full sample (approx; fine for dashboard)
  const byYearMap = new Map<number, number>();
  closed.forEach((p: any) => {
    const yr = p.CloseDate ? new Date(p.CloseDate).getFullYear() : 0;
    if (yr && yr >= 2000) byYearMap.set(yr, (byYearMap.get(yr) || 0) + 1);
  });
  const byYear = [...byYearMap.entries()]
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year)
    .slice(-12);

  // Building ppsf comparison (top by sample)
  const byBldg = new Map<string, { c: number[]; l: number[] }>();
  closed.forEach((p: any) => {
    const n = p.BuildingName;
    if (!n || !p.LivingArea || p.LivingArea < 100) return;
    if (!byBldg.has(n)) byBldg.set(n, { c: [], l: [] });
    const rec = byBldg.get(n)!;
    if (p.ClosePrice) rec.c.push(p.ClosePrice / p.LivingArea);
    if (p.ListPrice) rec.l.push(p.ListPrice / p.LivingArea);
  });
  const buildings = [...byBldg.entries()]
    .map(([name, v]) => ({
      name: name.length > 26 ? name.slice(0, 24) + '…' : name,
      closePpsf: Math.round(avg(v.c)),
      listPpsf: Math.round(avg(v.l)),
    }))
    .filter((b) => b.closePpsf > 0)
    .sort((a, b) => b.closePpsf - a.closePpsf)
    .slice(0, 10);

  return {
    closedCount: closed.length,
    avgPpsf: Math.round(avg(ppsfs)),
    avgClosePrice: Math.round(avg(closes)),
    avgListPrice: Math.round(avg(lists)),
    discountPct: Math.round(avg(ratios) * 100) / 100,
    byYear,
    buildings,
  };
}
