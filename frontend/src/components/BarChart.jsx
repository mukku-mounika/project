import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
export default function ExpenseBarChart({ expenses = [] }) {
  const monthly = {};
  expenses.forEach(e => {
    if (!e.date) return;
    const ym = e.date.slice(0, 7);
    monthly[ym] = (monthly[ym] || 0) + Number(e.amount || 0);
  });
  const data = Object.keys(monthly)
    .sort()
    .map(k => ({ month: k, total: monthly[k] }));
  if (data.length === 0) return <div style={{ height: 200 }}>No data</div>;
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" />
      </BarChart>
    </ResponsiveContainer>
  );
}

