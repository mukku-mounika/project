import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1"];
export default function ExpensePieChart({ expenses = [] }) {
  const map = {};
  expenses.forEach(e => {
    const cat = e.category || "Unknown";
    const amt = Number(e.amount || 0);
    map[cat] = (map[cat] || 0) + amt;
  });
  const data = Object.keys(map).map((k, i) => ({
    name: k,
    value: map[k],
    color: COLORS[i % COLORS.length],
  }));
  if (data.length === 0) return <div style={{ height: 200 }}>No data</div>;
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );
}
